/**
 * Route Handler — orkiestracja wysyłki wiadomości e-mail z formularza kontaktowego.
 *
 * Sekwencja: IP → rate limiter → parse JSON → honeypot → walidacja → konfiguracja Resend → wysyłka.
 *
 * Requirements: 1.1, 2.1, 3.6, 3.7, 3.8, 4.2, 4.3, 6.1, 6.4, 6.5
 */

import type { NextRequest } from 'next/server';
import { checkRateLimit } from '@/lib/contact/rate-limit';
import { parseContactRequest } from '@/lib/contact/validation';
import { buildMailMessage } from '@/lib/contact/message';
import {
  getResendConfig,
  ResendEmailProvider,
  sendWithRetry,
} from '@/lib/contact/email-provider';

export const runtime = 'nodejs';
export const maxDuration = 35;

/**
 * Odczytuje adres IP klienta z nagłówków żądania.
 * NextRequest.ip zostało usunięte w Next.js 15+ — korzystamy wyłącznie z nagłówków.
 */
function getClientIp(request: NextRequest): string {
  const xForwardedFor = request.headers.get('x-forwarded-for');
  if (xForwardedFor) {
    const firstIp = xForwardedFor.split(',')[0].trim();
    if (firstIp.length > 0) return firstIp;
  }

  const xRealIp = request.headers.get('x-real-ip');
  if (xRealIp && xRealIp.trim().length > 0) {
    return xRealIp.trim();
  }

  return 'unknown';
}

export async function POST(request: NextRequest): Promise<Response> {
  // 1. Odczyt IP z nagłówka
  const ip = getClientIp(request);

  // 2. Rate limiter → 429
  if (!checkRateLimit(ip)) {
    return Response.json(
      { ok: false, error: 'rate_limited' },
      { status: 429 },
    );
  }

  // 3. Parse JSON body → 400 przy błędzie
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { ok: false, error: 'validation', fields: { _form: 'Nieprawidłowe żądanie.' } },
      { status: 400 },
    );
  }

  // 4. Honeypot — szybkie odrzucenie jeśli niepuste
  const rawBody = body as Record<string, unknown>;
  const companyValue = typeof rawBody.company === 'string' ? rawBody.company : '';
  if (companyValue.length > 0) {
    return Response.json(
      { ok: false, error: 'validation', fields: { company: 'Nieprawidłowe żądanie.' } },
      { status: 400 },
    );
  }

  // 5. parseContactRequest → 400 + fields
  const validationResult = parseContactRequest({
    name: rawBody.name,
    email: rawBody.email,
    phone: rawBody.phone,
    message: rawBody.message,
    company: rawBody.company,
  });

  if (!validationResult.ok) {
    return Response.json(
      { ok: false, error: 'validation', fields: validationResult.fields },
      { status: 400 },
    );
  }

  // 6. Sprawdzenie konfiguracji Resend → 500
  const resendResult = getResendConfig();
  if (!resendResult.ok) {
    return Response.json(
      { ok: false, error: 'configuration' },
      { status: 500 },
    );
  }

  // 7. Budowa wiadomości
  const mailMessage = buildMailMessage(validationResult.data);

  // 8. Wysyłka z ponowieniem → 200 / 502
  try {
    const provider = new ResendEmailProvider(resendResult.config);
    await sendWithRetry(provider, mailMessage);
    return Response.json({ ok: true }, { status: 200 });
  } catch {
    return Response.json(
      { ok: false, error: 'delivery' },
      { status: 502 },
    );
  }
}
