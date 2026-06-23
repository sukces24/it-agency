/**
 * Dostawca poczty e-mail — interfejs, implementacja Nodemailer/SMTP,
 * walidacja konfiguracji, ponawianie prób i logowanie błędów.
 *
 * Requirements: 6.1, 6.2, 6.3, 6.5
 */

import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';
import type { MailMessage } from './message';

// ---------------------------------------------------------------------------
// Interfejs EmailProvider
// ---------------------------------------------------------------------------

export interface EmailProvider {
  send(message: MailMessage): Promise<void>;
}

// ---------------------------------------------------------------------------
// Konfiguracja SMTP — walidacja zmiennych środowiskowych
// ---------------------------------------------------------------------------

export interface SmtpConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  from: string;
}

export type SmtpConfigResult =
  | { ok: true; config: SmtpConfig }
  | { ok: false; missing: string[] };

const REQUIRED_SMTP_VARS = [
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER',
  'SMTP_PASSWORD',
  'SMTP_FROM',
] as const;

/**
 * Odczytuje i waliduje konfigurację SMTP ze zmiennych środowiskowych.
 * Zwraca informację o brakujących/pustych zmiennych (bez logowania poświadczeń).
 */
export function getSmtpConfig(): SmtpConfigResult {
  const missing: string[] = [];

  for (const key of REQUIRED_SMTP_VARS) {
    const value = process.env[key];
    if (!value || value.trim().length === 0) {
      missing.push(key);
    }
  }

  if (missing.length > 0) {
    return { ok: false, missing };
  }

  return {
    ok: true,
    config: {
      host: process.env.SMTP_HOST!.trim(),
      port: parseInt(process.env.SMTP_PORT!.trim(), 10),
      user: process.env.SMTP_USER!.trim(),
      password: process.env.SMTP_PASSWORD!.trim(),
      from: process.env.SMTP_FROM!.trim(),
    },
  };
}

// ---------------------------------------------------------------------------
// Implementacja NodemailerEmailProvider
// ---------------------------------------------------------------------------

/** Timeout dla pojedynczej próby — ~10 s */
const SINGLE_ATTEMPT_TIMEOUT_MS = 10_000;

export class NodemailerEmailProvider implements EmailProvider {
  private transporter: Transporter;
  private from: string;

  constructor(config: SmtpConfig) {
    this.from = config.from;
    this.transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.port === 465,
      auth: {
        user: config.user,
        pass: config.password,
      },
      connectionTimeout: SINGLE_ATTEMPT_TIMEOUT_MS,
      greetingTimeout: SINGLE_ATTEMPT_TIMEOUT_MS,
      socketTimeout: SINGLE_ATTEMPT_TIMEOUT_MS,
    });
  }

  async send(message: MailMessage): Promise<void> {
    await this.transporter.sendMail({
      from: this.from,
      to: message.to,
      cc: message.cc,
      replyTo: message.replyTo,
      subject: message.subject,
      text: message.text,
    });
  }
}

// ---------------------------------------------------------------------------
// Logowanie błędów dostawcy (bez poświadczeń!)
// ---------------------------------------------------------------------------

export interface ErrorLogEntry {
  timestamp: string;
  errorType: string;
  destination: string;
  errorMessage: string;
}

/**
 * Loguje błąd dostawcy poczty.
 * Zawiera: znacznik czasu, typ błędu, adres docelowy.
 * NIGDY nie loguje SMTP_USER ani SMTP_PASSWORD.
 */
export function logProviderError(
  error: unknown,
  destination: string,
  logger: (entry: ErrorLogEntry) => void = defaultLogger,
): void {
  const errorType =
    error instanceof Error ? error.constructor.name : 'UnknownError';
  const errorMessage =
    error instanceof Error ? sanitizeErrorMessage(error.message) : String(error);

  const entry: ErrorLogEntry = {
    timestamp: new Date().toISOString(),
    errorType,
    destination,
    errorMessage,
  };

  logger(entry);
}

/**
 * Usuwa potencjalne poświadczenia z komunikatu błędu.
 */
function sanitizeErrorMessage(message: string): string {
  const smtpUser = process.env.SMTP_USER;
  const smtpPassword = process.env.SMTP_PASSWORD;

  let sanitized = message;
  if (smtpUser && sanitized.includes(smtpUser)) {
    sanitized = sanitized.replaceAll(smtpUser, '[REDACTED]');
  }
  if (smtpPassword && sanitized.includes(smtpPassword)) {
    sanitized = sanitized.replaceAll(smtpPassword, '[REDACTED]');
  }
  return sanitized;
}

function defaultLogger(entry: ErrorLogEntry): void {
  console.error('[EmailProvider Error]', JSON.stringify(entry));
}

// ---------------------------------------------------------------------------
// Ponawianie prób — sendWithRetry
// ---------------------------------------------------------------------------

const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 2000;

/**
 * Sprawdza, czy błąd jest przejściowy (wart ponowienia).
 * Błędy przejściowe: timeout, ECONNREFUSED, ECONNRESET, ETIMEDOUT, kody 4xx SMTP.
 */
function isTransientError(error: unknown): boolean {
  if (!(error instanceof Error)) return true; // nieznane błędy — spróbuj ponownie

  const message = error.message.toLowerCase();
  const transientPatterns = [
    'timeout',
    'econnrefused',
    'econnreset',
    'etimedout',
    'enotfound',
    'socket',
    'connection',
    'network',
  ];

  if (transientPatterns.some((p) => message.includes(p))) {
    return true;
  }

  // Kody SMTP 4xx są przejściowe; 5xx to błędy trwałe
  if ('responseCode' in error) {
    const code = (error as { responseCode: number }).responseCode;
    if (code >= 400 && code < 500) return true;
    if (code >= 500) return false;
  }

  return true; // w razie wątpliwości — ponów
}

/**
 * Wysyła wiadomość z ponowieniem: 1 próba początkowa + maks. 2 ponowienia
 * w odstępach 2 s przy błędzie przejściowym.
 *
 * @param provider - instancja EmailProvider
 * @param message - wiadomość do wysłania
 * @param delay - funkcja opóźnienia (domyślnie setTimeout-based); wstrzykiwalna dla testów
 */
export async function sendWithRetry(
  provider: EmailProvider,
  message: MailMessage,
  delay: (ms: number) => Promise<void> = defaultDelay,
): Promise<void> {
  let lastError: unknown;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      await provider.send(message);
      return; // sukces — zakończ
    } catch (error) {
      lastError = error;
      logProviderError(error, message.to);

      // Nie ponawiaj przy błędzie trwałym
      if (!isTransientError(error)) {
        break;
      }

      // Nie czekaj po ostatniej próbie
      if (attempt < MAX_RETRIES) {
        await delay(RETRY_DELAY_MS);
      }
    }
  }

  // Wszystkie próby wyczerpane lub błąd trwały — propaguj ostatni błąd
  throw lastError;
}

function defaultDelay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
