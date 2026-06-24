'use client';

import React from 'react';
import Link from 'next/link';
import SiteIcon, { type SiteIconName } from './SiteIcon';
import HeroVisual from './HeroVisual';
import { useI18n } from '@/lib/i18n/LanguageProvider';

const FEATURE_ICONS: SiteIconName[] = ['website', 'mobileApp', 'crm', 'ai', 'sales'];

export default function Hero() {
  const { t } = useI18n();

  return (
    <section className="hero" id="hero">
      <HeroVisual />
      <div className="container hero-container">
        <div className="hero-content">
          <div className="breadcrumbs">
            {t.hero.breadcrumbs.map((crumb, i) => (
              <React.Fragment key={crumb}>
                {i > 0 && ' • '}
                <span>{crumb}</span>
              </React.Fragment>
            ))}
          </div>
          <h1>
            {t.hero.titleLines.map((line, i) => (
              <React.Fragment key={line}>
                {i > 0 && <br />}
                {line}
              </React.Fragment>
            ))}
          </h1>
          <p>{t.hero.description}</p>
          <div className="hero-actions">
            <Link href="#kontakt" className="btn btn-primary">{t.hero.ctaPrimary} &rarr;</Link>
            <Link href="#realizacje" className="btn btn-secondary">{t.hero.ctaSecondary} &rarr;</Link>
          </div>
          <div className="hero-features">
            {t.hero.features.map((label, i) => (
              <div className="feature-item" key={label}>
                <div className="feature-icon"><SiteIcon name={FEATURE_ICONS[i]} /></div>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
