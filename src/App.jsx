import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { SimulationProvider } from './contexts/SimulationContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Pages
import Welcome from './pages/Welcome';
import Overview from './pages/Overview';
import Dashboard from './pages/Dashboard';
import SteganographyLab from './pages/SteganographyLab';
import EncryptionLab from './pages/EncryptionLab';
import EthicalHackingLab from './pages/EthicalHackingLab';
import ReportGenerator from './pages/ReportGenerator';
import Documentation from './pages/Documentation';
import About from './pages/About';
import LoginPage from './pages/LoginPage';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <SimulationProvider>
        <Router>
          <Routes>
            {/* Public Route */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Routes */}
            <Route path="/*" element={<MainLayout><Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/steganography" element={<ProtectedRoute><SteganographyLab /></ProtectedRoute>} />
              <Route path="/encryption" element={<ProtectedRoute><EncryptionLab /></ProtectedRoute>} />
              <Route path="/hacking" element={<ProtectedRoute><EthicalHackingLab /></ProtectedRoute>} />
              <Route path="/reports" element={<ProtectedRoute><ReportGenerator /></ProtectedRoute>} />
              <Route path="/docs" element={<Documentation />} />
              <Route path="/about" element={<About />} />
            </Routes></MainLayout>} />

          </Routes>
        </Router>
      </SimulationProvider>
    </AuthProvider>
  );
}

export default App;

