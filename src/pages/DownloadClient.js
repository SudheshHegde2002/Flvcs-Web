import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDownload, FiMusic, FiServer, FiLayers, FiCheck, FiRefreshCw, FiX } from 'react-icons/fi';
import { FaWindows, FaApple } from 'react-icons/fa';

import ThemeToggle from '../components/common/ThemeToggle';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s ease;
  position: relative;
  overflow-x: hidden;
`;

const HorizonBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  overflow: hidden;
  
  &:before {
    /* Purple bottom section */
    content: '';
    position: absolute;
    bottom: 0;
    left: -50%;
    right: -50%;
    height: 50vh;
    background: linear-gradient(
      to top,
      ${({ theme }) => theme.colors.primary + '90'} 0%,
      ${({ theme }) => theme.colors.primary + '70'} 40%,
      ${({ theme }) => theme.colors.primary + '40'} 60%,
      ${({ theme }) => theme.colors.primary + '00'} 100%
    );
    border-top-left-radius: 50% 100%;
    border-top-right-radius: 50% 100%;
    transform: translateY(10%);
  }
  
  &:after {
    /* Top section - adapts to theme */
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 60vh;
    background-color: ${({ theme }) => theme.colors.background};
    z-index: -1;
  }
`;

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  background-color: transparent;
  position: relative;
  z-index: 2;
`;

const Logo = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};

  span {
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.secondary} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  flex: 1;
`;

const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${({ theme }) => `${theme.spacing.xxxl} ${theme.spacing.xl}`};
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.lg}`};
  }
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.xxl};
  }
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textLight};
  max-width: 700px;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  line-height: 1.6;
`;

const FeaturesSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xxxl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
  
  svg {
    font-size: 2.5rem;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  h3 {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  p {
    color: ${({ theme }) => theme.colors.textLight};
    line-height: 1.6;
  }
`;

const DownloadSection = styled.div`
  background: ${({ theme }) => `rgba(255, 255, 255, 0.1)`};
  backdrop-filter: blur(10px);
  padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.xl}`};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxxl};
  max-width: 800px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const DownloadTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

const DownloadButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    width: 100%;
  }
`;

const DownloadButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  gap: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.md};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 200px;
  
  svg {
    font-size: 1.5rem;
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
  }
`;

const ThankYouContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  padding: ${({ theme }) => theme.spacing.xl};
  backdrop-filter: blur(5px);
`;

const ThankYouCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.cardBg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xxl};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  max-width: 500px;
  width: 100%;
  text-align: center;
  position: relative;
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.textLight};
  cursor: pointer;
  
  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const ThankYouTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ThankYouMessage = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  line-height: 1.6;
`;

const MusicNotes = styled.div`
  display: flex;
  justify-content: center;
  margin: ${({ theme }) => theme.spacing.xl} 0;
  height: 80px;
  position: relative;
`;

const Note = styled(motion.div)`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  position: relative;
  margin: 0 ${({ theme }) => theme.spacing.md};
  
  &:before {
    content: '';
    position: absolute;
    width: 2px;
    height: 25px;
    background-color: ${({ theme }) => theme.colors.primary};
    bottom: 0;
    right: -2px;
  }
  
  &:after {
    content: '';
    position: absolute;
    width: 15px;
    height: 10px;
    border: 2px solid ${({ theme }) => theme.colors.primary};
    border-bottom: none;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    bottom: 22px;
    left: -5px;
  }
`;

const DownloadClient = () => {
  const [showThankYou, setShowThankYou] = useState(false);
  const [downloadType, setDownloadType] = useState('');
  const [downloadStarted, setDownloadStarted] = useState(false);
  
  const handleDownload = (type) => {
    setDownloadType(type);
    setShowThankYou(true);
    
    // Simulate download starting after 2 seconds
    setTimeout(() => {
      setDownloadStarted(true);
    }, 2000);
  };
  
  const closeThankYou = () => {
    setShowThankYou(false);
    setDownloadStarted(false);
  };
  
  return (
    <PageContainer>
      <HorizonBackground />
      
      <HeaderContainer>
        <Logo>
          <span>FLVCS</span>
        </Logo>
        
        <ThemeToggle />
      </HeaderContainer>
      
      <ContentWrapper>
        <HeroSection>
          <Title>FLVCS Client for Your Desktop</Title>
          <Subtitle>
            Manage your FL Studio projects with our powerful desktop client. Sync, version control, and collaborate on your music production projects with ease.
          </Subtitle>
          
          <FeaturesSection>
            <FeatureCard>
              <FiServer />
              <h3>Version Control</h3>
              <p>Track changes to your FL Studio projects with Git-like version control specifically designed for music production.</p>
            </FeatureCard>
            
            <FeatureCard>
              <FiRefreshCw />
              <h3>Seamless Sync</h3>
              <p>Keep your projects in sync across devices with automatic background synchronization.</p>
            </FeatureCard>
            
            <FeatureCard>
              <FiLayers />
              <h3>Project Management</h3>
              <p>Organize your projects with tags, folders, and smart search to find what you need quickly.</p>
            </FeatureCard>
          </FeaturesSection>
          
          <DownloadSection>
            <DownloadTitle>Download the FLVCS Client</DownloadTitle>
            <p>Choose your platform and get started with FLVCS today</p>
            
            <DownloadButtons>
              <DownloadButton 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDownload('Windows')}
              >
                <FaWindows /> Windows x64
              </DownloadButton>
              
              <DownloadButton 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDownload('Mac')}
              >
                <FaApple /> Mac Universal
              </DownloadButton>
            </DownloadButtons>
          </DownloadSection>
        </HeroSection>
      </ContentWrapper>
      
      <AnimatePresence>
        {showThankYou && (
          <ThankYouContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ThankYouCard
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
            >
              <CloseButton 
                onClick={closeThankYou}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiX />
              </CloseButton>
              
              <ThankYouTitle>Thank You for Downloading!</ThankYouTitle>
              <ThankYouMessage>
                You're about to experience the best way to manage your FL Studio projects. The FLVCS Client for {downloadType} will help you create amazing music with the power of version control.
              </ThankYouMessage>
              
              <MusicNotes>
                <Note 
                  animate={{ 
                    y: [0, -30, 0],
                    rotate: [0, 10, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 2,
                    delay: 0
                  }}
                />
                <Note 
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 1.7,
                    delay: 0.3
                  }}
                />
                <Note 
                  animate={{ 
                    y: [0, -40, 0],
                    rotate: [0, 15, 0],
                    scale: [1, 1.3, 1]
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 2.2,
                    delay: 0.6
                  }}
                />
              </MusicNotes>
              
              {downloadStarted ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <FiCheck style={{ fontSize: '3rem', color: 'green', marginBottom: '1rem' }} />
                  <p>Your download has started!</p>
                </motion.div>
              ) : (
                <motion.div
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <p>Preparing your download...</p>
                </motion.div>
              )}
            </ThankYouCard>
          </ThankYouContainer>
        )}
      </AnimatePresence>
    </PageContainer>
  );
};

export default DownloadClient; 