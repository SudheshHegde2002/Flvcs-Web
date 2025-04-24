import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FiFolder, FiGitCommit, FiClock, FiDownload, FiChevronRight,
  FiMusic, FiHeadphones, FiAlertCircle
} from 'react-icons/fi';

import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { listProjects } from '../utils/data_utils';

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

const RepositoriesContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  height: calc(100vh - 180px);
  overflow: hidden;
`;

const RepoListContainer = styled(Card)`
  flex: 1;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const RepoListHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-weight: 600;
`;

const RepoList = styled.div`
  overflow-y: auto;
  flex: 1;
`;

const RepoItem = styled(motion.div)`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: all ${({ theme }) => theme.transitions.fast};
  cursor: pointer;
  background-color: ${({ theme, active }) => 
    active ? `${theme.colors.primary}10` : 'transparent'};
  
  &:hover {
    background-color: ${({ theme, active }) => 
      active ? `${theme.colors.primary}15` : theme.colors.background};
  }
`;

const RepoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => `${theme.colors.primary}15`};
  margin-right: ${({ theme }) => theme.spacing.md};
  
  svg {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.2rem;
  }
`;

const RepoDetails = styled.div`
  flex: 1;
  
  h3 {
    font-size: ${({ theme }) => theme.fontSizes.md};
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
  }
  
  p {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    margin: 0;
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

const ChevronIcon = styled(FiChevronRight)`
  color: ${({ theme }) => theme.colors.textLight};
  opacity: ${({ active }) => active ? 1 : 0};
  transition: opacity ${({ theme }) => theme.transitions.fast};
  
  ${RepoItem}:hover & {
    opacity: 1;
  }
`;

const CommitsContainer = styled(Card)`
  flex: 2;
  display: ${({ visible }) => visible ? 'flex' : 'none'};
  flex-direction: column;
  overflow: hidden;
`;

const CommitsHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CommitsList = styled.div`
  overflow-y: auto;
  flex: 1;
`;

const CommitItem = styled(motion.div)`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: all ${({ theme }) => theme.transitions.fast};
  cursor: pointer;
  background-color: ${({ theme, active }) => 
    active ? `${theme.colors.primary}10` : 'transparent'};
  
  &:hover {
    background-color: ${({ theme, active }) => 
      active ? `${theme.colors.primary}15` : theme.colors.background};
  }
`;

const CommitIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => `${theme.colors.accent}15`};
  margin-right: ${({ theme }) => theme.spacing.md};
  
  svg {
    color: ${({ theme }) => theme.colors.accent};
    font-size: 1.2rem;
  }
`;

const CommitDetails = styled.div`
  flex: 1;
  
  h3 {
    font-size: ${({ theme }) => theme.fontSizes.md};
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
  }
  
  p {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    margin: 0;
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

const CommitActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const TimeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  
  svg {
    font-size: 1rem;
  }
`;

const EmptyStateContainer = styled(Card)`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
`;

const MusicNotes = styled(motion.div)`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Note = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 60px;
  border-radius: 50%;
  background-color: ${({ theme, index }) => 
    `${theme.colors.primary}${10 + (index * 10)}`};
`;

const EmptyStateTitle = styled(motion.h2)`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const EmptyStateText = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.textLight};
  max-width: 400px;
`;

const LoadingText = styled.div`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.md};
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const ErrorMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.colors.error};
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  
  svg {
    font-size: 2rem;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

// Mock data for commits
const mockCommits = {
  'test': [
    { id: 101, message: 'Initial commit', author: 'John Doe', date: '2023-10-15T14:30:00Z' },
    { id: 102, message: 'Add authentication', author: 'John Doe', date: '2023-10-14T10:15:00Z' },
    { id: 103, message: 'Fix login bug', author: 'Jane Smith', date: '2023-10-13T16:45:00Z' },
  ],
  'test2': [
    { id: 201, message: 'Initial setup', author: 'Jane Smith', date: '2023-10-10T09:45:00Z' },
    { id: 202, message: 'Add portfolio projects', author: 'Jane Smith', date: '2023-10-08T14:20:00Z' },
  ]
};

const Repositories = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCommit, setSelectedCommit] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const projectsData = await listProjects();
        // Transform the project names into objects with IDs
        const formattedProjects = projectsData.map((name, index) => ({
          id: name, // Using name as ID since that's what we'll need for commits
          name: name,
          lastUpdated: new Date().toISOString() // Placeholder for now
        }));
        setProjects(formattedProjects);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
        setError(err.message || 'Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setSelectedCommit(null);
  };
  
  const handleCommitClick = (commit) => {
    setSelectedCommit(commit);
  };
  
  const handleDownload = (commit) => {
    // In a real app, this would trigger the API call to download the commit files
    console.log(`Downloading files for commit ${commit.id}`);
    alert(`Download started for commit: ${commit.message}`);
  };
  
  const renderProjectsList = () => {
    if (loading) {
      return <LoadingText>Loading projects...</LoadingText>;
    }
    
    if (error) {
      return (
        <ErrorMessage>
          <FiAlertCircle />
          <p>{error}</p>
        </ErrorMessage>
      );
    }
    
    if (projects.length === 0) {
      return <LoadingText>No projects found</LoadingText>;
    }
    
    return (
      <RepoList>
        {projects.map(project => (
          <RepoItem 
            key={project.id}
            active={selectedProject && selectedProject.id === project.id}
            onClick={() => handleProjectClick(project)}
            whileTap={{ scale: 0.98 }}
          >
            <RepoIcon>
              <FiFolder />
            </RepoIcon>
            <RepoDetails>
              <h3>{project.name}</h3>
              {project.lastUpdated && (
                <p>Updated {formatDate(project.lastUpdated)}</p>
              )}
            </RepoDetails>
            <ChevronIcon active={selectedProject && selectedProject.id === project.id ? 1 : 0} />
          </RepoItem>
        ))}
      </RepoList>
    );
  };
  
  return (
    <DashboardLayout>
      <PageContainer>
        <PageHeader>
          <PageTitle>My Repositories</PageTitle>
        </PageHeader>
        
        <RepositoriesContainer>
          <RepoListContainer>
            <RepoListHeader>Projects</RepoListHeader>
            {renderProjectsList()}
          </RepoListContainer>
          
          {selectedProject ? (
            <CommitsContainer visible={true}>
              <CommitsHeader>
                <div>{selectedProject.name} - Commits</div>
              </CommitsHeader>
              <CommitsList>
                {mockCommits[selectedProject.id]?.map(commit => (
                  <CommitItem 
                    key={commit.id}
                    active={selectedCommit && selectedCommit.id === commit.id}
                    onClick={() => handleCommitClick(commit)}
                    whileTap={{ scale: 0.98 }}
                  >
                    <CommitIcon>
                      <FiGitCommit />
                    </CommitIcon>
                    <CommitDetails>
                      <h3>{commit.message}</h3>
                      <p>By {commit.author}</p>
                      <TimeInfo>
                        <FiClock /> {formatDate(commit.date)}
                      </TimeInfo>
                    </CommitDetails>
                    <CommitActions>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(commit);
                        }}
                      >
                        <FiDownload /> Download
                      </Button>
                    </CommitActions>
                  </CommitItem>
                )) || (
                  <LoadingText>No commits found for this project</LoadingText>
                )}
              </CommitsList>
            </CommitsContainer>
          ) : (
            <EmptyStateContainer>
              <MusicNotes>
                {[0, 1, 2].map((i) => (
                  <Note 
                    key={i} 
                    index={i}
                    initial={{ y: 0 }}
                    animate={{ 
                      y: [0, -15, 0],
                      rotate: [0, i % 2 === 0 ? 10 : -10, 0]
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity, 
                      delay: i * 0.3,
                      ease: "easeInOut" 
                    }}
                  >
                    {i % 3 === 0 ? <FiMusic /> : (i % 3 === 1 ? <FiHeadphones /> : <FiMusic />)}
                  </Note>
                ))}
              </MusicNotes>
              <EmptyStateTitle
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Ready to Orchestrate Your Code?
              </EmptyStateTitle>
              <EmptyStateText
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Choose a project from the left to browse its commits
                and download your harmonious code symphony.
              </EmptyStateText>
            </EmptyStateContainer>
          )}
        </RepositoriesContainer>
      </PageContainer>
    </DashboardLayout>
  );
};

export default Repositories; 