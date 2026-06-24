'use client';

import React from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { useI18n } from '@/lib/i18n/LanguageProvider';

const FOOTER_ITEMS = [
  { href: '#uslugi', key: 'uslugi' },
  { href: '#dlaczego', key: 'dlaczego' },
  { href: '#realizacje', key: 'realizacje' },
  { href: '#proces', key: 'proces' },
  { href: '#kontakt', key: 'kontakt' },
] as const;

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="footer">
      <div className="container footer-container">
        <Link href="#" className="logo">
          <Logo className="footer-logo" />
        </Link>
        <nav className="footer-links">
          {FOOTER_ITEMS.map((item) => (
            <Link key={item.href} href={item.href}>
              {t.nav.links[item.key]}
            </Link>
          ))}
        </nav>
        <div className="copyright">
          &copy; {new Date().getFullYear()} Sukces-24 {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}
