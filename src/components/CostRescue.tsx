import React from 'react';
import Link from 'next/link';
import SiteIcon from './SiteIcon';

export default function CostRescue() {
  return (
    <section className="cost-rescue" id="audyt">
      <div className="container">
        <div className="rescue-card reveal">
          <span className="rescue-eyebrow">Optymalizacja kosztów</span>
          <h2>Przepłacasz za utrzymanie albo masz projekt, który trzeba uratować?</h2>
          <p>Znamy to z wielu rozmów: ktoś zapłacił dużo, a dostał aplikację, która ledwo działa, jest droga w utrzymaniu albo najlepiej napisać ją od nowa. Sprawdzimy Twoje rozwiązanie i pokażemy, co da się usprawnić &ndash; oraz ile możesz dzięki temu zaoszczędzić.</p>
          <ul className="rescue-list">
            <li><SiteIcon name="document" /> Audyt kodu, infrastruktury i kosztów</li>
            <li><SiteIcon name="automation" /> Optymalizacja lub przepisanie tego, co się nie broni</li>
            <li><SiteIcon name="responseTime" /> Stałe wsparcie i rozwój po wdrożeniu</li>
          </ul>
          <Link href="#kontakt" className="btn btn-primary">Zamów bezpłatny audyt &rarr;</Link>
        </div>
      </div>
    </section>
  );
}
