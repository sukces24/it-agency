'use client';

import React from 'react';
import SiteIcon, { type SiteIconName } from './SiteIcon';
import { useI18n } from '@/lib/i18n/LanguageProvider';

const SERVICE_ICONS: SiteIconName[] = ['website', 'webApp', 'mobileApp', 'crm', 'ai', 'marketing'];

export default function Services() {
  const { t } = useI18n();

  return (
    <section className="services" id="uslugi">
      <div className="container">
        <div className="section-header reveal">
          <h2>{t.services.heading}</h2>
          <p>{t.services.subheading}</p>
        </div>
        <div className="services-grid reveal-stagger">
          {t.services.items.map((item, i) => (
            <div className="service-card" key={item.title}>
              <div className="service-icon"><SiteIcon name={SERVICE_ICONS[i]} /></div>
              <div className="service-content">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
              <div className="service-arrow">&rarr;</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
