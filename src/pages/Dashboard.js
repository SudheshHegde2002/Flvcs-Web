import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiFolder, FiStar, FiClock, FiPlusCircle } from 'react-icons/fi';

import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

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

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text};
`;

const RepoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const RepoCard = styled(Card)`
  display: flex;
  flex-direction: column;
  transition: all ${({ theme }) => theme.transitions.fast};
  height: 100%;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const RepoHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const RepoTitle = styled(Link)`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  
  &:hover {
    text-decoration: underline;
  }
`;

const RepoDescription = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin: 0;
  line-height: 1.5;
`;

const RepoContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  flex: 1;
`;

const RepoStats = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
  
  div {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

const LastUpdated = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const RepoFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
`;

const RepoLanguage = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  
  span {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #6200EA; // Default to purple
  }
`;

const CreateRepoCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  border: 2px dashed ${({ theme }) => theme.colors.border};
  text-align: center;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  svg {
    font-size: 3rem;
    color: ${({ theme }) => theme.colors.textLight};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  h3 {
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  p {
    color: ${({ theme }) => theme.colors.textLight};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
  }
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: rgba(98, 0, 234, 0.05);
    
    svg {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProjects: 0,
    starred: 0,
    recentlyUpdated: 0
  });
  const [repositories, setRepositories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulating API call to get user's repositories
    const fetchData = async () => {
      try {
        // In a real app, we would fetch from an API
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Empty the data but keep structure
        setStats({
          totalProjects: 0,
          starred: 0,
          recentlyUpdated: 0
        });
        
        setRepositories([]);
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const handleCreateRepository = () => {
    navigate('/create-repository');
  };

  return (
    <DashboardLayout>
      <DashboardContainer>
        <DashboardHeader>
          <Title>Dashboard</Title>
          <Button 
            variant="primary" 
            onClick={handleCreateRepository}
          >
            <FiPlusCircle /> New Repository
          </Button>
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
              <StatCard>
                <FiStar />
                <h3>{stats.starred}</h3>
                <p>Starred Projects</p>
              </StatCard>
              <StatCard>
                <FiClock />
                <h3>{stats.recentlyUpdated}</h3>
                <p>Recently Updated</p>
              </StatCard>
            </StatsContainer>
            
            <SectionTitle>Recent Repositories</SectionTitle>
            {repositories.length === 0 ? (
              <p>No repositories found.</p>
            ) : (
              <RepoGrid>
                {repositories.map((repo, index) => (
                  <RepoCard
                    key={repo.id}
                    as={motion.div}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    interactive
                  >
                    <RepoHeader>
                      <RepoTitle to={`/repository/${repo.id}`}>{repo.name}</RepoTitle>
                      <RepoDescription>{repo.description}</RepoDescription>
                    </RepoHeader>
                    
                    <RepoContent>
                      <RepoStats>
                        <div>{repo.file_count} files</div>
                        <div>{repo.size}</div>
                      </RepoStats>
                      
                      <LastUpdated>
                        <FiClock />
                        Updated on {formatDate(repo.updated_at)}
                      </LastUpdated>
                    </RepoContent>
                    
                    <RepoFooter>
                      <RepoLanguage>
                        <span></span>
                        {repo.language}
                      </RepoLanguage>
                      
                      <Button variant="ghost" size="sm">
                        <FiStar />
                      </Button>
                    </RepoFooter>
                  </RepoCard>
                ))}
                
                <CreateRepoCard
                  as={motion.div}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCreateRepository}
                >
                  <FiPlusCircle />
                  <h3>Create new project</h3>
                  <p>Start a new FL Studio project repository</p>
                  <Button variant="primary">Create Repository</Button>
                </CreateRepoCard>
              </RepoGrid>
            )}
          </>
        )}
      </DashboardContainer>
    </DashboardLayout>
  );
};

export default Dashboard; 