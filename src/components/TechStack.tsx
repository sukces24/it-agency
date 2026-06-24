'use client';

import type { CSSProperties } from 'react';
import TechIcon, { techBrandColor } from './TechIcon';
import { useI18n } from '@/lib/i18n/LanguageProvider';

const TECH_RAILS = [
  ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Gemini', 'Redis', 'AWS'],
  ['Node.js', 'PostgreSQL', 'OpenAI', 'NestJS', 'MongoDB', 'Azure', 'Codex', 'JavaScript'],
  ['Google Cloud', 'Fastify', 'Neon', 'Claude', 'Express', 'MySQL', 'BullMQ'],
] as const;

const RAIL_DURATIONS = ['44s', '38s', '48s'] as const;
const RAIL_COPIES = [0, 1, 2, 3] as const;

type TechNodeProps = {
  name: string;
};

function TechNode({ name }: TechNodeProps) {
  const brand = techBrandColor(name) ?? '#5cc4ff';

  return (
    <li className="tech-node" style={{ '--brand': brand } as CSSProperties}>
      <span className="tech-node-visual">
        <span className="tech-node-orbit" aria-hidden="true" />
        <span className="tech-node-icon">
          <TechIcon name={name} />
        </span>
      </span>
      <span className="tech-node-name">{name}</span>
    </li>
  );
}

type TechRailProps = {
  index: number;
  items: readonly string[];
};

function TechRail({ index, items }: TechRailProps) {
  return (
    <div
      className={`tech-rail tech-rail-${index + 1}`}
      style={{ '--rail-duration': RAIL_DURATIONS[index] } as CSSProperties}
    >
      <div className="tech-rail-line" aria-hidden="true" />
      <div className="tech-rail-viewport">
        <div className="tech-track">
          {RAIL_COPIES.map((copy) => (
            <ul className="tech-rail-group" aria-hidden={copy === 0 ? undefined : true} key={copy}>
              {items.map((item) => (
                <TechNode name={item} key={`${copy}-${item}`} />
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TechStack() {
  const { t } = useI18n();

  return (
    <section className="tech-stack" id="technologie">
      <div className="container">
        <div className="section-header tech-stack-header reveal">
          <span className="tech-stack-kicker" aria-hidden="true">
            <span />
            live stack
          </span>
          <h2>{t.techStack.heading}</h2>
          <p>{t.techStack.subheading}</p>
        </div>

        <div className="tech-stage-shell reveal">
          <div className="tech-stage">
            <div className="tech-stage-grid" aria-hidden="true" />
            <div className="tech-stage-core" aria-hidden="true">
              <span className="tech-stage-core-ring" />
              <span className="tech-stage-core-dot" />
            </div>
            <div className="tech-rails">
              {TECH_RAILS.map((items, index) => (
                <TechRail index={index} items={items} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
