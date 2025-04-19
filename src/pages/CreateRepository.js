import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiFolder, FiEdit3 } from 'react-icons/fi';

import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

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

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const FormCard = styled(Card)`
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.xl};
`;

const FormHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const FormIcon = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  svg {
    font-size: 3rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const FormTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const FormSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.md};
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme, error }) => error ? theme.colors.error : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.inputBg};
  color: ${({ theme }) => theme.colors.text};
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes.md};
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${({ theme, error }) => error ? theme.colors.error : theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme, error }) => error ? `${theme.colors.error}20` : `${theme.colors.primary}20`};
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

const CreateRepository = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Repository name is required';
    } else if (!/^[a-zA-Z0-9-_]+$/.test(formData.name)) {
      newErrors.name = 'Repository name can only include letters, numbers, hyphens and underscores';
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
      // Here we would call an API to create a repository
      // For now, we'll simulate it with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate a unique repository ID
      const repoId = Date.now().toString();
      
      // Navigate to the new repository page
      navigate(`/repository/${repoId}`);
    } catch (error) {
      console.error('Error creating repository:', error);
      setErrors({
        general: 'Error creating repository. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  return (
    <DashboardLayout>
      <PageContainer>
        <PageHeader>
          <Title>Create New Repository</Title>
        </PageHeader>
        
        <FormCard
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Form onSubmit={handleSubmit}>
            <FormHeader>
              <FormIcon>
                <FiFolder />
              </FormIcon>
              <FormTitle>Create a new FL Studio project repository</FormTitle>
              <FormSubtitle>Your repository will be set up with version control for your FL Studio projects</FormSubtitle>
            </FormHeader>
            
            {errors.general && (
              <ErrorMessage>{errors.general}</ErrorMessage>
            )}
            
            <div>
              <Input
                label="Repository Name"
                name="name"
                placeholder="my-awesome-project"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                required
              />
              {errors.name && (
                <ErrorMessage>{errors.name}</ErrorMessage>
              )}
            </div>
            
            <div>
              <Label htmlFor="description">Description (optional)</Label>
              <TextArea
                id="description"
                name="description"
                placeholder="Brief description of your project"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            
            <FormActions>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={isLoading}
              >
                {isLoading ? 'Creating...' : 'Create Repository'}
              </Button>
            </FormActions>
          </Form>
        </FormCard>
      </PageContainer>
    </DashboardLayout>
  );
};

export default CreateRepository; 