import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import useAuthStore from './stores/authStore';

// Placeholder Pages
const Dashboard = () => <div style={{ marginLeft: '5rem', padding: '2rem' }}><h1>Dashboard</h1></div>;
const Login = () => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><h1>Login Page</h1></div>;

const App = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <Router>
      <div className="app-container">
        {isAuthenticated && <Navbar />}
        <main>
          <Routes>
            <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
            <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
