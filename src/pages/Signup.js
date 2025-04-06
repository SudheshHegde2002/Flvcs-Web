import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiUserPlus, FiGithub } from 'react-icons/fi';

import { signupUser } from '../utils/data_utils';
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

const SignupCard = styled(Card)`
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

const Form = styled.form`
  width: 100%;
`;

const SocialLoginButton = styled(Button)`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: ${({ theme }) => theme.spacing.lg} 0;
  
  &:before, &:after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.border};
  }
  
  span {
    padding: 0 ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.textLight};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const TermsText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textLight};
  margin: ${({ theme }) => theme.spacing.md} 0;
  text-align: center;
  
  a {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const LoginPrompt = styled.div`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  
  a {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 500;
  }
`;

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
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
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Signup form submitted');
    
    if (!validateForm()) {
      console.log('Form validation failed, aborting signup');
      return;
    }
    
    setIsLoading(true);
    console.log('Setting loading state to true');
    
    try {
      console.log('Attempting signup with:', { 
        name: formData.name,
        email: formData.email, 
        password: '********' 
      });
      
      // Call the signup API function from data_utils.js
      const response = await signupUser({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      
      console.log('Signup successful:', response);
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Signup error:', error);
      
      // Handle different error types
      if (error.status === 409) {
        setErrors({
          email: 'Email already exists',
          general: 'An account with this email already exists'
        });
      } else if (error.message) {
        setErrors({
          general: error.message
        });
      } else {
        setErrors({
          general: 'An error occurred during signup. Please try again.'
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubSignup = () => {
    // GitHub signup logic would be implemented here
    console.log('GitHub signup clicked');
    alert('GitHub signup would be implemented in a real application');
  };

  return (
    <PageContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <SignupCard elevation="lg">
          <CardHeader>
            <Logo
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
            >
              FLVCS
            </Logo>
            <Subtitle>Create an account to get started</Subtitle>
          </CardHeader>
          
          <SocialLoginButton 
            variant="outline" 
            size="lg" 
            onClick={handleGithubSignup} 
            fullWidth
          >
            <FiGithub /> Sign up with GitHub
          </SocialLoginButton>
          
          <Divider>
            <span>OR</span>
          </Divider>
          
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
            
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              required
            />
            
            <TermsText>
              By signing up, you agree to our <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>
            </TermsText>
            
            <Button 
              type="submit" 
              variant="primary" 
              size="lg" 
              disabled={isLoading} 
              style={{ width: '100%' }}
            >
              {isLoading ? 'Creating account...' : (
                <>
                  <FiUserPlus /> Sign Up
                </>
              )}
            </Button>
          </Form>
          
          <LoginPrompt>
            Already have an account? <Link to="/login">Log in</Link>
          </LoginPrompt>
        </SignupCard>
      </motion.div>
    </PageContainer>
  );
};

export default Signup; 