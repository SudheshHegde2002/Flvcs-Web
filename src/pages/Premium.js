import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiMail, FiStar, FiDatabase, FiClock, FiHeadphones, FiShield } from 'react-icons/fi';

import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const PremiumBanner = styled(motion.div)`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const PremiumHeading = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  margin: 0;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const PremiumSubheading = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin: 0;
  opacity: 0.9;
  max-width: 600px;
`;

const BenefitsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const BenefitCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  transition: all ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const BenefitIcon = styled.div`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: ${({ theme }) => `${theme.colors.primary}15`};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BenefitTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  color: ${({ theme }) => theme.colors.text};
`;

const BenefitDescription = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  margin: 0;
  line-height: 1.5;
`;

const ContactSection = styled(Card)`
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.xl};
`;

const ContactTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
  color: ${({ theme }) => theme.colors.text};
`;

const ContactCard = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const ContactIcon = styled.div`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.primary};
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ theme }) => `${theme.colors.primary}15`};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContactInfo = styled.div`
  flex: 1;
  
  h4 {
    margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
    font-size: ${({ theme }) => theme.fontSizes.md};
    color: ${({ theme }) => theme.colors.text};
  }
  
  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.textLight};
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
`;

const Premium = () => {
  return (
    <DashboardLayout>
      <PageContainer>
        <PageHeader>
          <PageTitle>Go Premium</PageTitle>
        </PageHeader>
        
        <PremiumBanner
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <PremiumHeading>
            Enhance Your Prdouction Experience
          </PremiumHeading>
          <PremiumSubheading>
            Unlock advanced features and premium support to boost your productivity and take your projects to the next level.
          </PremiumSubheading>
          <Button 
            size="lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiStar /> Contact Us to Get Premium
          </Button>
        </PremiumBanner>
        
        <BenefitsContainer>
          <BenefitCard 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <BenefitIcon>
              <FiDatabase />
            </BenefitIcon>
            <BenefitTitle>Unlimited Storage</BenefitTitle>
            <BenefitDescription>
              Get all the space you need for your projects, no matter how large they are. Store unlimited files and commits.
            </BenefitDescription>
          </BenefitCard>
          
          <BenefitCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <BenefitIcon>
              <FiClock />
            </BenefitIcon>
            <BenefitTitle>Priority Processing</BenefitTitle>
            <BenefitDescription>
              Faster commit processing and file operations. Your actions get executed with higher priority.
            </BenefitDescription>
          </BenefitCard>
          
          <BenefitCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <BenefitIcon>
              <FiHeadphones />
            </BenefitIcon>
            <BenefitTitle>Premium Support</BenefitTitle>
            <BenefitDescription>
              Get priority support with dedicated response times. Our team will ensure your issues are resolved quickly.
            </BenefitDescription>
          </BenefitCard>
        </BenefitsContainer>
        
        <ContactSection>
          <ContactTitle>Contact Us</ContactTitle>
          <ContactCard>
            <ContactIcon>
              <FiMail />
            </ContactIcon>
            <ContactInfo>
              <h4>Email Us</h4>
              <p>cocsigninbadsud@gmail.com</p>
            </ContactInfo>
          </ContactCard>
        </ContactSection>
      </PageContainer>
    </DashboardLayout>
  );
};

export default Premium; 