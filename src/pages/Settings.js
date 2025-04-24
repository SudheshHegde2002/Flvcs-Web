import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {  FiCreditCard, FiLogOut, FiZap
} from 'react-icons/fi';

import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const SettingsHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  margin: 0;
`;

const SettingsLayout = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: column;
  }
`;

const SettingsSidebar = styled.div`
  flex: 0 0 250px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex: auto;
  }
`;

const SettingsContent = styled.div`
  flex: 1;
`;

const SidebarCard = styled(Card)`
  overflow: hidden;
`;

const SidebarItem = styled.button`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  border-left: 3px solid ${({ theme, active }) => 
    active ? theme.colors.primary : 'transparent'};
  background-color: ${({ theme, active }) => 
    active ? `${theme.colors.primary}10` : 'transparent'};
  color: ${({ theme, active }) => 
    active ? theme.colors.primary : theme.colors.text};
  font-weight: ${({ active }) => active ? 600 : 400};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background-color: ${({ theme, active }) => 
      active ? `${theme.colors.primary}10` : theme.colors.background};
  }
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.md};
    color: ${({ theme, active }) => 
      active ? theme.colors.primary : theme.colors.textLight};
  }
`;

const SettingsSection = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const SectionHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const SectionContent = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const AvatarSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Avatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2.5rem;
  font-weight: 600;
  margin-right: ${({ theme }) => theme.spacing.xl};
`;

const AvatarActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const DangerZone = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding-top: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.error + '30'};
`;

const DangerTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.error};
  margin: 0;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const DangerDescription = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  margin: 0;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const PremiumCard = styled(Card)`
  border: 1px dashed ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  background-color: ${({ theme }) => `${theme.colors.background}`};
`;

const PremiumIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}30, ${({ theme }) => theme.colors.secondary}30);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${({ theme }) => theme.spacing.lg};
  
  svg {
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const PremiumTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const PremiumDescription = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Settings = () => {
  const [activeSection, setActiveSection] = useState('billing');
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth token and navigate to login
    localStorage.removeItem('auth_token');
    navigate('/login');
  };

  const renderBillingSection = () => (
    <SettingsSection>
      <SectionHeader>
        <SectionTitle>Billing</SectionTitle>
      </SectionHeader>
      <SectionContent>
        <PremiumCard>
          <PremiumIcon>
            <FiZap />
          </PremiumIcon>
          <PremiumTitle>You are not a Premium user yet</PremiumTitle>
          <PremiumDescription>
            Upgrade to Premium to get unlimited storage, priority processing, 
            and dedicated support from our team.
          </PremiumDescription>
          <Button 
            variant="primary"
            onClick={() => navigate('/premium')}
          >
            <FiZap /> Go Premium
          </Button>
        </PremiumCard>
      </SectionContent>
    </SettingsSection>
  );

  return (
    <DashboardLayout>
      <SettingsContainer>
        <SettingsHeader>
          <Title>Settings</Title>
          <Description>Manage your account settings and preferences</Description>
        </SettingsHeader>
        
        <SettingsLayout>
          <SettingsSidebar>
            <SidebarCard>
              <SidebarItem 
                active={activeSection === 'billing'} 
                onClick={() => setActiveSection('billing')}
              >
                <FiCreditCard /> Billing
              </SidebarItem>
              <SidebarItem onClick={handleLogout}>
                <FiLogOut /> Logout
              </SidebarItem>
            </SidebarCard>
          </SettingsSidebar>
          
          <SettingsContent>
            {renderBillingSection()}
          </SettingsContent>
        </SettingsLayout>
      </SettingsContainer>
    </DashboardLayout>
  );
};

export default Settings; 