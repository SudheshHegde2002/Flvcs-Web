import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiLogIn } from 'react-icons/fi';

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
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const LoginCard = styled(Card)`
  max-width: 450px;
  width: 100%;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: 100%;
  }
`;

const CardHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const Logo = styled(motion.h1)`
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  background: linear-gradient(135deg, #6200EA 0%, #B388FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.xxl};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const Form = styled.form`
  width: 100%;
`;

const ForgotPassword = styled(Link)`
  display: block;
  text-align: right;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }
`;

const SignupPrompt = styled.div`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  
  a {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 500;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-top: ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }
`;

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const navigate = useNavigate();

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
    console.log('Login form submitted');
    
    if (!validateForm()) {
      console.log('Form validation failed, aborting login');
      return;
    }
    
    setIsLoading(true);
    console.log('Setting loading state to true');
    
    try {
      console.log('Attempting login with:', { 
        email: formData.email, 
        password: '********' 
      });
      
      // Call the login API function from data_utils.js
      const response = await loginUser({
        email: formData.email,
        password: formData.password
      });
      
      if (response && response.uid) {
        setisLoggedIn(true);
        console.log('Login successful:', response);
        navigate('/dashboard');
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
          general: 'An error occurred during login or user is invalid. Please Sign In'
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%' }}
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
            <Subtitle>Log in to manage your FL Studio projects</Subtitle>
          </CardHeader>
          
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
            />
            
            <ForgotPassword to="/forgot-password">
              Forgot password?
            </ForgotPassword>
            
            <Button 
              type="submit" 
              variant="primary" 
              size="lg" 
              disabled={isLoading} 
              style={{ width: '100%' }}
              fullWidthOnMobile={true}
            >
              {isLoading ? 'Logging in...' : (
                <>
                  <FiLogIn /> Log In
                </>
              )}
            </Button>
          </Form>
          
          <SignupPrompt>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </SignupPrompt>
        </LoginCard>
      </motion.div>
    </PageContainer>
  );
};

export default Login; 