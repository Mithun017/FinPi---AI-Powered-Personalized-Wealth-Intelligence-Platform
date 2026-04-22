import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import Goals from './pages/Goals';
import AIChat from './pages/AIChat';
import Login from './pages/Login';
import useAuthStore from './stores/authStore';

// Placeholder Pages
const Settings = () => <div style={{ marginLeft: '5rem', padding: '2rem' }}><h1>Settings</h1></div>;

const App = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <Router>
      <div className="app-container">
        <Toaster position="top-right" toastOptions={{ style: { background: '#1e293b', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' } }} />
        {isAuthenticated && <Navbar />}
        <main>
          <Routes>
            <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
            <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/portfolio" element={isAuthenticated ? <Portfolio /> : <Navigate to="/login" />} />
            <Route path="/goals" element={isAuthenticated ? <Goals /> : <Navigate to="/login" />} />
            <Route path="/ai-chat" element={isAuthenticated ? <AIChat /> : <Navigate to="/login" />} />
            <Route path="/settings" element={isAuthenticated ? <Settings /> : <Navigate to="/login" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
