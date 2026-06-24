'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';
import { useI18n } from '@/lib/i18n/LanguageProvider';

const NAV_ITEMS = [
  { href: '#uslugi', key: 'uslugi' },
  { href: '#dlaczego', key: 'dlaczego' },
  { href: '#realizacje', key: 'realizacje' },
  { href: '#proces', key: 'proces' },
  { href: '#kontakt', key: 'kontakt' },
] as const;

export default function Navbar() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu once the viewport grows back to the desktop layout.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Prevent the page behind the open menu from scrolling.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`navbar${scrolled ? ' navbar--scrolled' : ''}${menuOpen ? ' navbar--open' : ''}`}
    >
      {menuOpen && (
        <div className="nav-backdrop" onClick={closeMenu} aria-hidden="true" />
      )}
      <div className="container navbar-container">
        <Link href="#" className="logo" onClick={closeMenu}>
          <Logo priority />
        </Link>
        <nav className="nav-links">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href}>
              {t.nav.links[item.key]}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <LanguageSwitcher className="lang-switch--desktop" />
          <Link href="#kontakt" className="btn btn-primary nav-cta">
            {t.nav.cta} &rarr;
          </Link>
        </div>
        <button
          type="button"
          className="nav-toggle"
          aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
        </button>
      </div>

      <div id="mobile-menu" className={`nav-mobile${menuOpen ? ' is-open' : ''}`}>
        <nav className="nav-mobile-links">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} onClick={closeMenu}>
              {t.nav.links[item.key]}
            </Link>
          ))}
        </nav>
        <div className="nav-mobile-footer">
          <LanguageSwitcher />
          <Link href="#kontakt" className="btn btn-primary nav-mobile-cta" onClick={closeMenu}>
            {t.nav.cta} &rarr;
          </Link>
        </div>
      </div>
    </header>
  );
}
