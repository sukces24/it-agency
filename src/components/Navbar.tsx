'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="container navbar-container">
        <Link href="#" className="logo">
          <Logo priority />
        </Link>
        <nav className="nav-links">
          <Link href="#uslugi">Usługi</Link>
          <Link href="#dlaczego">Dlaczego my</Link>
          <Link href="#realizacje">Realizacje</Link>
          <Link href="#proces">Proces</Link>
          <Link href="#kontakt">Kontakt</Link>
        </nav>
        <Link href="#kontakt" className="btn btn-primary">Bezpłatna wycena &rarr;</Link>
      </div>
    </header>
  );
}
