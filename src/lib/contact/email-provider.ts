/**
 * Dostawca poczty e-mail — interfejs, implementacja Resend,
 * walidacja konfiguracji, ponawianie prób i logowanie błędów.
 *
 * Requirements: 6.1, 6.2, 6.3, 6.5
 */

import { Resend } from 'resend';
import type { MailMessage } from './message';

// ---------------------------------------------------------------------------
// Interfejs EmailProvider
// ---------------------------------------------------------------------------

export interface EmailProvider {
  send(message: MailMessage): Promise<void>;
}

// ---------------------------------------------------------------------------
// Konfiguracja Resend — walidacja zmiennych środowiskowych
// ---------------------------------------------------------------------------

export interface ResendConfig {
  apiKey: string;
  from: string;
}

export type ResendConfigResult =
  | { ok: true; config: ResendConfig }
  | { ok: false; missing: string[] };

/** Domyślny adres nadawcy, gdy RESEND_FROM nie jest ustawiony. */
const RESEND_FROM_DEFAULT = 'Formularz kontaktowy <kontakt@sukces-24.pl>';

/**
 * Odczytuje i waliduje konfigurację Resend ze zmiennych środowiskowych.
 * RESEND_API_KEY jest wymagany; RESEND_FROM jest opcjonalny (ma wartość domyślną).
 * Zwraca informację o brakujących zmiennych (bez logowania poświadczeń).
 */
export function getResendConfig(): ResendConfigResult {
  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey) {
    return { ok: false, missing: ['RESEND_API_KEY'] };
  }

  const from = process.env.RESEND_FROM?.trim() || RESEND_FROM_DEFAULT;

  return {
    ok: true,
    config: {
      apiKey,
      from,
    },
  };
}

// ---------------------------------------------------------------------------
// Implementacja ResendEmailProvider
// ---------------------------------------------------------------------------

export class ResendEmailProvider implements EmailProvider {
  private resend: Resend;
  private from: string;

  constructor(config: ResendConfig) {
    this.from = config.from;
    this.resend = new Resend(config.apiKey);
  }

  async send(message: MailMessage): Promise<void> {
    const { error } = await this.resend.emails.send({
      from: this.from,
      to: message.to,
      cc: message.cc,
      replyTo: message.replyTo,
      subject: message.subject,
      text: message.text,
    });

    if (error) {
      throw new Error(`Resend error: ${error.name} - ${error.message}`);
    }
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
 * NIGDY nie loguje RESEND_API_KEY.
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
  const apiKey = process.env.RESEND_API_KEY;

  let sanitized = message;
  if (apiKey && sanitized.includes(apiKey)) {
    sanitized = sanitized.replaceAll(apiKey, '[REDACTED]');
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
