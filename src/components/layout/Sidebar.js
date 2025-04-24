import React from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiHome, FiFolder, FiSettings, FiZap, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const SidebarContainer = styled(motion.aside)`
  background-color: ${({ theme }) => theme.colors.cardBg};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  width: 240px;
  height: 100vh;
  position: sticky;
  top: 0;
  padding: ${({ theme }) => theme.spacing.xl} 0;
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  z-index: 20;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    position: fixed;
    left: 0;
    top: 0;
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const MobileCloseButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 24px;
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`;

const NavSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  h3 {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.textLight};
    padding: 0 ${({ theme }) => theme.spacing.lg};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin: ${({ theme }) => theme.spacing.xs} 0;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  transition: all ${({ theme }) => theme.transitions.fast};
  text-decoration: none;
  position: relative;
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.textLight};
    transition: all ${({ theme }) => theme.transitions.fast};
  }
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.primary};
    
    svg {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
  
  &.active {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
    background-color: ${({ theme }) => `${theme.colors.primary}10`};
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 100%;
      background-color: ${({ theme }) => theme.colors.primary};
    }
    
    svg {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const PremiumButton = styled(StyledNavLink)`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  margin: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: white;
  font-weight: 600;
  
  svg {
    color: white;
  }
  
  &:hover {
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.secondary}, ${({ theme }) => theme.colors.primary});
    color: white;
    
    svg {
      color: white;
    }
  }
  
  &.active {
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.secondary}, ${({ theme }) => theme.colors.primary});
    color: white;
    
    &::before {
      background-color: white;
    }
    
    svg {
      color: white;
    }
  }
`;

const sidebarVariants = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30
    }
  },
  closed: {
    x: '-100%',
    opacity: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30
    }
  }
};

const Sidebar = ({ isOpen = true, onClose }) => {
  const navigate = useNavigate();
  
  return (
    <AnimatePresence>
      {(isOpen || window.innerWidth > 768) && (
        <SidebarContainer
          initial={{ x: window.innerWidth <= 768 ? '-100%' : 0 }}
          animate={window.innerWidth <= 768 ? (isOpen ? 'open' : 'closed') : {}}
          exit={{ x: '-100%' }}
          variants={sidebarVariants}
        >
          <MobileCloseButton onClick={onClose}>
            <FiX />
          </MobileCloseButton>
          
          <NavSection>
            <NavList>
              <NavItem>
                <StyledNavLink to="/dashboard" onClick={onClose}>
                  <FiHome /> Dashboard
                </StyledNavLink>
              </NavItem>
              <NavItem>
                <StyledNavLink to="/repositories" onClick={onClose}>
                  <FiFolder /> My Repositories
                </StyledNavLink>
              </NavItem>
              {/*
              <NavItem>
                <StyledNavLink to="/starred">
                  <FiStar /> Starred
                </StyledNavLink>
              </NavItem>
              */}
              {/*
              <NavItem>
                <StyledNavLink to="/archived">
                  <FiArchive /> Archived
                </StyledNavLink>
              </NavItem>
              */}
            </NavList>
          </NavSection>
          
          <NavSection style={{ marginTop: 'auto' }}>
            <NavList>
              <NavItem>
                <PremiumButton to="/premium" onClick={onClose}>
                  <FiZap /> Go Premium
                </PremiumButton>
              </NavItem>
              <NavItem>
                <StyledNavLink to="/settings" onClick={onClose}>
                  <FiSettings /> Settings
                </StyledNavLink>
              </NavItem>
            </NavList>
          </NavSection>
        </SidebarContainer>
      )}
    </AnimatePresence>
  );
};

export default Sidebar; 