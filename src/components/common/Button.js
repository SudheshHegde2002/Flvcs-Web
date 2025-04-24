import React from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

const ButtonVariants = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.secondary};
    }
  `,
  secondary: css`
    background-color: ${({ theme }) => theme.colors.secondary};
    color: white;
    
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.primary};
    }
  `,
  outline: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary};
    border: 2px solid ${({ theme }) => theme.colors.primary};
    
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.primary};
      color: white;
    }
  `,
  ghost: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary};
    
    &:hover:not(:disabled) {
      background-color: rgba(98, 0, 234, 0.1);
    }
  `,
  danger: css`
    background-color: ${({ theme }) => theme.colors.error};
    color: white;
    
    &:hover:not(:disabled) {
      background-color: #d32f2f;
    }
  `
};

const ButtonSizes = {
  sm: css`
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  `,
  md: css`
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
    font-size: ${({ theme }) => theme.fontSizes.md};
  `,
  lg: css`
    padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
    font-size: ${({ theme }) => theme.fontSizes.lg};
  `
};

const StyledButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  gap: ${({ theme }) => theme.spacing.sm};
  
  ${({ variant }) => ButtonVariants[variant]};
  ${({ size }) => ButtonSizes[size]};
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  svg {
    font-size: 1.2em;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    ${({ size }) => {
      if (size === 'lg') {
        return ButtonSizes['md'];
      }
      if (size === 'md') {
        return ButtonSizes['sm'];
      }
      return '';
    }}
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    ${({ size, fullWidthOnMobile }) => 
      fullWidthOnMobile ? 'width: 100%;' : ''}
    
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }
`;

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  type = 'button',
  fullWidthOnMobile = false,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      disabled={disabled}
      onClick={onClick}
      type={type}
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.02 }}
      fullWidthOnMobile={fullWidthOnMobile}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button; 