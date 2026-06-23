import type { SVGProps } from 'react';

export type SiteIconName =
  | 'website'
  | 'webApp'
  | 'mobileApp'
  | 'crm'
  | 'ai'
  | 'marketing'
  | 'traffic'
  | 'form'
  | 'automation'
  | 'sales'
  | 'chatbot'
  | 'document'
  | 'email'
  | 'integration'
  | 'responseTime'
  | 'handshake'
  | 'phone'
  | 'clock'
  | 'client'
  | 'clientAlt';

type SiteIconProps = Omit<SVGProps<SVGSVGElement>, 'children'> & {
  name: SiteIconName;
};

export default function SiteIcon({ name, className, ...props }: SiteIconProps) {
  const classes = ['site-icon', className].filter(Boolean).join(' ');

  return (
    <svg
      viewBox="0 0 24 24"
      className={classes}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {renderIcon(name)}
    </svg>
  );
}

function IconFill(props: SVGProps<SVGPathElement>) {
  return <path className="site-icon-fill" stroke="none" {...props} />;
}

function IconRectFill(props: SVGProps<SVGRectElement>) {
  return <rect className="site-icon-fill" stroke="none" {...props} />;
}

function renderIcon(name: SiteIconName) {
  switch (name) {
    case 'website':
      return (
        <>
          <IconFill d="M12 3.4a8.6 8.6 0 1 0 0 17.2 8.6 8.6 0 0 0 0-17.2Z" />
          <circle cx="12" cy="12" r="8.6" />
          <path d="M3.4 12h17.2" />
          <path d="M5.75 7.35h12.5" />
          <path d="M5.75 16.65h12.5" />
          <path d="M12 3.4c2.2 2.25 3.35 5.15 3.35 8.6S14.2 18.35 12 20.6" />
          <path d="M12 3.4C9.8 5.65 8.65 8.55 8.65 12s1.15 6.35 3.35 8.6" />
        </>
      );
    case 'webApp':
      return (
        <>
          <IconRectFill x="3" y="4.5" width="18" height="15" rx="3" />
          <rect x="3" y="4.5" width="18" height="15" rx="3" />
          <path d="M8.5 9.5 6 12l2.5 2.5" />
          <path d="m15.5 9.5 2.5 2.5-2.5 2.5" />
          <path d="m13 8.5-2 7" />
        </>
      );
    case 'mobileApp':
      return (
        <>
          <IconRectFill x="7" y="2.75" width="10" height="18.5" rx="2.8" />
          <rect x="7" y="2.75" width="10" height="18.5" rx="2.8" />
          <path d="M10.25 6h3.5" />
          <path d="M10 17.5h4" />
          <path d="M9.5 9.25h5" />
          <path d="M9.5 12.25h5" />
        </>
      );
    case 'crm':
      return (
        <>
          <IconFill d="M7.8 11.2a3.4 3.4 0 1 0 0-6.8 3.4 3.4 0 0 0 0 6.8Z" />
          <circle cx="7.8" cy="7.8" r="3.4" />
          <path d="M3.5 18.5c.75-3.05 2.35-4.55 4.3-4.55s3.55 1.5 4.3 4.55" />
          <circle cx="17.1" cy="7.4" r="2.5" />
          <path d="M14.1 18.2c.55-2.35 1.7-3.55 3.05-3.55s2.5 1.2 3.05 3.55" />
          <path d="M12.4 10.8h2.2" />
        </>
      );
    case 'ai':
      return (
        <>
          <IconRectFill x="5" y="5" width="14" height="14" rx="3" />
          <rect x="5" y="5" width="14" height="14" rx="3" />
          <path d="M9 2.75v2.2" />
          <path d="M15 2.75v2.2" />
          <path d="M9 19.05v2.2" />
          <path d="M15 19.05v2.2" />
          <path d="M2.75 9h2.2" />
          <path d="M2.75 15h2.2" />
          <path d="M19.05 9h2.2" />
          <path d="M19.05 15h2.2" />
          <text
            x="12"
            y="14.25"
            textAnchor="middle"
            fill="currentColor"
            stroke="none"
            fontSize="5.8"
            fontWeight="800"
            letterSpacing="0.35"
          >
            AI
          </text>
        </>
      );
    case 'marketing':
      return (
        <>
          <IconFill d="M4 10.75v3.5l4.25.55 7.65 3.7V6.5l-7.65 3.7L4 10.75Z" />
          <path d="M4 10.75v3.5l4.25.55 7.65 3.7V6.5l-7.65 3.7L4 10.75Z" />
          <path d="m8.25 14.8 1.25 4.4" />
          <path d="M18.7 9.25c.85.7 1.35 1.65 1.35 2.75s-.5 2.05-1.35 2.75" />
        </>
      );
    case 'traffic':
      return (
        <>
          <IconFill d="M5 16.25c2.2-5.4 6.45-8.1 12.75-8.1H19v3.2h-1.25c-4.95 0-8.15 1.65-9.75 4.9H5Z" />
          <path d="M5 16.25c2.2-5.4 6.45-8.1 12.75-8.1H19" />
          <path d="M16.2 5.4 19 8.15l-2.8 2.8" />
          <path d="M4.5 8.5h5.25" />
          <path d="M7.2 5.8 9.75 8.5 7.2 11.2" />
          <path d="M4.5 18.8h14" />
        </>
      );
    case 'form':
      return (
        <>
          <IconFill d="M6 3.5h8l4 4V20.5H6V3.5Z" />
          <path d="M6 3.5h8l4 4V20.5H6V3.5Z" />
          <path d="M14 3.5V8h4" />
          <path d="M9 11.5h.01" />
          <path d="M11.5 11.5H15" />
          <path d="M9 15.5h.01" />
          <path d="M11.5 15.5H16" />
        </>
      );
    case 'automation':
      return (
        <>
          <IconFill d="M12 8.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Z" />
          <circle cx="12" cy="12" r="3.2" />
          <path d="M12 3.5v2.1" />
          <path d="M12 18.4v2.1" />
          <path d="M20.5 12h-2.1" />
          <path d="M5.6 12H3.5" />
          <path d="m18.05 5.95-1.5 1.5" />
          <path d="m7.45 16.55-1.5 1.5" />
          <path d="m18.05 18.05-1.5-1.5" />
          <path d="m7.45 7.45-1.5-1.5" />
          <path d="m12.4 9.95-1 2.15h2.2l-1 2" />
        </>
      );
    case 'sales':
      return (
        <>
          <IconFill d="M5 18.5h14V21H5v-2.5Z" />
          <path d="M4 20h16" />
          <path d="M6.5 16v-3.5" />
          <path d="M12 16V8" />
          <path d="M17.5 16v-6" />
          <path d="m5.5 10.5 4-3.5 3.5 2.3 5.1-5.1" />
          <path d="M15.35 4.2h2.75v2.75" />
        </>
      );
    case 'chatbot':
      return (
        <>
          <IconRectFill x="4.5" y="7.25" width="15" height="11" rx="4" />
          <rect x="4.5" y="7.25" width="15" height="11" rx="4" />
          <path d="M12 7.25V4.5" />
          <path d="M9.5 4.5h5" />
          <path d="M8.8 12h.01" />
          <path d="M15.2 12h.01" />
          <path d="M9.5 15h5" />
          <path d="m8 18.25-2.25 2" />
        </>
      );
    case 'document':
      return (
        <>
          <IconFill d="M6 3.5h8l4 4V20.5H6V3.5Z" />
          <path d="M6 3.5h8l4 4V20.5H6V3.5Z" />
          <path d="M14 3.5V8h4" />
          <path d="M9 12h4" />
          <path d="M9 15h2.5" />
          <circle cx="15.3" cy="15.3" r="2" />
          <path d="m16.75 16.75 1.75 1.75" />
        </>
      );
    case 'email':
      return (
        <>
          <IconRectFill x="3.5" y="6" width="17" height="12" rx="2.5" />
          <rect x="3.5" y="6" width="17" height="12" rx="2.5" />
          <path d="m4.5 8 7.5 5.3L19.5 8" />
          <path d="m7.5 16 3-2.15" />
          <path d="m16.5 16-3-2.15" />
        </>
      );
    case 'integration':
      return (
        <>
          <IconFill d="M6.5 8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
          <circle cx="6.5" cy="6" r="2.5" />
          <circle cx="17.5" cy="6" r="2.5" />
          <circle cx="6.5" cy="18" r="2.5" />
          <circle cx="17.5" cy="18" r="2.5" />
          <path d="M9 6h6" />
          <path d="M9 18h6" />
          <path d="M6.5 8.5v7" />
          <path d="M17.5 8.5v7" />
          <path d="m10.2 12 1.8-1.8 1.8 1.8-1.8 1.8-1.8-1.8Z" />
        </>
      );
    case 'responseTime':
      return (
        <>
          <IconFill d="M12 20a7.25 7.25 0 1 0 0-14.5 7.25 7.25 0 0 0 0 14.5Z" />
          <path d="M9 3.5h6" />
          <path d="M12 5.5V3.5" />
          <circle cx="12" cy="12.75" r="7.25" />
          <path d="M12 12.75 15.25 10" />
          <path d="M12 8.5v4.25" />
        </>
      );
    case 'handshake':
      return (
        <>
          <IconFill d="m4 13.25 4-4h4l2 2 2-2h4l-4 7.5H8l-4-3.5Z" />
          <path d="m4 13.25 4-4h4l2 2" />
          <path d="m20 13.25-4-4h-3l-4.5 4.5a1.8 1.8 0 0 0 2.55 2.55L13 14.4" />
          <path d="m10.8 16.15 1.35 1.25a2 2 0 0 0 2.75-.05l1.1-1.05" />
          <path d="m3 12 2.5 4.5" />
          <path d="m21 12-2.5 4.5" />
        </>
      );
    case 'phone':
      return (
        <>
          <IconFill d="M7.25 4.25 10 7.8 8.6 9.6c1.35 2.7 3.1 4.45 5.8 5.8l1.8-1.4 3.55 2.75-1.35 3c-.35.8-1.2 1.25-2.05 1.05C9.6 19.35 4.65 14.4 3.2 7.65c-.2-.85.25-1.7 1.05-2.05l3-1.35Z" />
          <path d="M7.25 4.25 10 7.8 8.6 9.6c1.35 2.7 3.1 4.45 5.8 5.8l1.8-1.4 3.55 2.75-1.35 3c-.35.8-1.2 1.25-2.05 1.05C9.6 19.35 4.65 14.4 3.2 7.65c-.2-.85.25-1.7 1.05-2.05l3-1.35Z" />
        </>
      );
    case 'clock':
      return (
        <>
          <IconFill d="M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17Z" />
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7.75V12l3 2" />
          <path d="M7 4.8 5.3 3.1" />
          <path d="m17 4.8 1.7-1.7" />
        </>
      );
    case 'client':
      return (
        <>
          <IconFill d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
          <circle cx="12" cy="8" r="4" />
          <path d="M4.75 20c1.1-4.25 3.55-6.25 7.25-6.25S18.15 15.75 19.25 20" />
          <path d="M9.5 7.1c1.6.65 3.15.65 5 0" />
        </>
      );
    case 'clientAlt':
      return (
        <>
          <IconFill d="M12 11.8a3.8 3.8 0 1 0 0-7.6 3.8 3.8 0 0 0 0 7.6Z" />
          <path d="M8.5 7.5c1.45-2.25 4.85-2.55 7-.6" />
          <circle cx="12" cy="8" r="3.8" />
          <path d="M5 20c.95-4.1 3.35-6.15 7-6.15S18.05 15.9 19 20" />
          <path d="M16.5 14.75h2.25v2.25" />
        </>
      );
    default:
      return null;
  }
}
