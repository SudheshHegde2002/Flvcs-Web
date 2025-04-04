import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CardContainer = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.cardBg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme, padding }) => 
    padding ? theme.spacing[padding] : theme.spacing.lg};
  box-shadow: ${({ theme, elevation }) => 
    elevation === 'sm' ? theme.shadows.sm :
    elevation === 'md' ? theme.shadows.md :
    elevation === 'lg' ? theme.shadows.lg :
    theme.shadows.sm};
  width: ${({ width }) => width || '100%'};
  transition: all ${({ theme }) => theme.transitions.normal};
  border: ${({ theme, bordered }) => 
    bordered ? `1px solid ${theme.colors.border}` : 'none'};
  
  &:hover {
    box-shadow: ${({ theme, interactive }) => 
      interactive ? theme.shadows.md : ''};
  }
`;

const Card = ({
  children,
  padding = 'lg',
  elevation = 'sm',
  width,
  interactive = false,
  bordered = false,
  initial = { opacity: 0, y: 20 },
  animate = { opacity: 1, y: 0 },
  transition = { duration: 0.3 },
  ...props
}) => {
  return (
    <CardContainer
      padding={padding}
      elevation={elevation}
      width={width}
      interactive={interactive}
      bordered={bordered}
      initial={initial}
      animate={animate}
      transition={transition}
      {...props}
    >
      {children}
    </CardContainer>
  );
};

export default Card; 