
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', variant = 'full', className = '' }) => {
  const sizes = {
    sm: { icon: 40, text: 'text-lg' },
    md: { icon: 56, text: 'text-2xl' },
    lg: { icon: 72, text: 'text-3xl' },
    xl: { icon: 88, text: 'text-4xl' }
  };

  const iconSize = sizes[size].icon;

  // Premium SVG Logo - Elegant crescent moon with book and light rays
  const LogoIcon = () => (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      {/* Gradient Definitions */}
      <defs>
        {/* Main teal gradient */}
        <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#14b8a6" />
          <stop offset="50%" stopColor="#0d9488" />
          <stop offset="100%" stopColor="#0f766e" />
        </linearGradient>

        {/* Gold gradient for light */}
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fcd34d" />
          <stop offset="50%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>

        {/* Light cream for pages */}
        <linearGradient id="pageGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fefce8" />
          <stop offset="100%" stopColor="#fef9c3" />
        </linearGradient>

        {/* Radial glow */}
        <radialGradient id="glowGradient" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
        </radialGradient>

        {/* Shadow filter */}
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#0f766e" floodOpacity="0.3"/>
        </filter>

        {/* Glow filter */}
        <filter id="lightGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Outer circle - main shape */}
      <circle
        cx="60"
        cy="60"
        r="54"
        fill="url(#mainGradient)"
        filter="url(#softShadow)"
      />

      {/* Inner decorative ring */}
      <circle
        cx="60"
        cy="60"
        r="48"
        fill="none"
        stroke="#5eead4"
        strokeWidth="1"
        strokeOpacity="0.3"
      />

      {/* Ambient glow at top */}
      <ellipse
        cx="60"
        cy="35"
        rx="30"
        ry="20"
        fill="url(#glowGradient)"
      />

      {/* Light rays emanating from the top */}
      <g filter="url(#lightGlow)" opacity="0.9">
        {/* Central ray */}
        <path d="M60 15 L63 32 L57 32 Z" fill="url(#goldGradient)" />

        {/* Left rays */}
        <path d="M45 20 L52 34 L48 36 Z" fill="url(#goldGradient)" opacity="0.8" />
        <path d="M32 28 L43 40 L40 43 Z" fill="url(#goldGradient)" opacity="0.6" />

        {/* Right rays */}
        <path d="M75 20 L68 34 L72 36 Z" fill="url(#goldGradient)" opacity="0.8" />
        <path d="M88 28 L77 40 L80 43 Z" fill="url(#goldGradient)" opacity="0.6" />
      </g>

      {/* Main star/light source */}
      <circle cx="60" cy="24" r="5" fill="url(#goldGradient)" filter="url(#lightGlow)" />
      <circle cx="60" cy="24" r="2.5" fill="#fef3c7" />

      {/* Open Book */}
      <g transform="translate(60, 68)">
        {/* Book shadow */}
        <ellipse cx="0" cy="24" rx="28" ry="4" fill="#0f766e" opacity="0.2" />

        {/* Left page */}
        <path
          d="M-3 -8 C-3 -8 -30 -5 -30 -2 L-30 22 C-30 25 -3 20 -3 20 Z"
          fill="url(#pageGradient)"
          stroke="#d4d4d8"
          strokeWidth="0.5"
        />

        {/* Right page */}
        <path
          d="M3 -8 C3 -8 30 -5 30 -2 L30 22 C30 25 3 20 3 20 Z"
          fill="url(#pageGradient)"
          stroke="#d4d4d8"
          strokeWidth="0.5"
        />

        {/* Book spine/center fold */}
        <path
          d="M-3 -8 Q0 -10 3 -8 L3 20 Q0 22 -3 20 Z"
          fill="#99f6e4"
        />

        {/* Decorative lines on left page */}
        <g opacity="0.4">
          <line x1="-26" y1="2" x2="-7" y2="0" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" />
          <line x1="-26" y1="8" x2="-9" y2="6" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" />
          <line x1="-26" y1="14" x2="-11" y2="12" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Decorative lines on right page */}
        <g opacity="0.4">
          <line x1="26" y1="2" x2="7" y2="0" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" />
          <line x1="26" y1="8" x2="9" y2="6" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" />
          <line x1="26" y1="14" x2="11" y2="12" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" />
        </g>
      </g>

      {/* Small decorative dots */}
      <circle cx="25" cy="55" r="2" fill="#5eead4" opacity="0.5" />
      <circle cx="95" cy="55" r="2" fill="#5eead4" opacity="0.5" />
      <circle cx="30" cy="75" r="1.5" fill="#5eead4" opacity="0.4" />
      <circle cx="90" cy="75" r="1.5" fill="#5eead4" opacity="0.4" />
    </svg>
  );

  if (variant === 'icon') {
    return <LogoIcon />;
  }

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <LogoIcon />
      <div className="flex flex-col items-start">
        <span className={`font-extrabold bg-gradient-to-l from-teal-600 via-teal-700 to-teal-800 bg-clip-text text-transparent leading-tight ${sizes[size].text}`}>
          منصة النور
        </span>
        <span className="text-slate-500 text-sm font-medium tracking-wide">التعليمية</span>
      </div>
    </div>
  );
};

export default Logo;
