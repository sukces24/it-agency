'use client';

import React from 'react';
import Link from 'next/link';
import SiteIcon, { type SiteIconName } from './SiteIcon';
import { useI18n } from '@/lib/i18n/LanguageProvider';

const LIST_ICONS: SiteIconName[] = ['document', 'automation', 'responseTime'];

export default function CostRescue() {
  const { t } = useI18n();

  return (
    <section className="cost-rescue" id="audyt">
      <div className="container">
        <div className="rescue-card reveal">
          <span className="rescue-eyebrow">{t.costRescue.eyebrow}</span>
          <h2>{t.costRescue.heading}</h2>
          <p>{t.costRescue.paragraph}</p>
          <ul className="rescue-list">
            {t.costRescue.list.map((entry, i) => (
              <li key={entry}>
                <SiteIcon name={LIST_ICONS[i]} /> {entry}
              </li>
            ))}
          </ul>
          <Link href="#kontakt" className="btn btn-primary">{t.costRescue.cta} &rarr;</Link>
        </div>
      </div>
    </section>
  );
}
