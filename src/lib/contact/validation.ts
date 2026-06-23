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
    fields.company = "Nieprawidłowe żądanie.";
  }

  // --- Name ---
  const nameRaw = typeof input.name === "string" ? input.name.trim() : "";
  if (nameRaw.length === 0) {
    fields.name = "Imię i nazwisko jest wymagane.";
  } else if (nameRaw.length > 100) {
    fields.name = "Imię i nazwisko nie może przekraczać 100 znaków.";
  }

  // --- Email ---
  const emailRaw = typeof input.email === "string" ? input.email.trim() : "";
  if (emailRaw.length === 0) {
    fields.email = "Adres e-mail jest wymagany.";
  } else if (emailRaw.length > 254) {
    fields.email = "Adres e-mail nie może przekraczać 254 znaków.";
  } else if (!isValidEmailFormat(emailRaw)) {
    fields.email = "Adres e-mail ma nieprawidłowy format.";
  }

  // --- Message ---
  const messageRaw =
    typeof input.message === "string" ? input.message.trim() : "";
  if (messageRaw.length === 0) {
    fields.message = "Opis projektu jest wymagany.";
  } else if (messageRaw.length > 5000) {
    fields.message = "Opis projektu nie może przekraczać 5000 znaków.";
  }

  // --- Phone (opcjonalny) ---
  const phoneRaw = typeof input.phone === "string" ? input.phone.trim() : "";
  let phoneValue: string | null = null;

  if (phoneRaw.length > 0) {
    if (phoneRaw.length > 20) {
      fields.phone = "Numer telefonu nie może przekraczać 20 znaków.";
    } else if (!PHONE_ALLOWED_CHARS.test(phoneRaw)) {
      fields.phone =
        "Numer telefonu może zawierać wyłącznie cyfry, spacje oraz znaki +, -, (, ).";
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
