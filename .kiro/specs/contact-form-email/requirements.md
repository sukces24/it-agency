# Dokument wymagań

## Wprowadzenie

Funkcja umożliwia wysyłanie wiadomości e-mail z danymi przesłanymi przez formularz kontaktowy znajdujący się w komponencie `TestimonialsContact`. Po wypełnieniu i przesłaniu formularza dane (imię i nazwisko, adres e-mail, opcjonalny numer telefonu oraz opis projektu) zostają przekazane do trasy API w aplikacji Next.js, która wysyła wiadomość na adres główny `kontakt@sukces-24.pl` z kopią (DW/CC) do `adrian648@gmail.com`. Funkcja obejmuje walidację danych po stronie serwera, ochronę przed spamem, obsługę stanów sukcesu i błędu oraz informację zwrotną dla użytkownika.

Obecny formularz jedynie wyświetla komunikat `alert` i czyści pola, bez realnego wysyłania danych. Celem jest zastąpienie tej logiki rzeczywistym mechanizmem dostarczania wiadomości.

## Słownik pojęć

- **System**: Kompletne rozwiązanie wysyłania wiadomości e-mail z formularza kontaktowego, obejmujące komponent formularza po stronie klienta oraz trasę API po stronie serwera.
- **Formularz_Kontaktowy**: Komponent kliencki `TestimonialsContact` zawierający pola formularza i obsługujący przesłanie danych.
- **Trasa_API**: Punkt końcowy po stronie serwera w aplikacji Next.js, odbierający dane formularza i inicjujący wysyłkę wiadomości e-mail.
- **Dostawca_Email**: Zewnętrzna usługa lub mechanizm transportowy (np. dostawca SMTP lub usługa transakcyjnych wiadomości e-mail) odpowiedzialny za fizyczne dostarczenie wiadomości.
- **Adres_Główny**: Adres odbiorcy głównego wiadomości, czyli `kontakt@sukces-24.pl`.
- **Adres_DW**: Adres odbiorcy kopii (DW/CC) wiadomości, czyli `adrian648@gmail.com`.
- **Dane_Formularza**: Zestaw wartości przesłanych przez użytkownika: imię i nazwisko, adres e-mail, numer telefonu (opcjonalny), opis projektu.
- **Pole_Antyspamowe**: Ukryte pole typu honeypot służące do wykrywania automatycznego przesyłania formularza przez boty.

## Wymagania

### Wymaganie 1: Przesłanie danych formularza do serwera

**User Story:** Jako potencjalny klient chcę przesłać dane wypełnionego formularza kontaktowego, aby firma otrzymała moje zapytanie.

#### Kryteria akceptacji

1. WHEN użytkownik zatwierdza Formularz_Kontaktowy, a wszystkie pola wymagane (imię i nazwisko, adres e-mail, opis projektu) są wypełnione, a adres e-mail ma format zawierający część lokalną, znak „@" oraz domenę, THE Formularz_Kontaktowy SHALL wysłać Dane_Formularza do Trasy_API metodą HTTP POST.
2. THE Dane_Formularza SHALL zawierać pola: imię i nazwisko (od 1 do 100 znaków), adres e-mail (od 1 do 254 znaków), opcjonalny numer telefonu (od 0 do 20 znaków) oraz opis projektu (od 1 do 5000 znaków).
3. WHEN Formularz_Kontaktowy wysyła Dane_Formularza, THE Formularz_Kontaktowy SHALL zapobiec domyślnemu przeładowaniu strony.
4. IF którekolwiek pole wymagane (imię i nazwisko, adres e-mail, opis projektu) jest puste lub adres e-mail nie spełnia wymaganego formatu, THEN THE Formularz_Kontaktowy SHALL wstrzymać wysłanie Dane_Formularza do Trasy_API oraz wyświetlić komunikat wskazujący pole wymagające poprawy.
5. WHILE trwa wysyłanie Dane_Formularza do Trasy_API, THE Formularz_Kontaktowy SHALL zablokować ponowne zatwierdzenie formularza do czasu otrzymania odpowiedzi lub upływu limitu 30 sekund.

### Wymaganie 2: Wysłanie wiadomości e-mail z danymi formularza

**User Story:** Jako właściciel firmy chcę otrzymywać wiadomość e-mail z danymi z formularza, aby móc odpowiedzieć na zapytanie klienta.

#### Kryteria akceptacji

1. WHEN Trasa_API odbiera poprawne Dane_Formularza, THE Trasa_API SHALL zlecić Dostawcy_Email wysłanie wiadomości na Adres_Główny.
2. WHEN Trasa_API zleca wysłanie wiadomości, THE Trasa_API SHALL ustawić Adres_DW jako odbiorcę kopii (DW/CC) tej samej wiadomości.
3. THE Trasa_API SHALL umieścić w treści wiadomości wszystkie wartości Danych_Formularza: imię i nazwisko, adres e-mail, numer telefonu oraz opis projektu.
4. WHERE numer telefonu nie został podany, THE Trasa_API SHALL oznaczyć w treści wiadomości pole telefonu jako nieuzupełnione.
5. THE Trasa_API SHALL ustawić adres e-mail podany przez użytkownika jako adres odpowiedzi (reply-to) wiadomości.

### Wymaganie 3: Walidacja danych po stronie serwera

**User Story:** Jako właściciel firmy chcę, aby dane z formularza były weryfikowane przed wysłaniem wiadomości, aby otrzymywać kompletne i prawidłowe zapytania.

#### Kryteria akceptacji

1. IF pole imię i nazwisko jest puste, zawiera wyłącznie znaki białe lub przekracza 100 znaków, THEN THE Trasa_API SHALL odrzucić żądanie z kodem statusu HTTP 400.
2. IF pole adres e-mail jest puste, nie odpowiada formatowi adresu e-mail lub przekracza 254 znaki, THEN THE Trasa_API SHALL odrzucić żądanie z kodem statusu HTTP 400.
3. IF pole opis projektu jest puste lub zawiera wyłącznie znaki białe, THEN THE Trasa_API SHALL odrzucić żądanie z kodem statusu HTTP 400.
4. IF pole opis projektu przekracza 5000 znaków, THEN THE Trasa_API SHALL odrzucić żądanie z kodem statusu HTTP 400.
5. WHERE pole telefon zostało wypełnione, IF wartość pola telefon przekracza 20 znaków lub zawiera znaki inne niż cyfry, spacje oraz znaki „+", „-", „(", „)", THEN THE Trasa_API SHALL odrzucić żądanie z kodem statusu HTTP 400.
6. IF Pole_Antyspamowe zawiera jakąkolwiek wartość, THEN THE Trasa_API SHALL odrzucić żądanie z kodem statusu HTTP 400 i nie wywoływać Dostawca_Email.
7. WHEN Trasa_API odrzuca żądanie z powodu niepoprawnych danych, THE Trasa_API SHALL zwrócić komunikat opisujący przyczynę odrzucenia oraz nie wywoływać Dostawca_Email.
8. WHEN wszystkie pola Dane_Formularza przejdą walidację, THE Trasa_API SHALL przekazać żądanie do wysyłki wiadomości.

### Wymaganie 4: Ochrona przed spamem

**User Story:** Jako właściciel firmy chcę ograniczyć automatyczne zgłoszenia od botów, aby skrzynka odbiorcza nie była zaśmiecana spamem.

#### Kryteria akceptacji

1. THE Formularz_Kontaktowy SHALL zawierać Pole_Antyspamowe, które jest niewidoczne wizualnie dla użytkownika i które przy przesłaniu przez człowieka pozostaje puste (0 znaków).
2. IF Pole_Antyspamowe zawiera niepustą wartość (co najmniej 1 znak) w odebranym żądaniu, THEN THE Trasa_API SHALL odrzucić żądanie z kodem statusu HTTP 400, bez zlecania wysyłki wiadomości do Dostawca_Email oraz bez zachowywania Dane_Formularza.
3. WHEN ten sam adres IP przekracza 5 przesłań Formularz_Kontaktowy w ciągu kolejnych 60 minut, THE Trasa_API SHALL odrzucać każde kolejne żądanie z tego adresu IP z kodem statusu HTTP 429 aż do upływu 60-minutowego okna liczonego od pierwszego przesłania.
4. IF żądanie zostaje odrzucone z kodem statusu HTTP 400 lub HTTP 429, THEN THE System SHALL wyświetlić w Formularz_Kontaktowym komunikat o błędzie wskazujący na niepowodzenie wysłania zgłoszenia, zachowując wprowadzone wcześniej Dane_Formularza w polach formularza.

### Wymaganie 5: Informacja zwrotna dla użytkownika

**User Story:** Jako potencjalny klient chcę otrzymać wyraźny komunikat o wyniku przesłania formularza, aby wiedzieć, czy moje zapytanie zostało dostarczone.

#### Kryteria akceptacji

1. WHEN Trasa_API potwierdza pomyślne zlecenie wysyłki wiadomości w ciągu maksymalnie 30 sekund, THE Formularz_Kontaktowy SHALL wyświetlić komunikat o powodzeniu widoczny przez co najmniej 5 sekund oraz wyczyścić wszystkie pola Danych_Formularza.
2. WHILE trwa wysyłanie Danych_Formularza do Trasy_API, THE Formularz_Kontaktowy SHALL zablokować przycisk zatwierdzania oraz wyświetlić widoczny wskaźnik stanu przetwarzania (zmiana etykiety przycisku lub animacja ładowania).
3. IF Trasa_API zwraca odpowiedź negatywną (błąd), THEN THE Formularz_Kontaktowy SHALL wyświetlić komunikat o błędzie informujący o niepowodzeniu wysyłki, odblokować przycisk zatwierdzania oraz zachować wszystkie wprowadzone przez użytkownika wartości.
4. IF Trasa_API nie zwróci odpowiedzi w ciągu 30 sekund, THEN THE Formularz_Kontaktowy SHALL przerwać żądanie, wyświetlić komunikat o błędzie informujący o przekroczeniu czasu wysyłki, odblokować przycisk zatwierdzania oraz zachować wszystkie wprowadzone przez użytkownika wartości.

### Wymaganie 6: Obsługa błędów dostawcy poczty

**User Story:** Jako właściciel firmy chcę, aby system poprawnie reagował na awarie usługi wysyłki, aby uniknąć utraty zapytań bez śladu.

#### Kryteria akceptacji

1. IF Dostawca_Email zwraca błąd podczas wysyłki wiadomości lub nie odpowie w ciągu 10 sekund, THEN THE Trasa_API SHALL zwrócić kod statusu HTTP 502 oraz odpowiedź zawierającą komunikat wskazujący na niepowodzenie wysyłki.
2. WHEN Dostawca_Email zwraca błąd podczas wysyłki, THE Trasa_API SHALL zarejestrować w logach serwera szczegóły błędu (znacznik czasu, typ błędu, adres docelowy wiadomości) bez zapisywania danych uwierzytelniających.
3. THE Trasa_API SHALL odczytywać dane uwierzytelniające Dostawcy_Email ze zmiennych środowiskowych.
4. IF zmienne środowiskowe zawierające dane uwierzytelniające Dostawcy_Email są nieobecne lub puste, THEN THE Trasa_API SHALL przerwać operację bez podejmowania próby wysyłki oraz zwrócić kod statusu HTTP 500 z komunikatem wskazującym na błąd konfiguracji.
5. IF wysyłka zakończy się błędem przejściowym Dostawcy_Email, THEN THE Trasa_API SHALL ponowić próbę wysyłki maksymalnie 2 razy w odstępach 2 sekund, zanim zwróci kod statusu HTTP 502.
