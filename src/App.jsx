import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import EmergencyDemo from './pages/EmergencyDemo';
import Dashboard from './pages/Dashboard';
import Footer from './components/Footer';
import MaritimeChatbot from './components/MaritimeChatbot';
import DarkModeToggle from './components/DarkModeToggle';
import { SafetyProvider } from './contexts/SafetyContext';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <SafetyProvider>
      <Router>
        <div className={`App ${isDarkMode ? 'dark' : ''}`}>
          <Navigation />
          <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/emergency-demo" element={<EmergencyDemo isDarkMode={isDarkMode} />} />
            </Routes>
          </main>
          <MaritimeChatbot />
          <Footer />
        </div>
      </Router>
    </SafetyProvider>
  );
}

export default App;