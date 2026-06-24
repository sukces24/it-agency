'use client';

import { LANGS, type Lang } from '@/lib/i18n/config';
import { useI18n } from '@/lib/i18n/LanguageProvider';

const LABELS: Record<Lang, string> = { pl: 'Polski', en: 'English' };

function Flag({ code }: { code: Lang }) {
  if (code === 'pl') {
    return (
      <svg className="lang-flag-svg" viewBox="0 0 60 40" aria-hidden="true">
        <rect width="60" height="20" fill="#ffffff" />
        <rect y="20" width="60" height="20" fill="#dc143c" />
      </svg>
    );
  }

  // English -> simplified Union Jack
  return (
    <svg className="lang-flag-svg" viewBox="0 0 60 40" aria-hidden="true">
      <rect width="60" height="40" fill="#012169" />
      <path d="M0,0 L60,40 M60,0 L0,40" stroke="#ffffff" strokeWidth="8" />
      <path d="M0,0 L60,40 M60,0 L0,40" stroke="#c8102e" strokeWidth="4" />
      <path d="M30,0 L30,40 M0,20 L60,20" stroke="#ffffff" strokeWidth="12" />
      <path d="M30,0 L30,40 M0,20 L60,20" stroke="#c8102e" strokeWidth="7" />
    </svg>
  );
}

export default function LanguageSwitcher({ className }: { className?: string }) {
  const { lang, setLang, t } = useI18n();
  const classes = ['lang-switch', className].filter(Boolean).join(' ');

  return (
    <div className={classes} role="group" aria-label={t.nav.changeLanguage}>
      {LANGS.map((code) => (
        <button
          key={code}
          type="button"
          className={`lang-switch-btn${lang === code ? ' is-active' : ''}`}
          aria-pressed={lang === code}
          title={LABELS[code]}
          onClick={() => setLang(code)}
        >
          <span className="lang-flag">
            <Flag code={code} />
          </span>
          <span className="sr-only">{LABELS[code]}</span>
        </button>
      ))}
    </div>
  );
}
