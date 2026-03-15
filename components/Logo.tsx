import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 24, className = "" }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Reticle corners representing analysis/focus */}
      <path 
        d="M4 10V6a2 2 0 0 1 2-2h4" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        className="opacity-60"
      />
      <path 
        d="M10 20H6a2 2 0 0 1-2-2v-4" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        className="opacity-60"
      />
      <path 
        d="M20 14v4a2 2 0 0 1-2 2h-4" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        className="opacity-60"
      />
      
      {/* Central Checkmark representing validation/reality */}
      <path 
        d="M7 13L10.5 16.5L16.5 9" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* AI Sparkle representing artificial intelligence */}
      <path 
        d="M19 1 Q19 5 23 5 Q19 5 19 9 Q19 5 15 5 Q19 5 19 1 Z" 
        fill="currentColor" 
      />
    </svg>
  );
};

export default Logo;
