import type { SimpleIcon } from 'simple-icons';
import {
  siClaude,
  siExpress,
  siFastify,
  siGooglecloud,
  siGooglegemini,
  siJavascript,
  siMongodb,
  siMysql,
  siNeon,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siReact,
  siRedis,
  siSupabase,
  siTailwindcss,
  siTypescript,
} from 'simple-icons';

export type TechIconCircle = {
  cx: number;
  cy: number;
  r: number;
};

export type TechIconDef = {
  hex: string;
  viewBox?: string;
  /** Exact single-color vendor glyph, kept inside our custom visual frame. */
  brandPath?: string;
  /** Custom marks used only where no suitable vendor glyph is distributed. */
  paths?: string[];
  fillPaths?: string[];
  accentPaths?: string[];
  circles?: TechIconCircle[];
  accentCircles?: TechIconCircle[];
};

function official(icon: SimpleIcon): TechIconDef {
  return {
    hex: `#${icon.hex}`,
    viewBox: '0 0 24 24',
    brandPath: icon.path,
  };
}

// OpenAI's recognisable knot glyph. Kept locally because it is no longer
// distributed by Simple Icons.
const OPENAI_PATH =
  'M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654 2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z';

export const TECH_ICONS = {
  'Next.js': official(siNextdotjs),
  React: official(siReact),
  TypeScript: official(siTypescript),
  JavaScript: official(siJavascript),
  'Tailwind CSS': official(siTailwindcss),
  'Node.js': official(siNodedotjs),
  NestJS: official(siNestjs),
  Fastify: official(siFastify),
  Express: official(siExpress),
  BullMQ: {
    hex: '#F43F5E',
    viewBox: '0 0 24 24',
    paths: [
      'M12 8.4C8.7 8.4 7 10.4 7 13c0 2.8 2.2 4.8 5 4.8s5-2 5-4.8c0-2.6-1.7-4.6-5-4.6Z',
      'M8.2 8.9C5.9 8.2 4.4 6.4 4 3.9c2.3.8 4.1 2 5.4 3.8M15.8 8.9c2.3-.7 3.8-2.5 4.2-5-2.3.8-4.1 2-5.4 3.8',
    ],
    accentCircles: [
      { cx: 10.5, cy: 13.7, r: 0.7 },
      { cx: 13.5, cy: 13.7, r: 0.7 },
    ],
  },
  PostgreSQL: official(siPostgresql),
  MySQL: official(siMysql),
  MongoDB: official(siMongodb),
  Redis: official(siRedis),
  Supabase: official(siSupabase),
  Neon: official(siNeon),
  AWS: {
    hex: '#FF9900',
    viewBox: '0 0 32 32',
    paths: [
      'm5.5 19.5 3-8.5 3 8.5M6.7 16h3.6',
      'M13 12l1.5 7.5 2.2-4.7 2.2 4.7 1.5-7.5',
      'M26 13c-1.4-1.4-4.4-.8-4.4 1.1 0 2.3 4.7 1.2 4.7 3.7 0 2-3.2 2.5-4.9 1.1',
    ],
    accentPaths: ['M6.5 23.5c5.4 3.2 13.7 3.4 19-.3m-2.9-1.8 2.7 1.8-3.1 1.5'],
  },
  Azure: {
    hex: '#2D9CFF',
    viewBox: '0 0 24 24',
    fillPaths: ['M11.6 4.5 20 19h-7.6Z', 'm10.2 10.8 3.4 8.2H4Z'],
  },
  'Google Cloud': official(siGooglecloud),
  OpenAI: {
    hex: '#10A37F',
    viewBox: '0 0 24 24',
    brandPath: OPENAI_PATH,
  },
  Claude: official(siClaude),
  Gemini: official(siGooglegemini),
  Codex: {
    hex: '#10A37F',
    viewBox: '0 0 24 24',
    brandPath: OPENAI_PATH,
  },
} satisfies Record<string, TechIconDef>;
