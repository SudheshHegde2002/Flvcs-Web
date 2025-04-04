import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FiFileText, FiFolder, FiDownload, FiUpload, 
  FiStar, FiInfo, FiClock, FiEdit3, FiTrash2
} from 'react-icons/fi';

import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const RepoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const RepoHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RepoTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

const RepoDescription = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.md};
  margin: 0;
  line-height: 1.5;
`;

const StatsBar = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.lg};
  
  div {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.xs};
    color: ${({ theme }) => theme.colors.textLight};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    
    svg {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Tab = styled.button`
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  background: none;
  border: none;
  border-bottom: 2px solid ${({ theme, active }) => 
    active ? theme.colors.primary : 'transparent'};
  color: ${({ theme, active }) => 
    active ? theme.colors.primary : theme.colors.textLight};
  font-weight: ${({ active }) => active ? 600 : 400};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const FilesContainer = styled(Card)`
  overflow: hidden;
`;

const FileExplorerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const BreadcrumbNav = styled.div`
  display: flex;
  align-items: center;
  
  button {
    background: none;
    border: none;
    color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    
    &:hover {
      background-color: ${({ theme }) => `${theme.colors.primary}10`};
    }
  }
  
  span {
    margin: 0 ${({ theme }) => theme.spacing.xs};
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

const FileExplorerActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

const FilesList = styled.div`
  
`;

const FileItem = styled(motion.div)`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: all ${({ theme }) => theme.transitions.fast};
  cursor: pointer;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const FileIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme, isFolder }) => 
    isFolder ? `${theme.colors.primary}15` : `${theme.colors.accent}15`};
  margin-right: ${({ theme }) => theme.spacing.md};
  
  svg {
    color: ${({ theme, isFolder }) => 
      isFolder ? theme.colors.primary : theme.colors.accent};
    font-size: 1.2rem;
  }
`;

const FileDetails = styled.div`
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

const FileActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  opacity: 0;
  transition: opacity ${({ theme }) => theme.transitions.fast};
  
  ${FileItem}:hover & {
    opacity: 1;
  }
`;

const FileSize = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textLight};
  margin-right: ${({ theme }) => theme.spacing.lg};
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textLight};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme, variant }) => 
      variant === 'danger' 
        ? theme.colors.error 
        : theme.colors.primary};
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  text-align: center;
  
  svg {
    font-size: 3rem;
    color: ${({ theme }) => theme.colors.textLight};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
  
  h3 {
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  p {
    color: ${({ theme }) => theme.colors.textLight};
    max-width: 400px;
    margin-bottom: ${({ theme }) => theme.spacing.xl};
  }
`;

const Repository = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [repository, setRepository] = useState(null);
  const [files, setFiles] = useState([]);
  const [activeTab, setActiveTab] = useState('files');
  const [currentPath, setCurrentPath] = useState('/');

  useEffect(() => {
    // Simulating API call to get repository details
    const fetchData = async () => {
      try {
        // In a real app, we would fetch from an API
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock repository data
        setRepository({
          id,
          name: id === '1' ? 'summer-edm-project' : 'lofi-beats-collection',
          description: id === '1' 
            ? 'Progressive house and future bass tracks with vocal samples for summer playlist.' 
            : 'Chill lo-fi beats with jazz samples and vinyl effects for study/relaxation.',
          created_at: '2023-01-15T09:20:00Z',
          updated_at: '2023-04-01T10:30:00Z',
          file_count: id === '1' ? 24 : 18,
          size: id === '1' ? '1.2GB' : '850MB',
          language: 'FL Studio',
          stars: 5
        });
        
        // Mock files data
        setFiles([
          {
            id: 1,
            name: 'Projects',
            type: 'folder',
            size: '--',
            updated_at: '2023-03-28T14:30:00Z'
          },
          {
            id: 2,
            name: 'Samples',
            type: 'folder',
            size: '--',
            updated_at: '2023-03-25T11:20:00Z'
          },
          {
            id: 3,
            name: 'main-project.flp',
            type: 'file',
            size: '15.2MB',
            updated_at: '2023-04-01T10:30:00Z'
          },
          {
            id: 4,
            name: 'vocals.wav',
            type: 'file',
            size: '124.5MB',
            updated_at: '2023-03-20T09:15:00Z'
          },
          {
            id: 5,
            name: 'bass.wav',
            type: 'file',
            size: '56.8MB',
            updated_at: '2023-03-18T16:45:00Z'
          },
          {
            id: 6,
            name: 'mastering-chain.fst',
            type: 'file',
            size: '2.1MB',
            updated_at: '2023-03-15T13:10:00Z'
          },
          {
            id: 7,
            name: 'README.md',
            type: 'file',
            size: '4KB',
            updated_at: '2023-03-10T08:30:00Z'
          }
        ]);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleFileClick = (file) => {
    if (file.type === 'folder') {
      setCurrentPath(prev => `${prev}${file.name}/`);
    } else {
      // Handle file click (preview or download)
      console.log('File clicked:', file);
    }
  };

  const navigateTo = (path) => {
    setCurrentPath(path);
  };

  const pathParts = currentPath.split('/').filter(Boolean);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div>Loading...</div>
      </DashboardLayout>
    );
  }

  if (!repository) {
    return (
      <DashboardLayout>
        <div>Repository not found</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <RepoContainer>
        <RepoHeader>
          <TitleRow>
            <RepoTitle>{repository.name}</RepoTitle>
            <ActionsContainer>
              <Button variant="outline" size="md">
                <FiStar /> Star
              </Button>
              <Button variant="primary" size="md">
                <FiDownload /> Download
              </Button>
            </ActionsContainer>
          </TitleRow>
          
          <RepoDescription>{repository.description}</RepoDescription>
          
          <StatsBar>
            <div>
              <FiStar />
              {repository.stars} stars
            </div>
            <div>
              <FiFileText />
              {repository.file_count} files
            </div>
            <div>
              <FiInfo />
              {repository.size}
            </div>
            <div>
              <FiClock />
              Updated on {formatDate(repository.updated_at)}
            </div>
          </StatsBar>
        </RepoHeader>
        
        <TabContainer>
          <Tab 
            active={activeTab === 'files'} 
            onClick={() => setActiveTab('files')}
          >
            Files
          </Tab>
          <Tab 
            active={activeTab === 'commits'} 
            onClick={() => setActiveTab('commits')}
          >
            Commits
          </Tab>
          <Tab 
            active={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </Tab>
        </TabContainer>
        
        <FilesContainer>
          <FileExplorerHeader>
            <BreadcrumbNav>
              <button onClick={() => navigateTo('/')}>
                {repository.name}
              </button>
              
              {pathParts.map((part, index) => (
                <React.Fragment key={index}>
                  <span>/</span>
                  <button onClick={() => navigateTo(`/${pathParts.slice(0, index + 1).join('/')}/`)}>
                    {part}
                  </button>
                </React.Fragment>
              ))}
            </BreadcrumbNav>
            
            <FileExplorerActions>
              <Button variant="outline" size="sm">
                <FiUpload /> Upload
              </Button>
              <Button variant="outline" size="sm">
                <FiFolder /> New Folder
              </Button>
            </FileExplorerActions>
          </FileExplorerHeader>
          
          <FilesList>
            {files.length > 0 ? (
              files.map((file, index) => (
                <FileItem 
                  key={file.id}
                  onClick={() => handleFileClick(file)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <FileIcon isFolder={file.type === 'folder'}>
                    {file.type === 'folder' ? <FiFolder /> : <FiFileText />}
                  </FileIcon>
                  
                  <FileDetails>
                    <h3>{file.name}</h3>
                    <p>Updated on {formatDate(file.updated_at)}</p>
                  </FileDetails>
                  
                  <FileSize>{file.size}</FileSize>
                  
                  <FileActions>
                    <IconButton>
                      <FiDownload />
                    </IconButton>
                    <IconButton>
                      <FiEdit3 />
                    </IconButton>
                    <IconButton variant="danger">
                      <FiTrash2 />
                    </IconButton>
                  </FileActions>
                </FileItem>
              ))
            ) : (
              <EmptyState>
                <FiFolder />
                <h3>This folder is empty</h3>
                <p>
                  Upload files or create a new folder to start organizing your project
                </p>
                <Button variant="primary">
                  <FiUpload /> Upload Files
                </Button>
              </EmptyState>
            )}
          </FilesList>
        </FilesContainer>
      </RepoContainer>
    </DashboardLayout>
  );
};

export default Repository; 