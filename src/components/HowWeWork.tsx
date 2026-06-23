import React from 'react';

export default function HowWeWork() {
  return (
    <section className="how-we-work" id="proces">
      <div className="container">
        <div className="section-header reveal">
          <h2>Jak pracujemy</h2>
        </div>
        <div className="timeline reveal-stagger">
          <div className="timeline-step">
            <div className="step-number">01</div>
            <h3>Analiza</h3>
            <p>Poznajemy Twój biznes, cele i budżet, zanim cokolwiek zaprojektujemy.</p>
          </div>
          <div className="timeline-step">
            <div className="step-number">02</div>
            <h3>Strategia</h3>
            <p>Dobieramy zakres i technologię tak, by rozwiązanie było tanie w utrzymaniu.</p>
          </div>
          <div className="timeline-step">
            <div className="step-number">03</div>
            <h3>Projekt</h3>
            <p>Projektujemy UX/UI i architekturę pod Twoje realne procesy.</p>
          </div>
          <div className="timeline-step">
            <div className="step-number">04</div>
            <h3>Development</h3>
            <p>Programujemy, testujemy i dbamy o jakość oraz bezpieczeństwo.</p>
          </div>
          <div className="timeline-step">
            <div className="step-number">05</div>
            <h3>Wdrożenie</h3>
            <p>Uruchamiamy, przenosimy dane i szkolimy Twój zespół.</p>
          </div>
          <div className="timeline-step">
            <div className="step-number">06</div>
            <h3>Rozwój</h3>
            <p>Zostajemy na pokładzie: monitorujemy, optymalizujemy koszty i rozwijamy.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
