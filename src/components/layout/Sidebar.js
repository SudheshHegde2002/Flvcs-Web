import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FiHome, FiFolder, FiStar, FiArchive, FiPlusCircle, FiSettings } from 'react-icons/fi';
import { motion } from 'framer-motion';

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

const CreateButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.lg}`};
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.sm};
  }
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const RecentReposList = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
  flex: 1;
  overflow-y: auto;
`;

const RecentRepoItem = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  color: ${({ theme }) => theme.colors.text};
  transition: all ${({ theme }) => theme.transitions.fast};
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.primary};
  }
  
  &.active {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => `${theme.colors.primary}10`};
  }
  
  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Sidebar = () => {
  // Mock data for recent repositories
  const recentRepos = [
    { id: 1, name: 'summer-edm-project' },
    { id: 2, name: 'lofi-beats-collection' },
    { id: 3, name: 'trap-samples-2024' },
    { id: 4, name: 'vocal-chops-library' },
    { id: 5, name: 'synthwave-templates' },
  ];

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
          <NavItem>
            <StyledNavLink to="/starred">
              <FiStar /> Starred
            </StyledNavLink>
          </NavItem>
          <NavItem>
            <StyledNavLink to="/archived">
              <FiArchive /> Archived
            </StyledNavLink>
          </NavItem>
        </NavList>
      </NavSection>
      
      <CreateButton 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FiPlusCircle /> New Repository
      </CreateButton>
      
      <NavSection>
        <h3>Recent Projects</h3>
        <RecentReposList>
          {recentRepos.map(repo => (
            <RecentRepoItem 
              key={repo.id}
              to={`/repository/${repo.id}`}
            >
              <span>{repo.name}</span>
            </RecentRepoItem>
          ))}
        </RecentReposList>
      </NavSection>
      
      <NavSection style={{ marginTop: 'auto' }}>
        <NavList>
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