import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiFolder } from 'react-icons/fi';

import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/common/Card';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const DashboardHeader = styled.div`
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

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const StatCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  
  svg {
    font-size: 2.5rem;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  h3 {
    font-size: ${({ theme }) => theme.fontSizes.xxl};
    margin: ${({ theme }) => theme.spacing.xs} 0;
    color: ${({ theme }) => theme.colors.text};
  }
  
  p {
    color: ${({ theme }) => theme.colors.textLight};
    margin: 0;
  }
`;

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProjects: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Simulating API call to get user's repositories
    const fetchData = async () => {
      try {
        // In a real app, we would fetch from an API
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Empty the data but keep structure
        setStats({
          totalProjects: 0
        });
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardContainer>
        <DashboardHeader>
          <Title>Dashboard</Title>
        </DashboardHeader>
        
        {isLoading ? (
          <div>Loading dashboard data...</div>
        ) : (
          <>
            <StatsContainer>
              <StatCard>
                <FiFolder />
                <h3>{stats.totalProjects}</h3>
                <p>Total Projects</p>
              </StatCard>
            </StatsContainer>
            
            <p>Welcome to your dashboard. Use the sidebar to navigate.</p>
          </>
        )}
      </DashboardContainer>
    </DashboardLayout>
  );
};

export default Dashboard; 