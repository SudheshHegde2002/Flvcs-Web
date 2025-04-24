import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import GlobalStyle from './styles/GlobalStyle';
import { ThemeProvider } from './context/ThemeContext';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Repository from './pages/Repository';
import Repositories from './pages/Repositories';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import LoginFromClient from './pages/LoginFromClient';
import DownloadClient from './pages/DownloadClient';

// Components
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <Router>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/login-from-client" element={<LoginFromClient />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/download-client" element={<DownloadClient />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/repositories" element={
              <ProtectedRoute>
                <Repositories />
              </ProtectedRoute>
            } />
            <Route path="/repository/:id" element={
              <ProtectedRoute>
                <Repository />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </Router>
    </ThemeProvider>
  );
}

export default App;
