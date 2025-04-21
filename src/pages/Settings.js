import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiUser, FiLock, FiCreditCard, FiLogOut, FiSave
} from 'react-icons/fi';

import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

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

const Settings = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    company: 'Music Productions Inc.',
    website: 'https://johnmusic.com',
    bio: 'Music producer specializing in EDM and lo-fi beats.',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, we would save the changes here
    alert('Settings saved successfully!');
  };

  const handleLogout = () => {
    // Clear auth token and navigate to login
    localStorage.removeItem('auth_token');
    navigate('/login');
  };

  const renderProfileSection = () => (
    <SettingsSection as="form" onSubmit={handleSubmit}>
      <SectionHeader>
        <SectionTitle>Profile Information</SectionTitle>
      </SectionHeader>
      <SectionContent>
        <AvatarSection>
          <Avatar>JD</Avatar>
          <AvatarActions>
            <Button variant="outline" size="sm">
              Upload New Picture
            </Button>
            <Button variant="ghost" size="sm">
              Remove Picture
            </Button>
          </AvatarActions>
        </AvatarSection>
        
        <FormRow>
          <Input
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </FormRow>
        
        <FormRow>
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </FormRow>
        
        <FormRow>
          <Input
            label="Company"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
          />
          <Input
            label="Website"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
          />
        </FormRow>
        
        <Input
          label="Bio"
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          as="textarea"
          rows={4}
        />
        
        <ButtonsContainer>
          <Button type="submit" variant="primary">
            <FiSave /> Save Changes
          </Button>
        </ButtonsContainer>
      </SectionContent>
    </SettingsSection>
  );

  const renderSecuritySection = () => (
    <SettingsSection as="form" onSubmit={handleSubmit}>
      <SectionHeader>
        <SectionTitle>Security</SectionTitle>
      </SectionHeader>
      <SectionContent>
        <Input
          label="Current Password"
          name="currentPassword"
          type="password"
          value={formData.currentPassword}
          onChange={handleInputChange}
          required
        />
        
        <FormRow>
          <Input
            label="New Password"
            name="newPassword"
            type="password"
            value={formData.newPassword}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Confirm New Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </FormRow>
        
        <ButtonsContainer>
          <Button type="submit" variant="primary">
            <FiSave /> Update Password
          </Button>
        </ButtonsContainer>
        
        <DangerZone>
          <DangerTitle>Delete Account</DangerTitle>
          <DangerDescription>
            Once you delete your account, there is no going back. Please be certain.
          </DangerDescription>
          <Button variant="danger">
            Delete Account
          </Button>
        </DangerZone>
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
                active={activeSection === 'profile'} 
                onClick={() => setActiveSection('profile')}
              >
                <FiUser /> Profile
              </SidebarItem>
              <SidebarItem 
                active={activeSection === 'security'} 
                onClick={() => setActiveSection('security')}
              >
                <FiLock /> Security
              </SidebarItem>
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
            {activeSection === 'profile' && renderProfileSection()}
            {activeSection === 'security' && renderSecuritySection()}
            {activeSection === 'billing' && (
              <SettingsSection>
                <SectionHeader>
                  <SectionTitle>Billing</SectionTitle>
                </SectionHeader>
                <SectionContent>
                  <p>Billing settings are not available in the demo.</p>
                </SectionContent>
              </SettingsSection>
            )}
          </SettingsContent>
        </SettingsLayout>
      </SettingsContainer>
    </DashboardLayout>
  );
};

export default Settings; 