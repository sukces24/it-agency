# Plan implementacji: Wysyłka e-mail z formularza kontaktowego

## Przegląd

Plan dzieli implementację na inkrementalne kroki kodowania zgodne z dokumentem projektowym. Najpierw konfigurujemy zależności i środowisko testowe, następnie budujemy czyste warstwy logiki (walidacja, budowa wiadomości, rate limiter, dostawca poczty) wraz z testami właściwościowymi, potem orkiestrujący Route Handler, a na końcu modyfikujemy komponent kliencki i spinamy całość. Język implementacji: **TypeScript** (zgodnie z dokumentem projektowym i istniejącym projektem Next.js 16 / App Router).

> Uwaga dot. Next.js: projekt używa Next.js 16.2.9 z istotnymi zmianami łamiącymi (m.in. usunięte `NextRequest.ip`). Przed pisaniem kodu warstwy serwerowej należy zajrzeć do dokumentacji w `node_modules/next/dist/docs/` (Route Handlers, `next-request.md`, `serverExternalPackages.md`, `runtime.md`, `maxDuration.md`).

> Uwaga dot. uruchamiania: testy uruchamiamy jednorazowo (`vitest --run`), nie w trybie watch. Serwer deweloperski uruchamia użytkownik samodzielnie.

## Tasks

- [x] 1. Konfiguracja zależności, środowiska testowego i Next.js
  - [x] 1.1 Skonfigurować zależności, Vitest, Next.js i zmienne środowiskowe
    - Dodać zależności runtime: `nodemailer` (oraz `@types/nodemailer`).
    - Dodać zależności deweloperskie: `vitest`, `fast-check`, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`, `jsdom`.
    - Dodać `nodemailer` do `serverExternalPackages` w `next.config.ts` (zgodnie z `node_modules/next/dist/docs/.../serverExternalPackages.md`).
    - Utworzyć `vitest.config.ts` z `environment: 'jsdom'` dla testów komponentu oraz skryptem `"test": "vitest --run"` w `package.json`.
    - Dodać plik `.env.example` z kluczami: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `SMTP_FROM`, `CONTACT_TO=kontakt@sukces-24.pl`, `CONTACT_CC=adrian648@gmail.com` (bez realnych wartości).
    - _Requirements: 6.3, 2.1, 2.2_

- [x] 2. Walidacja danych po stronie serwera
  - [x] 2.1 Zdefiniować typy i zaimplementować `parseContactRequest` w `src/lib/contact/validation.ts`
    - Zdefiniować `ContactFormInput`, `ContactData`, `ValidationResult` zgodnie z dokumentem projektowym.
    - Zaimplementować przycinanie (trim) oraz reguły: `name` (1–100), `email` (1–254, format `lokalna@domena`), `message` (1–5000), `phone` (opcjonalny: ≤20 znaków, dozwolone `[0-9 +\-()]`, normalizacja pustego do `null`).
    - Wykrywać niepuste honeypot (`company`) jako błąd walidacji.
    - Zwracać mapę `fields` (pole → komunikat) dla danych niepoprawnych.
    - _Requirements: 1.2, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

  - [ ]* 2.2 Test właściwościowy walidacji pola „imię i nazwisko"
    - **Property 1: Walidacja pola „imię i nazwisko"** — odrzucenie z komunikatem dla `name` wtedy i tylko wtedy, gdy po przycięciu puste lub > 100 znaków.
    - Generować losowe wejścia (poprawne i niepoprawne `name`); min. 100 iteracji; komentarz `Feature: contact-form-email, Property 1`.
    - **Validates: Requirements 1.4, 3.1**

  - [ ]* 2.3 Test właściwościowy walidacji adresu e-mail
    - **Property 2: Walidacja adresu e-mail** — odrzucenie z komunikatem dla `email` wtedy i tylko wtedy, gdy pusty, > 254 znaki lub niezgodny z formatem `lokalna@domena`.
    - Min. 100 iteracji; komentarz `Feature: contact-form-email, Property 2`.
    - **Validates: Requirements 1.4, 3.2**

  - [ ]* 2.4 Test właściwościowy walidacji opisu projektu
    - **Property 3: Walidacja opisu projektu** — odrzucenie z komunikatem dla `message` wtedy i tylko wtedy, gdy po przycięciu puste lub > 5000 znaków.
    - Min. 100 iteracji; komentarz `Feature: contact-form-email, Property 3`.
    - **Validates: Requirements 1.4, 3.3, 3.4**

  - [ ]* 2.5 Test właściwościowy walidacji opcjonalnego telefonu
    - **Property 4: Walidacja opcjonalnego telefonu** — dla niepustego `phone` odrzucenie wtw gdy > 20 znaków lub znak spoza `[cyfry, spacja, +, -, (, )]`; pusty/pominięty zawsze akceptowany i normalizowany do `null`.
    - Min. 100 iteracji; komentarz `Feature: contact-form-email, Property 4`.
    - **Validates: Requirements 3.5**

- [x] 3. Budowa treści wiadomości e-mail
  - [x] 3.1 Zaimplementować `buildMailMessage` w `src/lib/contact/message.ts`
    - Zdefiniować interfejs `MailMessage` (`to`, `cc`, `replyTo`, `subject`, `text`).
    - Ustawiać `to` = `CONTACT_TO` (`kontakt@sukces-24.pl`), `cc` = `CONTACT_CC` (`adrian648@gmail.com`), `replyTo` = e-mail użytkownika.
    - Składać treść tekstową zawierającą imię i nazwisko, e-mail, opis projektu oraz telefon; przy braku telefonu wstawić czytelny znacznik „nie podano".
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

  - [ ]* 3.2 Test właściwościowy odbiorców i reply-to wiadomości
    - **Property 7: Wiadomość zawiera poprawnych odbiorców i reply-to** — `to`/`cc`/`replyTo` zgodne z adresami i e-mailem użytkownika.
    - Generować losowe poprawne `ContactData`; min. 100 iteracji; komentarz `Feature: contact-form-email, Property 7`.
    - **Validates: Requirements 2.1, 2.2, 2.5**

  - [ ]* 3.3 Test właściwościowy zawartości treści wiadomości
    - **Property 8: Treść wiadomości zawiera wszystkie dane formularza** — treść zawiera imię, e-mail, opis; telefon obecny gdy podany, w przeciwnym razie znacznik braku.
    - Generować losowe poprawne `ContactData` (z telefonem i bez); min. 100 iteracji; komentarz `Feature: contact-form-email, Property 8`.
    - **Validates: Requirements 2.3, 2.4**

- [x] 4. Ograniczanie liczby żądań (rate limiter)
  - [x] 4.1 Zaimplementować rate limiter w `src/lib/contact/rate-limit.ts`
    - Zdefiniować `RateLimitEntry` (`windowStart`, `count`) i mapę `ip → RateLimitEntry` w pamięci procesu.
    - Funkcja decyzyjna przyjmująca IP i znacznik czasu: dopuszczać do 5 żądań w oknie 60 min liczonym od pierwszego żądania; 6. i kolejne → odmowa; reset po upływie okna.
    - Wstrzykiwalny dostawca czasu (parametr `now`) dla testowalności.
    - _Requirements: 4.3_

  - [ ]* 4.2 Test właściwościowy ograniczania liczby żądań po IP
    - **Property 9: Ograniczanie liczby żądań po adresie IP** — max 5 żądań w oknie 60 min, odmowa kolejnych aż do upływu okna, reset po oknie.
    - Generować sekwencje znaczników czasu żądań z jednego IP; min. 100 iteracji; komentarz `Feature: contact-form-email, Property 9`.
    - **Validates: Requirements 4.3**

- [x] 5. Dostawca poczty i ponawianie prób
  - [x] 5.1 Zaimplementować interfejs `EmailProvider` i `NodemailerEmailProvider` w `src/lib/contact/email-provider.ts`
    - Zdefiniować interfejs `EmailProvider` z metodą `send(message: MailMessage): Promise<void>`.
    - Zaimplementować `NodemailerEmailProvider` tworzący transporter z `nodemailer.createTransport` na podstawie zmiennych środowiskowych; ustawić `connectionTimeout`/`greetingTimeout`/`socketTimeout` tak, by pojedyncza próba nie przekraczała ~10 s.
    - Dodać funkcję odczytu/walidacji konfiguracji SMTP zwracającą informację o brakujących/pustych zmiennych (bez logowania poświadczeń).
    - Dodać `sendWithRetry(provider, message)`: 1 próba + maks. 2 ponowienia w odstępach 2 s przy błędzie przejściowym.
    - Dodać logowanie błędu dostawcy (znacznik czasu, typ błędu, adres docelowy) bez danych uwierzytelniających.
    - _Requirements: 6.1, 6.2, 6.3, 6.5_

  - [ ]* 5.2 Test smoke odczytu konfiguracji i logowania błędu
    - Sprawdzić, że provider odczytuje poświadczenia ze zmiennych środowiskowych (6.3).
    - Sprawdzić z atrapą loggera, że log błędu zawiera znacznik czasu, typ błędu i adres docelowy oraz NIE zawiera `SMTP_USER`/`SMTP_PASSWORD` (6.2).
    - _Requirements: 6.2, 6.3_

  - [ ]* 5.3 Test właściwościowy ponawiania prób i mapowania na 502
    - **Property 11: Ponawianie prób i mapowanie błędu na 502** — przy błędzie przejściowym dokładnie 3 próby przed propagacją błędu; sukces którejkolwiek próby kończy ponawianie.
    - Atrapa dostawcy zwracająca błędy/sukces na różnych próbach; min. 100 iteracji; komentarz `Feature: contact-form-email, Property 11`.
    - **Validates: Requirements 6.1, 6.5**

- [x] 6. Checkpoint — czysta logika
  - Upewnić się, że wszystkie testy przechodzą; w razie wątpliwości zapytać użytkownika.

- [x] 7. Route Handler `/api/contact`
  - [x] 7.1 Zaimplementować orkiestrację w `src/app/api/contact/route.ts`
    - Wyeksportować `runtime = 'nodejs'`, `maxDuration = 35` oraz `async function POST(request: NextRequest)`.
    - Odczytać IP z nagłówka `x-forwarded-for` (pierwszy adres), awaryjnie `x-real-ip`, w ostateczności `"unknown"` (uwzględnić usunięcie `NextRequest.ip` w Next 15+).
    - Sekwencja: rate limiter → 429; parse JSON (błąd → 400); honeypot → 400; `parseContactRequest` → 400 + `fields`; sprawdzenie konfiguracji SMTP → 500; `buildMailMessage` + `sendWithRetry` → 200 / 502.
    - Mapować wyniki na kody i kształt JSON z dokumentu projektowego (`{ ok, error, fields? }`).
    - _Requirements: 1.1, 2.1, 3.6, 3.7, 3.8, 4.2, 4.3, 6.1, 6.4, 6.5_

  - [ ]* 7.2 Test odczytu IP z nagłówka
    - Zweryfikować odczyt IP z `x-forwarded-for` oraz awaryjnie `x-real-ip` przy braku `request.ip`.
    - _Requirements: 4.3_

  - [ ]* 7.3 Test właściwościowy blokady honeypot
    - **Property 5: Honeypot blokuje boty bez wysyłki** — niepuste `company` → 400 i brak wywołania atrapy dostawcy.
    - Wejścia z losową niepustą wartością honeypot; min. 100 iteracji; komentarz `Feature: contact-form-email, Property 5`.
    - **Validates: Requirements 3.6, 4.2**

  - [ ]* 7.4 Test właściwościowy „tylko poprawne dane trafiają do wysyłki"
    - **Property 6: Tylko poprawne dane trafiają do wysyłki** — dostawca wywołany dokładnie raz wtw gdy wejście przejdzie walidację; w przeciwnym razie brak wywołania + komunikat o przyczynie.
    - Mieszanka wejść poprawnych i niepoprawnych z atrapą dostawcy; min. 100 iteracji; komentarz `Feature: contact-form-email, Property 6`.
    - **Validates: Requirements 3.7, 3.8**

  - [ ]* 7.5 Test właściwościowy braku konfiguracji → 500
    - **Property 10: Brak konfiguracji skutkuje kodem 500 bez wysyłki** — przy braku/pustej wymaganej zmiennej SMTP trasa zwraca 500 i nie wywołuje dostawcy.
    - Konfiguracje env z losowo usuwanymi wymaganymi zmiennymi; min. 100 iteracji; komentarz `Feature: contact-form-email, Property 10`.
    - **Validates: Requirements 6.4**

- [x] 8. Checkpoint — warstwa serwerowa
  - Upewnić się, że wszystkie testy przechodzą; w razie wątpliwości zapytać użytkownika.

- [x] 9. Modyfikacja komponentu klienckiego `TestimonialsContact`
  - [x] 9.1 Przekształcić formularz na pola kontrolowane i dodać honeypot
    - Wprowadzić `useState` dla `name`, `email`, `phone`, `message` oraz ukrytego `company` (honeypot).
    - Dodać pole honeypot `<input name="company" tabIndex={-1} autoComplete="off">` ukryte wizualnie (poza ekranem / `aria-hidden`), pozostające puste dla człowieka.
    - _Requirements: 1.2, 4.1_

  - [x] 9.2 Zaimplementować `handleSubmit` z wysyłką, walidacją wstępną i stanami UI
    - `e.preventDefault()`; walidacja wstępna pól wymaganych i formatu e-mail (przy błędzie komunikat, bez wysyłki).
    - Stan `status: 'idle' | 'submitting' | 'success' | 'error'` + `errorMessage`; podczas wysyłki blokada przycisku i zmiana etykiety/wskaźnik ładowania.
    - `fetch('/api/contact', POST, JSON)` z `AbortController` i `setTimeout(30000)`; czyszczenie timeoutu po odpowiedzi.
    - Sukces (200) → komunikat sukcesu widoczny min. 5 s + czyszczenie pól; błąd/timeout/błąd sieci → komunikat błędu, odblokowanie przycisku, zachowanie wprowadzonych wartości.
    - _Requirements: 1.1, 1.3, 1.4, 1.5, 4.4, 5.1, 5.2, 5.3, 5.4_

  - [ ]* 9.3 Testy jednostkowe komponentu (React Testing Library)
    - `preventDefault` i wstrzymanie wysyłki przy niepoprawnych danych (1.3, 1.4); blokada przycisku i wskaźnik podczas wysyłki (1.5, 5.2).
    - Komunikat sukcesu min. 5 s + czyszczenie pól (5.1, fake timers); zachowanie wartości i odblokowanie przy błędzie (4.4, 5.3); przerwanie po 30 s i komunikat o przekroczeniu czasu (5.4); obecność i ukrycie honeypot (4.1).
    - _Requirements: 1.3, 1.4, 1.5, 4.1, 4.4, 5.1, 5.2, 5.3, 5.4_

- [x] 10. Spięcie całości i weryfikacja
  - [x] 10.1 Zintegrować komponent z trasą i zweryfikować ścieżkę
    - Potwierdzić, że komponent wysyła do `/api/contact` zgodny kontrakt JSON i poprawnie obsługuje wszystkie kody odpowiedzi (200/400/429/500/502).
    - Uruchomić `vitest --run` oraz `next build`; usunąć ewentualne pliki tymczasowe.
    - _Requirements: 1.1, 4.4, 5.1, 5.3_

  - [ ]* 10.2 Opcjonalny test integracyjny end-to-end z atrapą SMTP
    - Zweryfikować pełną ścieżkę 200 z atrapą serwera/transportu SMTP (bez realnej wysyłki).
    - _Requirements: 2.1, 2.2, 2.3_

- [x] 11. Końcowy checkpoint
  - Upewnić się, że wszystkie testy przechodzą i `next build` kończy się sukcesem; w razie wątpliwości zapytać użytkownika.

## Notes

- Zadania oznaczone `*` są opcjonalne (testy) i mogą zostać pominięte dla szybszego MVP.
- Każde zadanie odwołuje się do konkretnych wymagań (granularnych podpunktów) dla zachowania śledzalności.
- Testy właściwościowe (`fast-check`) uruchamiają min. 100 iteracji każdy i odwołują się do właściwości z dokumentu projektowego.
- Testy jednostkowe/przykładowe pokrywają zachowania UI oraz przypadki brzegowe; testy smoke pokrywają konfigurację i logowanie.
- Checkpointy zapewniają inkrementalną walidację po zamknięciu spójnych warstw.
- Poświadczenia SMTP nigdy nie trafiają do logów ani do treści odpowiedzi.

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["2.1", "3.1", "4.1", "5.1", "9.1"] },
    { "id": 2, "tasks": ["2.2", "2.3", "2.4", "2.5", "3.2", "3.3", "4.2", "5.2", "5.3", "9.2"] },
    { "id": 3, "tasks": ["7.1", "9.3"] },
    { "id": 4, "tasks": ["7.2", "7.3", "7.4", "7.5"] },
    { "id": 5, "tasks": ["10.1"] },
    { "id": 6, "tasks": ["10.2"] }
  ]
}
```
