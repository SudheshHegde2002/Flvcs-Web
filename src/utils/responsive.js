import { css } from 'styled-components';

// Breakpoint values from theme.js
const breakpoints = {
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
};

// Media query functions
export const media = {
  up: (breakpoint) => (...args) => css`
    @media (min-width: ${breakpoints[breakpoint]}) {
      ${css(...args)}
    }
  `,
  down: (breakpoint) => (...args) => css`
    @media (max-width: ${breakpoints[breakpoint]}) {
      ${css(...args)}
    }
  `,
  between: (min, max) => (...args) => css`
    @media (min-width: ${breakpoints[min]}) and (max-width: ${breakpoints[max]}) {
      ${css(...args)}
    }
  `,
};

// Responsive visibility helpers
export const visibilityHelpers = {
  showOnMobile: css`
    display: none;
    
    @media (max-width: ${breakpoints.md}) {
      display: block;
    }
  `,
  hideOnMobile: css`
    display: block;
    
    @media (max-width: ${breakpoints.md}) {
      display: none;
    }
  `,
  showOnTablet: css`
    display: none;
    
    @media (min-width: ${breakpoints.md}) and (max-width: ${breakpoints.lg}) {
      display: block;
    }
  `,
  showOnDesktop: css`
    display: none;
    
    @media (min-width: ${breakpoints.lg}) {
      display: block;
    }
  `,
};

// Responsive flex utilities
export const flexHelpers = {
  // Wrap flex items on mobile, but not on desktop
  wrapOnMobile: css`
    flex-wrap: nowrap;
    
    @media (max-width: ${breakpoints.md}) {
      flex-wrap: wrap;
    }
  `,
  
  // Stack flex items vertically on mobile, but horizontally on desktop
  stackOnMobile: css`
    flex-direction: row;
    
    @media (max-width: ${breakpoints.md}) {
      flex-direction: column;
    }
  `,
  
  // Adjust flex item basis by screen size
  responsiveBasis: (mobile, tablet, desktop) => css`
    flex-basis: ${desktop};
    
    @media (max-width: ${breakpoints.lg}) {
      flex-basis: ${tablet};
    }
    
    @media (max-width: ${breakpoints.md}) {
      flex-basis: ${mobile};
    }
  `,
};

// Responsive spacing (margin/padding) helpers
export const spacingHelpers = {
  responsiveMargin: (mobile, tablet, desktop) => css`
    margin: ${desktop};
    
    @media (max-width: ${breakpoints.lg}) {
      margin: ${tablet};
    }
    
    @media (max-width: ${breakpoints.md}) {
      margin: ${mobile};
    }
  `,
  
  responsivePadding: (mobile, tablet, desktop) => css`
    padding: ${desktop};
    
    @media (max-width: ${breakpoints.lg}) {
      padding: ${tablet};
    }
    
    @media (max-width: ${breakpoints.md}) {
      padding: ${mobile};
    }
  `,
};

// Check if we're in a mobile browser/device
export const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= parseInt(breakpoints.md);
};

// Check if we're on a touch device
export const isTouchDevice = () => {
  if (typeof navigator === 'undefined') return false;
  return 'ontouchstart' in window || 
    navigator.maxTouchPoints > 0 || 
    navigator.msMaxTouchPoints > 0;
};

export default { media, visibilityHelpers, flexHelpers, spacingHelpers, isMobile, isTouchDevice }; 