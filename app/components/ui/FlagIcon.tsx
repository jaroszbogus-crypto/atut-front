import React from "react";

interface FlagIconProps {
  code: string;
}

export default function FlagIcon({ code }: FlagIconProps) {
  const icons = {
    PL: (
      <svg
        viewBox="0 0 16 10"
        className="w-5 h-3.5 object-cover rounded-xs border border-white/10 shadow-xs"
      >
        <rect width="16" height="5" fill="#fff" />
        <rect width="16" height="5" y="5" fill="#dc2626" />
      </svg>
    ),
    EN: (
      <svg
        viewBox="0 0 60 30"
        className="w-5 h-3.5 object-cover rounded-xs border border-white/10 shadow-xs"
      >
        <clipPath id="s">
          <path d="M0,0 v30 h60 v-30 z" />
        </clipPath>
        <g clipPath="url(#s)">
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#012169" strokeWidth="4" />
          <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
          <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
        </g>
      </svg>
    ),
    TR: (
      <svg
        viewBox="0 0 1200 800"
        className="w-5 h-3.5 object-cover rounded-xs border border-white/10 shadow-xs"
      >
        <rect width="1200" height="800" fill="#e30a17" />
        <circle cx="400" cy="400" r="200" fill="#fff" />
        <circle cx="450" cy="400" r="160" fill="#e30a17" />
        <polygon points="575,400 645,423 602,364 602,436 645,377" fill="#fff" />
      </svg>
    ),
    VI: (
      <svg
        viewBox="0 0 900 600"
        className="w-5 h-3.5 object-cover rounded-xs border border-white/10 shadow-xs"
      >
        <rect width="900" height="600" fill="#da251d" />
        <polygon
          points="450,225 479,316 558,316 494,363 518,454 450,407 382,454 406,363 342,316 421,316"
          fill="#ffff00"
        />
      </svg>
    ),
    UK: (
      <svg
        viewBox="0 0 3 2"
        className="w-5 h-3.5 object-cover rounded-xs border border-white/10 shadow-xs"
      >
        <rect width="3" height="1" fill="#0057b7" />
        <rect width="3" height="1" y="1" fill="#ffd700" />
      </svg>
    ),
    DE: (
      <svg
        viewBox="0 0 5 3"
        className="w-5 h-3.5 object-cover rounded-xs border border-white/10 shadow-xs"
      >
        <rect width="5" height="1" fill="#000" />
        <rect width="5" height="1" y="1" fill="#dd0000" />
        <rect width="5" height="1" y="2" fill="#ffce00" />
      </svg>
    ),
  };

  // Zwraca odpowiednią flagę, a jeśli nie ma w słowniku - domyślnie oddaje PL
 return icons[code as keyof typeof icons] || icons.PL;
}
