import React from 'react';
import Link from 'next/link';
import SiteIcon from './SiteIcon';
import HeroVisual from './HeroVisual';

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <HeroVisual />
      <div className="container hero-container">
        <div className="hero-content">
          <div className="breadcrumbs">
            <span>Software</span> • <span>Automatyzacje</span> • <span>Marketing</span>
          </div>
          <h1>Budujemy technologię,<br/>która pracuje za<br/>Twój biznes.</h1>
          <p>Projektujemy i budujemy strony, aplikacje webowe i mobilne, systemy CRM oraz automatyzacje &ndash; indywidualnie pod Twój biznes, na nowoczesnych technologiach i z niższymi kosztami utrzymania.</p>
          <div className="hero-actions">
            <Link href="#kontakt" className="btn btn-primary">Umów konsultację &rarr;</Link>
            <Link href="#realizacje" className="btn btn-secondary">Zobacz realizacje &rarr;</Link>
          </div>
          <div className="hero-features">
            <div className="feature-item">
              <div className="feature-icon"><SiteIcon name="website" /></div>
              <span>Strony<br/>WWW</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><SiteIcon name="mobileApp" /></div>
              <span>Aplikacje</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><SiteIcon name="crm" /></div>
              <span>CRM</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><SiteIcon name="ai" /></div>
              <span>AI</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><SiteIcon name="sales" /></div>
              <span>Marketing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
