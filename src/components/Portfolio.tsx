'use client';

import React from 'react';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n/LanguageProvider';

type ProjectKey = 'MN' | 'BN' | 'TS' | 'FE' | 'LT' | 'SN' | 'TK' | 'TL' | 'LP';

type Project = {
  key: ProjectKey;
  title: string;
  domain: string;
  url: string;
  image?: string;
};

const projects: Project[] = [
  {
    key: 'MN',
    title: 'MAJ New Home',
    domain: 'majnewhome.com',
    url: 'https://www.majnewhome.com/',
    image: '/assets/portfolio_1.png',
  },
  {
    key: 'BN',
    title: 'Book Now',
    domain: 'book-now.pl',
    url: 'https://book-now.pl/',
    image: '/assets/book-now.png',
  },
  {
    key: 'TS',
    title: 'Tannery Sheepskin',
    domain: 'tannery-sheepskin.com',
    url: 'https://tannery-sheepskin.com/',
    image: '/assets/tannery.jpg',
  },
  {
    key: 'FE',
    title: 'Fensterbau Experte 24',
    domain: 'fensterbauexperte24.de',
    url: 'https://www.fensterbauexperte24.de/',
    image: '/assets/fensterbauexperte24.png',
  },
  {
    key: 'LT',
    title: 'Logic Transport',
    domain: 'logictransport.pl',
    url: 'https://logictransport.pl/',
    image: '/assets/logic-transport.png',
  },
  {
    key: 'TK',
    title: 'Pokoje Trzy Korony',
    domain: 'pokojetrzykorony.pl',
    url: 'https://www.pokojetrzykorony.pl/',
    image: '/assets/pokoje-trzy-korony.png',
  },
  {
    key: 'TL',
    title: 'Transport Laskowski',
    domain: 'transportlaskowski.com',
    url: 'https://www.transportlaskowski.com/',
    image: '/assets/laskowski.png',
  },
  {
    key: 'LP',
    title: 'Las Palomas 303',
    domain: 'laspalomas303.com',
    url: 'https://www.laspalomas303.com/',
    image: '/assets/laspalomas.png',
  },
  {
    key: 'SN',
    title: 'six-nine.de',
    domain: 'six-nine.de',
    url: 'https://six-nine.de/',
    image: '/assets/six-nine.png',
  },
];

export default function Portfolio() {
  const { t } = useI18n();

  return (
    <section className="portfolio" id="realizacje">
      <div className="container">
        <div className="section-header reveal">
          <h2>{t.portfolio.heading}</h2>
          <p>{t.portfolio.subheading}</p>
        </div>
        <div className="portfolio-grid reveal-stagger">
          {projects.map((project) => {
            const content = t.portfolio.projects[project.key];
            return (
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
                    <span className="portfolio-monogram" aria-hidden="true">{project.key}</span>
                  )}
                  <span className="portfolio-domain">{project.domain}</span>
                </div>
                <div className="portfolio-info">
                  <h3>{project.title}</h3>
                  <p>{content.description}</p>
                  <div className="tags">
                    {content.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                  <span className="portfolio-visit">{t.portfolio.visit} &rarr;</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
