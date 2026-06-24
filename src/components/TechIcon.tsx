import type { SVGProps } from 'react';
import { TECH_ICONS, type TechIconDef } from './tech-icons';

export type TechIconName = keyof typeof TECH_ICONS;

type TechIconProps = Omit<SVGProps<SVGSVGElement>, 'children'> & {
  name: string;
};

export default function TechIcon({ name, className, ...props }: TechIconProps) {
  const def = TECH_ICONS[name as TechIconName] as TechIconDef | undefined;
  const classes = ['tech-icon', className].filter(Boolean).join(' ');

  if (!def) {
    return (
      <svg viewBox="0 0 32 32" className={classes} aria-hidden="true" focusable="false" {...props}>
        <path className="tech-icon-line" d="M8 16h16M16 8v16" />
        <circle className="tech-icon-accent" cx="16" cy="16" r="10" />
      </svg>
    );
  }

  return (
    <svg viewBox={def.viewBox ?? '0 0 32 32'} className={classes} aria-hidden="true" focusable="false" {...props}>
      {def.brandPath ? <path className="tech-icon-brand" d={def.brandPath} /> : null}
      {def.fillPaths?.map((d, index) => (
        <path className="tech-icon-brand" d={d} key={`fill-${index}`} />
      ))}
      {def.paths?.map((d, index) => (
        <path className="tech-icon-line" d={d} key={`line-${index}`} />
      ))}
      {def.circles?.map(({ cx, cy, r }, index) => (
        <circle className="tech-icon-line" cx={cx} cy={cy} r={r} key={`circle-${index}`} />
      ))}
      {def.accentPaths?.map((d, index) => (
        <path className="tech-icon-accent" d={d} key={`accent-line-${index}`} />
      ))}
      {def.accentCircles?.map(({ cx, cy, r }, index) => (
        <circle className="tech-icon-accent" cx={cx} cy={cy} r={r} key={`accent-circle-${index}`} />
      ))}
    </svg>
  );
}

export function techBrandColor(name: string): string | undefined {
  return (TECH_ICONS[name as TechIconName] as TechIconDef | undefined)?.hex;
}
