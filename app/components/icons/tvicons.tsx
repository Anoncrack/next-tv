import React from 'react';

type IconProps = {
  className?: string;
};

export const IconCalendar = ({ className }: IconProps) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
  >
    <path d="M3 9H21M7 3V5M17 3V5M6 19H18C20.2091 19 22 17.2091 22 15V9C22 6.79086 20.2091 5 18 5H6C3.79086 5 2 6.79086 2 9V15C2 17.2091 3.79086 19 6 19Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const IconGuest = ({ className }: IconProps) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
  >
    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M4 21V19C4 15.6863 6.68629 13 10 13H14C17.3137 13 20 15.6863 20 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const IconVoyageArrow = ({ className }: IconProps) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
  >
    <path d="M3 12H21M21 12L14 5M21 12L14 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const IconChevron = ({ className }: IconProps) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
  >
    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);



export const IconBoat = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M2 17L3.30822 13.0753C3.69377 11.9187 4.77382 11.1378 5.99321 11.1378H18.0068C19.2262 11.1378 20.3062 11.9187 20.6918 13.0753L22 17H2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M12 11V3M12 3L16 7M12 3L8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 17V19C4 20.1046 6 21 12 21C18 21 20 20.1046 20 19V17" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const IconTrophy = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M8 21H16M12 17V21M12 17C15.866 17 19 13.866 19 10V6H5V10C5 13.866 8.13401 17 12 17Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19 10V7H21V10C21 11.6569 19.6569 13 18 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M5 10V7H3V10C3 11.6569 4.34315 13 6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const IconSpa = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 22C12 22 17 18 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 18 12 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M12 7V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M16.5 8.5L19.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M7.5 8.5L4.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const IconHiking = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 22V11M12 22L7 22M12 22L17 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 11L7.5 17H16.5L12 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M12 11L8.5 6H15.5L12 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M12 6L10 3H14L12 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);

export const IconDining = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M8 3V21M8 3C9 3 10 3 11 5V8H5V5C6 3 7 3 8 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 3V21M16 3V11H19V3H16Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
  );




export const IconBolt = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const IconLeaf = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 21C12 21 7 19 4 14C1 9 3 2 12 2C21 2 23 9 20 14C17 19 12 21 12 21Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 21V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 15C12 15 15 13 16 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const IconShield = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 11V10C8 7.79086 9.79086 6 12 6C14.2091 6 16 7.79086 16 10V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const IconNetwork = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="12" cy="5" r="3" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="5" cy="19" r="3" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="19" cy="19" r="3" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M9.5 17.5L7.5 13.5L10 8" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M14.5 17.5L16.5 13.5L14 8" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);
