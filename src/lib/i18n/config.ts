export const LANGS = ['pl', 'en'] as const;

export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = 'pl';

/** Cookie used to persist the visitor's language across requests. */
export const LANG_COOKIE = 'lang';

export function isLang(value: string | undefined | null): value is Lang {
  return value === 'pl' || value === 'en';
}
