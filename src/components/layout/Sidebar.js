import React from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiHome, FiFolder, FiSettings, FiZap } from 'react-icons/fi';


const SidebarContainer = styled.aside`
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

const Sidebar = () => {
  const navigate = useNavigate();
  
  return (
    <SidebarContainer>
      <NavSection>
        <NavList>
          <NavItem>
            <StyledNavLink to="/dashboard">
              <FiHome /> Dashboard
            </StyledNavLink>
          </NavItem>
          <NavItem>
            <StyledNavLink to="/repositories">
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
            <PremiumButton to="/premium">
              <FiZap /> Go Premium
            </PremiumButton>
          </NavItem>
          <NavItem>
            <StyledNavLink to="/settings">
              <FiSettings /> Settings
            </StyledNavLink>
          </NavItem>
        </NavList>
      </NavSection>
    </SidebarContainer>
  );
};

export default Sidebar; 