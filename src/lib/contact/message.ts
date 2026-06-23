/**
 * Budowa treści wiadomości e-mail z danych formularza kontaktowego.
 */

import type { ContactData } from './validation';

export interface MailMessage {
  to: string;
  cc: string;
  replyTo: string;
  subject: string;
  text: string;
}

const CONTACT_TO_DEFAULT = 'kontakt@sukces-24.pl';
const CONTACT_CC_DEFAULT = 'adrian648@gmail.com';

/**
 * Buduje obiekt wiadomości e-mail na podstawie zwalidowanych danych kontaktowych.
 *
 * @param data - zwalidowane dane formularza (ContactData)
 * @param to - adres główny odbiorcy (domyślnie CONTACT_TO z env lub stała)
 * @param cc - adres DW (domyślnie CONTACT_CC z env lub stała)
 * @returns MailMessage gotowy do wysyłki przez EmailProvider
 */
export function buildMailMessage(
  data: ContactData,
  to: string = process.env.CONTACT_TO || CONTACT_TO_DEFAULT,
  cc: string = process.env.CONTACT_CC || CONTACT_CC_DEFAULT,
): MailMessage {
  const phoneDisplay = data.phone ?? 'nie podano';

  const text = [
    `Imię i nazwisko: ${data.name}`,
    `E-mail: ${data.email}`,
    `Telefon: ${phoneDisplay}`,
    '',
    'Opis projektu:',
    data.message,
  ].join('\n');

  return {
    to,
    cc,
    replyTo: data.email,
    subject: `Formularz kontaktowy — ${data.name}`,
    text,
  };
}
