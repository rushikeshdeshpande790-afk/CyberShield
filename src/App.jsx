import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { SimulationProvider } from './contexts/SimulationContext';

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

function App() {
  return (
    <SimulationProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/steganography" element={<SteganographyLab />} />
            <Route path="/encryption" element={<EncryptionLab />} />
            <Route path="/hacking" element={<EthicalHackingLab />} />
            <Route path="/reports" element={<ReportGenerator />} />
            <Route path="/docs" element={<Documentation />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </MainLayout>
      </Router>
    </SimulationProvider>
  );
}

export default App;
