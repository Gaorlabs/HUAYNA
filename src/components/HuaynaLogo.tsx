import React from 'react';

interface HuaynaLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'splash';
  className?: string;
  showSubtitle?: boolean;
}

export const HuaynaLogo: React.FC<HuaynaLogoProps> = ({ 
  size = 'md', 
  className = '',
  showSubtitle = true 
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
    xl: 'w-28 h-28',
    splash: 'w-36 h-36 md:w-44 md:h-44'
  };

  return (
    <div className={`relative flex items-center justify-center shrink-0 ${sizeClasses[size]} ${className}`}>
      {/* Outer ambient glow */}
      <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-md pointer-events-none" />
      
      {/* Circular Emblem SVG reproducing exact logo */}
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-md select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="emeraldBg" cx="45%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#0c3e34" />
            <stop offset="60%" stopColor="#082b24" />
            <stop offset="100%" stopColor="#041a15" />
          </radialGradient>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f7d488" />
            <stop offset="50%" stopColor="#e5a93c" />
            <stop offset="100%" stopColor="#b88022" />
          </linearGradient>
        </defs>

        {/* Main circular body */}
        <circle cx="100" cy="100" r="96" fill="url(#emeraldBg)" stroke="url(#goldGradient)" strokeWidth="3" />
        <circle cx="100" cy="100" r="91" fill="none" stroke="#e5a93c" strokeWidth="0.8" strokeOpacity="0.4" strokeDasharray="3 2" />

        {/* Brand Name "HUAYNA" in Serif Typography */}
        <text
          x="100"
          y="108"
          textAnchor="middle"
          fill="url(#goldGradient)"
          fontFamily="Playfair Display, Georgia, serif"
          fontWeight="800"
          fontSize="35"
          letterSpacing="2.5"
          className="select-none"
        >
          HUAYNA
        </text>

        {/* Horizontal Divider Line */}
        <line x1="38" y1="120" x2="162" y2="120" stroke="url(#goldGradient)" strokeWidth="2.5" strokeLinecap="round" />

        {/* Subtitle "POSTRES SALUDABLES" */}
        {showSubtitle && (
          <text
            x="100"
            y="135"
            textAnchor="middle"
            fill="url(#goldGradient)"
            fontFamily="Plus Jakarta Sans, sans-serif"
            fontWeight="700"
            fontSize="8.5"
            letterSpacing="2.8"
            className="select-none"
          >
            • POSTRES SALUDABLES •
          </text>
        )}
      </svg>
    </div>
  );
};
