'use client';
import React, { useState, useRef, FormEvent } from 'react';
import Link from 'next/link';
import SiteIcon from './SiteIcon';

export default function TestimonialsContact() {
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

    // Client-side validation
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName) {
      setStatus('error');
      setErrorMessage('Imię i nazwisko jest wymagane.');
      return;
    }

    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      setStatus('error');
      setErrorMessage('Podaj poprawny adres e-mail.');
      return;
    }

    if (!trimmedMessage) {
      setStatus('error');
      setErrorMessage('Opis projektu jest wymagany.');
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
        let msg = 'Wystąpił błąd podczas wysyłki. Spróbuj ponownie.';
        if (response.status === 429) {
          msg = 'Zbyt wiele prób. Spróbuj ponownie za kilka minut.';
        } else if (response.status === 502) {
          msg = 'Nie udało się dostarczyć wiadomości. Spróbuj ponownie później.';
        } else if (data?.fields) {
          const fieldMessages = Object.values(data.fields).join(', ');
          msg = fieldMessages || msg;
        }
        setStatus('error');
        setErrorMessage(msg);
      }
    } catch (err: unknown) {
      clearTimeout(timeout);
      timeoutRef.current = null;

      if (err instanceof Error && err.name === 'AbortError') {
        setStatus('error');
        setErrorMessage('Przekroczono czas oczekiwania. Sprawdź połączenie i spróbuj ponownie.');
      } else {
        setStatus('error');
        setErrorMessage('Błąd sieci. Sprawdź połączenie i spróbuj ponownie.');
      }
    }
  };

  return (
    <section className="testimonials-contact">
      <div className="container split-layout">
        {/* Testimonials */}
        <div className="testimonials" id="opinie">
          <div className="section-header flex-header reveal">
            <h2>Opinie naszych klientów</h2>
            <Link href="#" className="link-more">Zobacz więcej opinii &rarr;</Link>
          </div>
          <div className="testimonials-grid reveal-stagger">
            <div className="testimonial-card">
              <div className="stars">★★★★★</div>
              <p>&ldquo;Profesjonalne podejście, świetna komunikacja i realne efekty. Nasza rezerwacyjna platforma działa bez zarzutu i znacząco zwiększyła nasze obłożenie.&rdquo;</p>
              <div className="author">
                <div className="avatar"><SiteIcon name="client" /></div>
                <div className="author-info">
                  <strong>Kamil</strong>
                  <span>Właściciel obiektu noclegowego</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="stars">★★★★★</div>
              <p>&ldquo;Dzięki automatyzacjom i nowemu CRM zaoszczędziliśmy dziesiątki godzin miesięcznie. Procesy wreszcie działają tak, jak powinny.&rdquo;</p>
              <div className="author">
                <div className="avatar"><SiteIcon name="clientAlt" /></div>
                <div className="author-info">
                  <strong>Magdalena</strong>
                  <span>Właścicielka salonu beauty</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-card reveal" id="kontakt">
          <div className="contact-form-container">
            <h2>Porozmawiajmy<br/>o Twoim projekcie</h2>
            <p>Opowiedz nam o swoim pomyśle, a my przygotujemy bezpłatną wycenę.</p>
            {status === 'success' && (
              <div className="form-message form-message-success" role="status">
                Dziękujemy! Twoja wiadomość została wysłana. Skontaktujemy się w ciągu 24 godzin.
              </div>
            )}
            {status === 'error' && errorMessage && (
              <div className="form-message form-message-error" role="alert">
                {errorMessage}
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
                  placeholder="Imię i nazwisko"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <input
                type="tel"
                placeholder="Telefon"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <textarea
                placeholder="Opisz swój projekt..."
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={status === 'submitting' || status === 'success'}
              >
                {status === 'submitting' ? 'Wysyłanie...' : 'Wyślij zapytanie \u2192'}
              </button>
            </form>
          </div>
          <div className="contact-info">
            <div className="info-item">
              <div className="info-icon"><SiteIcon name="responseTime" /></div>
              <span>Odpowiadamy w 24h</span>
            </div>
            <div className="info-item">
              <div className="info-icon"><SiteIcon name="document" /></div>
              <span>Bezpłatny audyt i wycena</span>
            </div>
            <div className="info-item">
              <div className="info-icon"><SiteIcon name="handshake" /></div>
              <span>Bez zobowiązań</span>
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
              <span>Pon - Pt: 09:00 - 17:00</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
