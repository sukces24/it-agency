'use client';
import React, { useState, useRef, FormEvent } from 'react';
import Link from 'next/link';
import SiteIcon, { type SiteIconName } from './SiteIcon';
import { useI18n } from '@/lib/i18n/LanguageProvider';

const TESTIMONIAL_ICONS: SiteIconName[] = ['client', 'clientAlt'];

export default function TestimonialsContact() {
  const { t } = useI18n();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [company, setCompany] = useState(''); // honeypot

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const abortControllerRef = useRef<AbortController | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const errors = t.contact.errors;

    // Client-side validation
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName) {
      setStatus('error');
      setErrorMessage(errors.nameRequired);
      return;
    }

    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      setStatus('error');
      setErrorMessage(errors.emailInvalid);
      return;
    }

    if (!trimmedMessage) {
      setStatus('error');
      setErrorMessage(errors.messageRequired);
      return;
    }

    // Start submission
    setStatus('submitting');
    setErrorMessage('');

    const controller = new AbortController();
    abortControllerRef.current = controller;

    const timeout = setTimeout(() => {
      controller.abort();
    }, 30000);
    timeoutRef.current = timeout;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, message, company }),
        signal: controller.signal,
      });

      clearTimeout(timeout);
      timeoutRef.current = null;

      if (response.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setCompany('');

        // Return to idle after 5 seconds
        setTimeout(() => {
          setStatus('idle');
        }, 5000);
      } else {
        const data = await response.json().catch(() => null);
        let msg = errors.generic;
        if (response.status === 429) {
          msg = errors.tooMany;
        } else if (response.status === 502) {
          msg = errors.delivery;
        } else if (data?.fields) {
          // Server returns language-agnostic codes; localize them here.
          const localized = Object.values(data.fields as Record<string, string>)
            .map((code) => t.contact.serverErrors[code])
            .filter(Boolean);
          msg = localized.length > 0 ? localized.join(' ') : msg;
        }
        setStatus('error');
        setErrorMessage(msg);
      }
    } catch (err: unknown) {
      clearTimeout(timeout);
      timeoutRef.current = null;

      if (err instanceof Error && err.name === 'AbortError') {
        setStatus('error');
        setErrorMessage(errors.timeout);
      } else {
        setStatus('error');
        setErrorMessage(errors.network);
      }
    }
  };

  return (
    <section className="testimonials-contact">
      <div className="container split-layout">
        {/* Testimonials */}
        <div className="testimonials" id="opinie">
          <div className="section-header flex-header reveal">
            <h2>{t.testimonials.heading}</h2>
            <Link href="#" className="link-more">{t.testimonials.more} &rarr;</Link>
          </div>
          <div className="testimonials-grid reveal-stagger">
            {t.testimonials.cards.map((card, i) => (
              <div className="testimonial-card" key={card.name}>
                <div className="stars">★★★★★</div>
                <p>&ldquo;{card.quote}&rdquo;</p>
                <div className="author">
                  <div className="avatar"><SiteIcon name={TESTIMONIAL_ICONS[i]} /></div>
                  <div className="author-info">
                    <strong>{card.name}</strong>
                    <span>{card.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-card reveal" id="kontakt">
          <div className="contact-form-container">
            <h2>
              {t.contact.headingLines.map((line, i) => (
                <React.Fragment key={line}>
                  {i > 0 && <br />}
                  {line}
                </React.Fragment>
              ))}
            </h2>
            <p>{t.contact.subheading}</p>
            {status === 'success' && (
              <div className="form-message form-message-success" role="status">
                <span className="form-message-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 12.5 4.5 4.5L19 7" />
                  </svg>
                </span>
                <span>{t.contact.success}</span>
              </div>
            )}
            {status === 'error' && errorMessage && (
              <div className="form-message form-message-error" role="alert">
                <span className="form-message-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 7.5v5.5" />
                    <path d="M12 16.5h.01" />
                  </svg>
                </span>
                <span>{errorMessage}</span>
              </div>
            )}
            <form className="contact-form" onSubmit={handleSubmit}>
              {/* Honeypot field - hidden from humans, traps bots */}
              <input
                type="text"
                name="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0 }}
              />
              <div className="form-row">
                <input
                  type="text"
                  placeholder={t.contact.placeholders.name}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder={t.contact.placeholders.email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <input
                type="tel"
                placeholder={t.contact.placeholders.phone}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <textarea
                placeholder={t.contact.placeholders.message}
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={status === 'submitting' || status === 'success'}
              >
                {status === 'submitting' ? t.contact.submitting : `${t.contact.submit} \u2192`}
              </button>
            </form>
          </div>
          <div className="contact-info">
            <div className="info-item">
              <div className="info-icon"><SiteIcon name="responseTime" /></div>
              <span>{t.contact.info.responseTime}</span>
            </div>
            <div className="info-item">
              <div className="info-icon"><SiteIcon name="document" /></div>
              <span>{t.contact.info.audit}</span>
            </div>
            <div className="info-item">
              <div className="info-icon"><SiteIcon name="handshake" /></div>
              <span>{t.contact.info.noObligation}</span>
            </div>
            <div className="info-item mt-4">
              <div className="info-icon"><SiteIcon name="email" /></div>
              <span>kontakt@sukces-24.pl</span>
            </div>
            <div className="info-item">
              <div className="info-icon"><SiteIcon name="phone" /></div>
              <span>+48 722 001 007</span>
            </div>
            <div className="info-item">
              <div className="info-icon"><SiteIcon name="clock" /></div>
              <span>{t.contact.info.hours}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
