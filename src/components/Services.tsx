import React from 'react';
import SiteIcon from './SiteIcon';

export default function Services() {
  return (
    <section className="services" id="uslugi">
      <div className="container">
        <div className="section-header reveal">
          <h2>Co robimy</h2>
          <p>Dostarczamy kompletne rozwiązania cyfrowe dopasowane do potrzeb Twojego biznesu.</p>
        </div>
        <div className="services-grid reveal-stagger">
          <div className="service-card">
            <div className="service-icon"><SiteIcon name="website" /></div>
            <div className="service-content">
              <h3>Strony internetowe</h3>
              <p>Szybkie, responsywne strony, które realnie pozyskują klientów &ndash; projektowane pod Twoją branżę, nie z gotowego szablonu.</p>
            </div>
            <div className="service-arrow">&rarr;</div>
          </div>
          <div className="service-card">
            <div className="service-icon"><SiteIcon name="webApp" /></div>
            <div className="service-content">
              <h3>Aplikacje webowe</h3>
              <p>Dedykowane platformy i panele dopasowane do Twoich procesów, zbudowane na nowoczesnym, skalowalnym stacku.</p>
            </div>
            <div className="service-arrow">&rarr;</div>
          </div>
          <div className="service-card">
            <div className="service-icon"><SiteIcon name="mobileApp" /></div>
            <div className="service-content">
              <h3>Aplikacje mobilne</h3>
              <p>Aplikacje na iOS i Android, wygodne dla użytkownika i tanie w utrzymaniu dzięki przemyślanej architekturze.</p>
            </div>
            <div className="service-arrow">&rarr;</div>
          </div>
          <div className="service-card">
            <div className="service-icon"><SiteIcon name="crm" /></div>
            <div className="service-content">
              <h3>Systemy CRM</h3>
              <p>Porządkujemy sprzedaż i obsługę: żaden lead nie ginie, a zespół zawsze wie, co robić dalej.</p>
            </div>
            <div className="service-arrow">&rarr;</div>
          </div>
          <div className="service-card">
            <div className="service-icon"><SiteIcon name="ai" /></div>
            <div className="service-content">
              <h3>Automatyzacje AI</h3>
              <p>Automatyzujemy powtarzalne zadania i wdrażamy AI tam, gdzie realnie oszczędza czas i pieniądze.</p>
            </div>
            <div className="service-arrow">&rarr;</div>
          </div>
          <div className="service-card">
            <div className="service-icon"><SiteIcon name="marketing" /></div>
            <div className="service-content">
              <h3>Marketing online</h3>
              <p>Kampanie i prowadzenie kanałów, które dowożą ruch i realne zapytania &ndash; nie tylko polubienia.</p>
            </div>
            <div className="service-arrow">&rarr;</div>
          </div>
        </div>
      </div>
    </section>
  );
}
