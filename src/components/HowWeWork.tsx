'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n/LanguageProvider';

export default function HowWeWork() {
  const { t } = useI18n();

  return (
    <section className="how-we-work" id="proces">
      <div className="container">
        <div className="section-header reveal">
          <h2>{t.howWeWork.heading}</h2>
        </div>
        <div className="timeline reveal-stagger">
          {t.howWeWork.steps.map((step, i) => (
            <div className="timeline-step" key={step.title}>
              <div className="step-number">{String(i + 1).padStart(2, '0')}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
