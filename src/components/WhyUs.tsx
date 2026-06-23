import React from 'react';
import SiteIcon from './SiteIcon';

export default function WhyUs() {
  return (
    <section className="why-us" id="dlaczego">
      <div className="container">
        <div className="section-header reveal">
          <h2>Dlaczego Sukces-24</h2>
          <p>Nie sprzedajemy szablonów. Budujemy rozwiązania skrojone pod Twój biznes i dbamy, żeby ich utrzymanie nie rujnowało budżetu.</p>
        </div>
        <div className="why-grid reveal-stagger">
          <div className="why-card">
            <div className="why-icon"><SiteIcon name="handshake" /></div>
            <h3>Indywidualne podejście</h3>
            <p>Każdy projekt zaczynamy od rozmowy i analizy. Zakres, technologię i budżet dopasowujemy do Twoich realnych potrzeb &ndash; bez gotowców na siłę.</p>
          </div>
          <div className="why-card">
            <div className="why-icon"><SiteIcon name="automation" /></div>
            <h3>Nowoczesne technologie</h3>
            <p>Pracujemy na aktualnym, wspieranym stacku. Twój produkt jest szybki, bezpieczny i gotowy na rozwój &ndash; bez długu technologicznego od pierwszego dnia.</p>
          </div>
          <div className="why-card">
            <div className="why-icon"><SiteIcon name="sales" /></div>
            <h3>Niższe koszty utrzymania</h3>
            <p>Optymalizujemy infrastrukturę i kod, więc miesięczne rachunki za hosting i serwis są realnie niższe. Płacisz za wartość, nie za zaniedbania.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
