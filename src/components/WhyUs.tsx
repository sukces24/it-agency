'use client';

import React from 'react';
import SiteIcon, { type SiteIconName } from './SiteIcon';
import { useI18n } from '@/lib/i18n/LanguageProvider';

const WHY_ICONS: SiteIconName[] = ['handshake', 'automation', 'sales'];

export default function WhyUs() {
  const { t } = useI18n();

  return (
    <section className="why-us" id="dlaczego">
      <div className="container">
        <div className="section-header reveal">
          <h2>{t.whyUs.heading}</h2>
          <p>{t.whyUs.subheading}</p>
        </div>
        <div className="why-grid reveal-stagger">
          {t.whyUs.items.map((item, i) => (
            <div className="why-card" key={item.title}>
              <div className="why-icon"><SiteIcon name={WHY_ICONS[i]} /></div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
