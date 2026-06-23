import Image from 'next/image';
import React from 'react';

type LogoVariant = 'horizontal' | 'symbol' | 'avatar';

type LogoProps = {
  variant?: LogoVariant;
  className?: string;
  priority?: boolean;
};

const LOGO_ASSETS: Record<LogoVariant, { src: string; width: number; height: number }> = {
  horizontal: {
    src: '/assets/Sukces24_logo_poziome_transparent.png',
    width: 2172,
    height: 724,
  },
  symbol: {
    src: '/assets/Sukces24_symbol_dark_bg.png',
    width: 370,
    height: 500,
  },
  avatar: {
    src: '/assets/Sukces24_avatar_1200.png',
    width: 1200,
    height: 1200,
  },
};

export default function Logo({ variant = 'horizontal', className, priority = false }: LogoProps) {
  const asset = LOGO_ASSETS[variant];
  const classes = ['brand-logo', `brand-logo--${variant}`, className].filter(Boolean).join(' ');

  return (
    <Image
      src={asset.src}
      alt="Sukces-24"
      width={asset.width}
      height={asset.height}
      className={classes}
      priority={priority}
    />
  );
}
