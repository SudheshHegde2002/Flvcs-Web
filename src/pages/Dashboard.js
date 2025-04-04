import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
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

  useEffect(() => {
    // Simulating API call to get user's repositories
    const fetchData = async () => {
      try {
        // In a real app, we would fetch from an API
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setStats({
          totalProjects: 12,
          starred: 5,
          recentlyUpdated: 3
        });
        
        setRepositories([
          {
            id: 1,
            name: 'summer-edm-project',
            description: 'Progressive house and future bass tracks with vocal samples for summer playlist.',
            updated_at: '2023-04-01T10:30:00Z',
            file_count: 24,
            size: '1.2GB',
            language: 'FL Studio'
          },
          {
            id: 2,
            name: 'lofi-beats-collection',
            description: 'Chill lo-fi beats with jazz samples and vinyl effects for study/relaxation.',
            updated_at: '2023-03-15T14:20:00Z',
            file_count: 18,
            size: '850MB',
            language: 'FL Studio'
          },
          {
            id: 3,
            name: 'trap-samples-2024',
            description: 'Custom drum samples and 808s for trap production with mixing presets.',
            updated_at: '2023-03-28T09:45:00Z',
            file_count: 42,
            size: '2.1GB',
            language: 'FL Studio'
          },
          {
            id: 4,
            name: 'vocal-chops-library',
            description: 'Processed and chopped vocal samples ready for EDM production.',
            updated_at: '2023-02-20T11:10:00Z',
            file_count: 36,
            size: '1.5GB',
            language: 'FL Studio'
          },
          {
            id: 5,
            name: 'synthwave-templates',
            description: '80s inspired synthwave project templates with retro synth presets.',
            updated_at: '2023-01-05T16:30:00Z',
            file_count: 15,
            size: '1.8GB',
            language: 'FL Studio'
          }
        ]);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <DashboardLayout>
      <DashboardContainer>
        <DashboardHeader>
          <Title>Dashboard</Title>
          <Button>
            <FiPlusCircle /> New Repository
          </Button>
        </DashboardHeader>
        
        <StatsContainer>
          <StatCard
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <FiFolder />
            <h3>{stats.totalProjects}</h3>
            <p>Total Projects</p>
          </StatCard>
          
          <StatCard
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <FiStar />
            <h3>{stats.starred}</h3>
            <p>Starred Projects</p>
          </StatCard>
          
          <StatCard
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <FiClock />
            <h3>{stats.recentlyUpdated}</h3>
            <p>Recently Updated</p>
          </StatCard>
        </StatsContainer>
        
        <SectionTitle>Recent Projects</SectionTitle>
        
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
            transition={{ duration: 0.3, delay: repositories.length * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiPlusCircle />
            <h3>Create new project</h3>
            <p>Start a new FL Studio project repository</p>
            <Button variant="primary">Create Repository</Button>
          </CreateRepoCard>
        </RepoGrid>
      </DashboardContainer>
    </DashboardLayout>
  );
};

export default Dashboard; 