import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap');
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html, body {
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 16px;
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color 0.3s ease, color 0.3s ease;
    overflow-x: hidden;
    width: 100%;
    height: 100%;
  }
  
  /* Add responsive font size adjustments */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    html, body {
      font-size: 15px;
    }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    html, body {
      font-size: 14px;
    }
  }
  
  /* Ensure images are responsive */
  img, svg, video {
    max-width: 100%;
    height: auto;
    display: block;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: 600;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.text};
    transition: color 0.3s ease;
    line-height: 1.3;
  }
  
  /* Responsive heading sizes */
  h1 { font-size: ${({ theme }) => theme.fontSizes.xxxl}; }
  h2 { font-size: ${({ theme }) => theme.fontSizes.xxl}; }
  h3 { font-size: ${({ theme }) => theme.fontSizes.xl}; }
  h4 { font-size: ${({ theme }) => theme.fontSizes.lg}; }
  h5 { font-size: ${({ theme }) => theme.fontSizes.md}; }
  h6 { font-size: ${({ theme }) => theme.fontSizes.sm}; }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    h1 { font-size: calc(${({ theme }) => theme.fontSizes.xxxl} * 0.9); }
    h2 { font-size: calc(${({ theme }) => theme.fontSizes.xxl} * 0.9); }
    h3 { font-size: calc(${({ theme }) => theme.fontSizes.xl} * 0.9); }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    h1 { font-size: calc(${({ theme }) => theme.fontSizes.xxxl} * 0.75); }
    h2 { font-size: calc(${({ theme }) => theme.fontSizes.xxl} * 0.75); }
    h3 { font-size: calc(${({ theme }) => theme.fontSizes.xl} * 0.8); }
    h4 { font-size: calc(${({ theme }) => theme.fontSizes.lg} * 0.9); }
  }
  
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primary};
    transition: color ${({ theme }) => theme.transitions.fast};
    
    &:hover {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }
  
  button, input, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }
  
  ul, ol {
    list-style: none;
  }
  
  img {
    max-width: 100%;
  }
  
  ::selection {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;

export default GlobalStyle; 