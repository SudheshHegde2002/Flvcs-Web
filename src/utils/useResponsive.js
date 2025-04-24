import { useState, useEffect } from 'react';

// Breakpoint values from theme.js
const breakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

const useResponsive = () => {
  // Initialize with defaults that will be updated on mount
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });
  
  // Update window size on resize
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Call handler right away to update initial size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Computed properties for different screen sizes
  const isXs = windowSize.width < breakpoints.sm;
  const isSm = windowSize.width >= breakpoints.sm && windowSize.width < breakpoints.md;
  const isMd = windowSize.width >= breakpoints.md && windowSize.width < breakpoints.lg;
  const isLg = windowSize.width >= breakpoints.lg && windowSize.width < breakpoints.xl;
  const isXl = windowSize.width >= breakpoints.xl;
  
  // Compound helpers
  const isMobile = isXs || isSm;
  const isTablet = isMd;
  const isDesktop = isLg || isXl;
  
  // Direction helpers
  const lessThanSm = windowSize.width < breakpoints.sm;
  const lessThanMd = windowSize.width < breakpoints.md;
  const lessThanLg = windowSize.width < breakpoints.lg;
  const lessThanXl = windowSize.width < breakpoints.xl;
  
  const greaterThanXs = windowSize.width >= breakpoints.sm;
  const greaterThanSm = windowSize.width >= breakpoints.md;
  const greaterThanMd = windowSize.width >= breakpoints.lg;
  const greaterThanLg = windowSize.width >= breakpoints.xl;
  
  return {
    windowSize,
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    isMobile,
    isTablet,
    isDesktop,
    lessThanSm,
    lessThanMd,
    lessThanLg,
    lessThanXl,
    greaterThanXs,
    greaterThanSm,
    greaterThanMd,
    greaterThanLg,
    breakpoints,
  };
};

export default useResponsive; 