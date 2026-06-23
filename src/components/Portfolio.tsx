import React from 'react';
import Image from 'next/image';

type Project = {
  title: string;
  domain: string;
  url: string;
  initials: string;
  description: string;
  tags: string[];
  image?: string;
};

const projects: Project[] = [
  {
    title: 'MAJ New Home',
    domain: 'majnewhome.com',
    url: 'https://www.majnewhome.com/',
    initials: 'MN',
    description: 'Strona dla biura nieruchomości premium z dostępem do ofert off-market i wyszukiwaniem wymarzonych nieruchomości.',
    tags: ['Strona WWW', 'Nieruchomości', 'Wyszukiwarka ofert'],
    image: '/assets/portfolio_1.png',
  },
  {
    title: 'Book Now',
    domain: 'book-now.pl',
    url: 'https://book-now.pl/',
    initials: 'BN',
    description: 'System rezerwacji online dla firm usługowych - klienci rezerwują terminy samodzielnie, bez telefonów i maili.',
    tags: ['System rezerwacji', 'Aplikacja webowa', 'Rynek PL'],
    image: '/assets/book-now.png',
  },
  {
    title: 'Tannery Sheepskin',
    domain: 'tannery-sheepskin.com',
    url: 'https://tannery-sheepskin.com/',
    initials: 'TS',
    description: 'Sklep internetowy garbarni z naturalnymi skórami owczymi i wyrobami ze skóry, z myślą o klientach z zagranicy.',
    tags: ['Sklep e-commerce', 'Skóry naturalne', 'Eksport'],
    image: '/assets/tannery.jpg',
  },
  {
    title: 'Fensterbau Experte 24',
    domain: 'fensterbauexperte24.de',
    url: 'https://www.fensterbauexperte24.de/',
    initials: 'FE',
    description: 'Strona firmy montującej okna i drzwi na rynku niemieckim, nastawiona na pozyskiwanie zapytań ofertowych.',
    tags: ['Strona WWW', 'Okna i drzwi', 'Rynek DE'],
    image: '/assets/fensterbauexperte24.png',
  },
  {
    title: 'Logic Transport',
    domain: 'logictransport.pl',
    url: 'https://logictransport.pl/',
    initials: 'LT',
    description: 'Aplikacja dla firm transportowych do planowania pracy autobusów, busów i kierowców, kontroli kosztów oraz codziennego wsparcia AI.',
    tags: ['Aplikacja webowa', 'Transport', 'Wsparcie AI'],
    image: '/assets/logic-transport.png',
  },
  {
    title: 'six-nine.de',
    domain: 'six-nine.de',
    url: 'https://six-nine.de/',
    initials: 'SN',
    description: 'Nowoczesna strona internetowa zbudowana indywidualnie pod potrzeby klienta.',
    tags: ['Strona WWW'],
    image: '/assets/six-nine.png',
  },
];

export default function Portfolio() {
  return (
    <section className="portfolio" id="realizacje">
      <div className="container">
        <div className="section-header reveal">
          <h2>Realizacje</h2>
          <p>Wybrane projekty, które zbudowaliśmy dla klientów w Polsce i za granicą.</p>
        </div>
        <div className="portfolio-grid reveal-stagger">
          {projects.map((project) => (
            <a
              key={project.domain}
              className="portfolio-card"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="portfolio-cover">
                {project.image ? (
                  <Image src={project.image} alt={project.title} fill sizes="(max-width: 768px) 100vw, 33vw" />
                ) : (
                  <span className="portfolio-monogram" aria-hidden="true">{project.initials}</span>
                )}
                <span className="portfolio-domain">{project.domain}</span>
              </div>
              <div className="portfolio-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
                <span className="portfolio-visit">Zobacz na żywo &rarr;</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
