import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FiFileText, FiFolder, FiDownload, FiUpload, 
  FiStar, FiInfo, FiClock, FiEdit3, FiTrash2, FiCopy, FiCheck,
  FiGitBranch, FiGitCommit, FiAlertTriangle, FiChevronDown
} from 'react-icons/fi';

import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

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

const EmptyRepoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  
  svg {
    font-size: 4rem;
    color: ${({ theme }) => theme.colors.textLight};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
  
  h3 {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  p {
    color: ${({ theme }) => theme.colors.textLight};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    max-width: 600px;
  }
`;

const ConnectionStringContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const ConnectionStringLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const ConnectionStringBox = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.inputBg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  code {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: 'Roboto Mono', monospace;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const BranchSelector = styled.div`
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const BranchButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.cardBg};
  }
`;

const BranchDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 240px;
  margin-top: ${({ theme }) => theme.spacing.xs};
  background-color: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
  z-index: 10;
  overflow: hidden;
  display: ${({ isOpen }) => isOpen ? 'block' : 'none'};
`;

const BranchItem = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background: none;
  border: none;
  text-align: left;
  color: ${({ theme, isActive }) => isActive ? theme.colors.primary : theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.md};
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme, isActive }) => isActive ? theme.colors.primary : theme.colors.textLight};
  }
`;

const CommitContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const CommitItem = styled(Card)`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg};
  gap: ${({ theme }) => theme.spacing.lg};
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const CommitIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${({ theme }) => `${theme.colors.primary}15`};
  flex-shrink: 0;
  
  svg {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.5rem;
  }
`;

const CommitDetails = styled.div`
  flex: 1;
  overflow: hidden;
  
  h3 {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    margin: 0;
    margin-bottom: ${({ theme }) => theme.spacing.xs};
    color: ${({ theme }) => theme.colors.text};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  p {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    margin: 0;
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const SettingsSection = styled.div`
  h2 {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const DangerZone = styled(Card)`
  border: 1px solid ${({ theme }) => theme.colors.error};
  
  h2 {
    color: ${({ theme }) => theme.colors.error};
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const DangerItem = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
  
  h3 {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
    color: ${({ theme }) => theme.colors.text};
  }
  
  p {
    color: ${({ theme }) => theme.colors.textLight};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
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

const Repository = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [repository, setRepository] = useState(null);
  const [files, setFiles] = useState([]);
  const [activeTab, setActiveTab] = useState('files');
  const [currentPath, setCurrentPath] = useState('/');
  const [copySuccess, setCopySuccess] = useState(false);
  const copyTimeout = useRef(null);
  const [branches, setBranches] = useState(['main', 'development']);
  const [currentBranch, setCurrentBranch] = useState('main');
  const [isBranchDropdownOpen, setIsBranchDropdownOpen] = useState(false);
  const [commits, setCommits] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Simulating API call to get repository data
    const fetchRepository = async () => {
      try {
        // In a real app, we would fetch from an API
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Create an empty repository
        setRepository({
          id,
          name: `repository-${id}`,
          description: 'This is a new repository for FL Studio projects',
          stars: 0,
          file_count: 0,
          size: '0 KB',
          updated_at: new Date().toISOString(),
          language: 'FL Studio'
        });
        
        // Empty files array for new repository
        setFiles([]);
        
        // Generate mock commits for a new repository
        setCommits([
          {
            id: 'c1',
            message: 'Initial commit',
            author: 'System',
            date: new Date().toISOString(),
            hash: '8f7d3a2'
          }
        ]);
        
      } catch (error) {
        console.error('Error fetching repository:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRepository();
    
    return () => {
      if (copyTimeout.current) {
        clearTimeout(copyTimeout.current);
      }
    };
  }, [id]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsBranchDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
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

  const copyConnectionString = () => {
    const connectionString = `flvcs://${repository.name}@flvcs.com/${id}`;
    navigator.clipboard.writeText(connectionString).then(() => {
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

  const toggleBranchDropdown = () => {
    setIsBranchDropdownOpen(!isBranchDropdownOpen);
  };

  const handleBranchChange = (branch) => {
    setCurrentBranch(branch);
    setIsBranchDropdownOpen(false);
  };

  const handleDeleteRepository = () => {
    if (window.confirm('Are you sure you want to delete this repository? This action cannot be undone.')) {
      // In a real app, we would call an API to delete the repository
      console.log('Deleting repository:', repository.id);
      navigate('/dashboard');
    }
  };

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
        
        {activeTab === 'files' && (
          <>
            <BranchSelector ref={dropdownRef}>
              <BranchButton onClick={toggleBranchDropdown}>
                <FiGitBranch />
                {currentBranch}
                <FiChevronDown />
              </BranchButton>
              <BranchDropdown isOpen={isBranchDropdownOpen}>
                {branches.map(branch => (
                  <BranchItem 
                    key={branch}
                    isActive={branch === currentBranch}
                    onClick={() => handleBranchChange(branch)}
                  >
                    <FiGitBranch />
                    {branch}
                  </BranchItem>
                ))}
              </BranchDropdown>
            </BranchSelector>
            
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
              
              {files.length === 0 ? (
                <EmptyRepoContainer>
                  <FiFolder />
                  <h3>This repository is empty</h3>
                  <p>
                    Get started by uploading your FL Studio project files. You can drag and drop 
                    files or use the upload button above.
                  </p>
                  
                  <ConnectionStringContainer>
                    <ConnectionStringLabel>Repository Connection String</ConnectionStringLabel>
                    <ConnectionStringBox>
                      <code>flvcs://{repository.name}@flvcs.com/{id}</code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={copyConnectionString}
                      >
                        {copySuccess ? <FiCheck color="green" /> : <FiCopy />}
                      </Button>
                    </ConnectionStringBox>
                    <Button variant="primary" onClick={copyConnectionString}>
                      {copySuccess ? 'Copied!' : 'Copy Connection String'}
                    </Button>
                  </ConnectionStringContainer>
                </EmptyRepoContainer>
              ) : (
                <FilesList>
                  {files.map((file, index) => (
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
                  ))}
                </FilesList>
              )}
            </FilesContainer>
          </>
        )}
        
        {activeTab === 'commits' && (
          <CommitContainer>
            <BranchSelector ref={dropdownRef}>
              <BranchButton onClick={toggleBranchDropdown}>
                <FiGitBranch />
                {currentBranch}
                <FiChevronDown />
              </BranchButton>
              <BranchDropdown isOpen={isBranchDropdownOpen}>
                {branches.map(branch => (
                  <BranchItem 
                    key={branch}
                    isActive={branch === currentBranch}
                    onClick={() => handleBranchChange(branch)}
                  >
                    <FiGitBranch />
                    {branch}
                  </BranchItem>
                ))}
              </BranchDropdown>
            </BranchSelector>
            
            {commits.length === 0 ? (
              <Card>
                <EmptyRepoContainer>
                  <FiGitCommit />
                  <h3>No commits yet</h3>
                  <p>
                    This branch doesn't have any commits yet. Upload files to make your first commit.
                  </p>
                </EmptyRepoContainer>
              </Card>
            ) : (
              commits.map((commit, index) => (
                <CommitItem
                  key={commit.id}
                  as={motion.div}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <CommitIcon>
                    <FiGitCommit />
                  </CommitIcon>
                  <CommitDetails>
                    <h3>{commit.message}</h3>
                    <p>
                      {commit.author} committed on {formatDate(commit.date)} • {commit.hash}
                    </p>
                  </CommitDetails>
                </CommitItem>
              ))
            )}
          </CommitContainer>
        )}
        
        {activeTab === 'settings' && (
          <SettingsContainer>
            <SettingsSection>
              <h2>Repository Settings</h2>
              <Card>
                <Form style={{ padding: '24px' }}>
                  <div>
                    <Label htmlFor="repo-name">Repository Name</Label>
                    <Input
                      id="repo-name"
                      name="name"
                      value={repository.name}
                      disabled
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="repo-description">Description</Label>
                    <TextArea
                      id="repo-description"
                      name="description"
                      value={repository.description}
                      placeholder="Add a description for your repository"
                    />
                  </div>
                  
                  <FormActions>
                    <Button variant="primary">
                      Save Changes
                    </Button>
                  </FormActions>
                </Form>
              </Card>
            </SettingsSection>
            
            <SettingsSection>
              <DangerZone>
                <div style={{ padding: '24px' }}>
                  <h2>
                    <FiAlertTriangle /> Danger Zone
                  </h2>
                  
                  <DangerItem>
                    <h3>Delete this repository</h3>
                    <p>
                      Once you delete a repository, there is no going back. Please be certain.
                    </p>
                    <Button 
                      variant="error"
                      onClick={handleDeleteRepository}
                    >
                      <FiTrash2 /> Delete Repository
                    </Button>
                  </DangerItem>
                </div>
              </DangerZone>
            </SettingsSection>
          </SettingsContainer>
        )}
      </RepoContainer>
    </DashboardLayout>
  );
};

export default Repository; 