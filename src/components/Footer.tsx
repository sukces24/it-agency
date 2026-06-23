import React from 'react';
import Link from 'next/link';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <Link href="#" className="logo">
          <Logo className="footer-logo" />
        </Link>
        <nav className="footer-links">
          <Link href="#uslugi">Usługi</Link>
          <Link href="#dlaczego">Dlaczego my</Link>
          <Link href="#realizacje">Realizacje</Link>
          <Link href="#proces">Proces</Link>
          <Link href="#kontakt">Kontakt</Link>
        </nav>
        <div className="copyright">
          &copy; {new Date().getFullYear()} Sukces-24 Sp. z o.o. Wszelkie prawa zastrzeżone.
        </div>
      </div>
    </footer>
  );
}
