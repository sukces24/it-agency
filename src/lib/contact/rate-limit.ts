/**
 * Rate limiter — ograniczanie liczby żądań po adresie IP.
 *
 * Okno: 60 minut od pierwszego żądania.
 * Limit: 5 żądań na IP w obrębie okna.
 * Po upływie okna licznik resetuje się automatycznie.
 */

const WINDOW_MS = 60 * 60 * 1000; // 60 minut w milisekundach
const MAX_REQUESTS = 5;

export interface RateLimitEntry {
  windowStart: number; // znacznik czasu pierwszego żądania w oknie (ms)
  count: number;       // liczba żądań w bieżącym oknie
}

/** Mapa: ip → RateLimitEntry, przechowywana w pamięci procesu */
const rateLimitMap = new Map<string, RateLimitEntry>();

/**
 * Sprawdza, czy żądanie z danego IP jest dozwolone.
 *
 * @param ip - adres IP klienta
 * @param now - bieżący znacznik czasu w ms (domyślnie Date.now()); wstrzykiwalny dla testowalności
 * @returns `true` jeśli żądanie jest dozwolone, `false` jeśli przekroczono limit
 */
export function checkRateLimit(ip: string, now: number = Date.now()): boolean {
  const entry = rateLimitMap.get(ip);

  if (!entry) {
    // Pierwsze żądanie z tego IP — otwieramy nowe okno
    rateLimitMap.set(ip, { windowStart: now, count: 1 });
    return true;
  }

  const elapsed = now - entry.windowStart;

  if (elapsed >= WINDOW_MS) {
    // Okno wygasło — resetujemy licznik i otwieramy nowe okno
    rateLimitMap.set(ip, { windowStart: now, count: 1 });
    return true;
  }

  // Okno wciąż aktywne
  if (entry.count < MAX_REQUESTS) {
    entry.count += 1;
    return true;
  }

  // Limit przekroczony (6. i kolejne żądania)
  return false;
}

/**
 * Resetuje całą mapę rate limitera — przeznaczone wyłącznie do testów.
 */
export function resetRateLimits(): void {
  rateLimitMap.clear();
}
