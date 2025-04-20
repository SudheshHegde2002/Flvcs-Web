import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiLogIn, FiCopy, FiCheck, FiAlertTriangle } from 'react-icons/fi';

import { loginUser } from '../utils/data_utils';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #6200EA 0%, #B388FF 100%);
  padding: ${({ theme }) => theme.spacing.lg};
`;

const LoginCard = styled(Card)`
  max-width: 450px;
  width: 100%;
`;

const CardHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Logo = styled(motion.h1)`
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  background: linear-gradient(135deg, #6200EA 0%, #B388FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.md};
`;

const WarningBanner = styled.div`
  background-color: rgba(255, 191, 0, 0.1);
  border-left: 4px solid #ffbf00;
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  
  svg {
    color: #ffbf00;
    font-size: 1.5rem;
    margin-right: ${({ theme }) => theme.spacing.md};
  }
  
  p {
    color: ${({ theme }) => theme.colors.text};
    margin: 0;
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const Form = styled.form`
  width: 100%;
`;

const UidSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  text-align: center;
`;

const UidContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.inputBg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.md} 0;
  
  span {
    flex: 1;
    font-family: monospace;
    text-align: left;
    color: ${({ theme }) => theme.colors.textLight};
    letter-spacing: 1px;
  }
`;

const CopyButton = styled(Button)`
  margin-left: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
`;

const LoginFromClient = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const copyTimeout = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user starts typing again
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await loginUser({
        email: formData.email,
        password: formData.password
      });
      
      if (response && response.uid) {
        setIsLoggedIn(true);
        setUserId(response.uid);
        console.log('Login successful:', response);
      }  
    } catch (error) {
      console.error('Login error:', error);
      // Handle different error types
      if (error.status === 401) {
        setErrors({
          general: 'Invalid email or password'
        });
      } else if (error.message) {
        setErrors({
          general: error.message
        });
      } else {
        setErrors({
          general: 'An error occurred during login. Please try again.'
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const copyUid = () => {
    navigator.clipboard.writeText(userId).then(() => {
      setCopySuccess(true);
      
      if (copyTimeout.current) {
        clearTimeout(copyTimeout.current);
      }
      
      copyTimeout.current = setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  // Function to mask the UID for display
  const maskUid = (uid) => {
    if (!uid) return '';
    
    // Show only first 4 and last 4 characters
    const start = uid.slice(0, 4);
    const end = uid.slice(-4);
    const middle = '•'.repeat(Math.max(0, uid.length - 8));
    
    return `${start}${middle}${end}`;
  };

  return (
    <PageContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: '450px' }}
      >
        <LoginCard elevation="lg">
          <CardHeader>
            <Logo
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
            >
              FLVCS
            </Logo>
            <Subtitle>Client Application Login</Subtitle>
          </CardHeader>
          
          <WarningBanner>
            <FiAlertTriangle />
            <p>Only login if you have been redirected from an FL Studio client application.</p>
          </WarningBanner>
          
          {!isLoggedIn ? (
            <Form onSubmit={handleSubmit}>
              {errors.general && (
                <div style={{ color: 'red', marginBottom: '16px', textAlign: 'center' }}>
                  {errors.general}
                </div>
              )}
              
              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
              />
              
              <Input
                label="Password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                required
                style={{ marginBottom: '24px' }}
              />
              
              <Button 
                type="submit" 
                variant="primary" 
                size="lg" 
                disabled={isLoading} 
                style={{ width: '100%' }}
              >
                {isLoading ? 'Logging in...' : (
                  <>
                    <FiLogIn /> Log In for Client Connection
                  </>
                )}
              </Button>
            </Form>
          ) : (
            <UidSection>
              <h3>Login Successful</h3>
              <p>Your authentication UID is below. Copy it to connect with your client application.</p>
              
              <UidContainer>
                <span>{maskUid(userId)}</span>
                <CopyButton 
                  variant="ghost" 
                  size="sm"
                  onClick={copyUid}
                >
                  {copySuccess ? <FiCheck color="green" /> : <FiCopy />}
                </CopyButton>
              </UidContainer>
              
              <Button 
                variant="primary" 
                onClick={copyUid}
                style={{ width: '100%' }}
              >
                {copySuccess ? 'Copied!' : 'Copy UID to Clipboard'}
              </Button>
              
              <p style={{ marginTop: '16px', fontSize: '14px', color: '#888' }}>
                You can now close this window and return to your client application.
              </p>
            </UidSection>
          )}
        </LoginCard>
      </motion.div>
    </PageContainer>
  );
};

export default LoginFromClient; 