// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Menu from './components/layout/Menu';
import axios from 'axios';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Obtener datos del usuario a partir del token
      axios.get('http://localhost:3000/auth/user', { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          setIsAuthenticated(true);
          setUser(response.data.user);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, []);

  const handleLogin = (token, user) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    setUser(user);
  };

  return (
    <Router>
      <div className="App">
        <Menu user={isAuthenticated ? user : null} />
        <div className="content">
          <div className="page-content">
            <Routes>
              <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
              <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
              <Route path="/register" element={<LoginPage onLogin={handleLogin} />} />
              <Route path="/home" element={<HomePage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
