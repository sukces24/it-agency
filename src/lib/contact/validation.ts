/**
 * Walidacja danych formularza kontaktowego.
 * Czysta funkcja parseContactRequest — źródło prawdy walidacji po stronie serwera.
 */

/**
 * Dane surowe z żądania (nieprzetworzone).
 */
export interface ContactFormInput {
  name: unknown;
  email: unknown;
  phone: unknown;
  message: unknown;
  company: unknown; // honeypot
}

/**
 * Dane kontaktowe po walidacji i normalizacji.
 */
export interface ContactData {
  name: string; // przycięte, 1–100 znaków
  email: string; // przycięte, 1–254 znaki, poprawny format
  phone: string | null; // null gdy nie podano; w przeciwnym razie ≤20 znaków, dozwolone znaki
  message: string; // przycięte, 1–5000 znaków
}

/**
 * Wynik walidacji danych formularza.
 */
export type ValidationResult =
  | { ok: true; data: ContactData }
  | { ok: false; fields: Record<string, string> };

/**
 * Sprawdza format e-mail: musi zawierać `@` z co najmniej jednym znakiem
 * przed i po (format lokalna@domena).
 */
function isValidEmailFormat(email: string): boolean {
  const atIndex = email.indexOf("@");
  if (atIndex < 1) return false; // brak @ lub nic przed @
  const domain = email.slice(atIndex + 1);
  if (domain.length === 0) return false; // nic po @
  if (domain.indexOf("@") !== -1) return false; // więcej niż jeden @
  return true;
}

/** Dozwolone znaki w numerze telefonu: cyfry, spacja, +, -, (, ) */
const PHONE_ALLOWED_CHARS = /^[0-9 +\-()]*$/;

/**
 * Parsuje i waliduje dane formularza kontaktowego.
 * Zbiera WSZYSTKIE błędy walidacji (nie przerywa na pierwszym).
 */
export function parseContactRequest(input: ContactFormInput): ValidationResult {
  const fields: Record<string, string> = {};

  // --- Honeypot ---
  const companyRaw =
    typeof input.company === "string" ? input.company : "";
  if (companyRaw.length > 0) {
    fields.company = "invalidRequest";
  }

  // --- Name ---
  const nameRaw = typeof input.name === "string" ? input.name.trim() : "";
  if (nameRaw.length === 0) {
    fields.name = "name.required";
  } else if (nameRaw.length > 100) {
    fields.name = "name.tooLong";
  }

  // --- Email ---
  const emailRaw = typeof input.email === "string" ? input.email.trim() : "";
  if (emailRaw.length === 0) {
    fields.email = "email.required";
  } else if (emailRaw.length > 254) {
    fields.email = "email.tooLong";
  } else if (!isValidEmailFormat(emailRaw)) {
    fields.email = "email.invalid";
  }

  // --- Message ---
  const messageRaw =
    typeof input.message === "string" ? input.message.trim() : "";
  if (messageRaw.length === 0) {
    fields.message = "message.required";
  } else if (messageRaw.length > 5000) {
    fields.message = "message.tooLong";
  }

  // --- Phone (opcjonalny) ---
  const phoneRaw = typeof input.phone === "string" ? input.phone.trim() : "";
  let phoneValue: string | null = null;

  if (phoneRaw.length > 0) {
    if (phoneRaw.length > 20) {
      fields.phone = "phone.tooLong";
    } else if (!PHONE_ALLOWED_CHARS.test(phoneRaw)) {
      fields.phone = "phone.invalid";
    } else {
      phoneValue = phoneRaw;
    }
  }

  // --- Wynik ---
  if (Object.keys(fields).length > 0) {
    return { ok: false, fields };
  }

  return {
    ok: true,
    data: {
      name: nameRaw,
      email: emailRaw,
      phone: phoneValue,
      message: messageRaw,
    },
  };
}
