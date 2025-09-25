import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Categories from './components/Categories';
import Transactions from './components/Transactions';
import Login from './components/Login';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
      setUserEmail(user);
    }
  }, []);

  const handleLogin = (email) => {
    setIsLoggedIn(true);
    setUserEmail(email);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserEmail('');
  };

  return (
    <Router>
      <div className="App">
        {/* Navbar */}
        {isLoggedIn && <Navbar />}

        {/* Profile top-right */}
        {isLoggedIn && (
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            padding: '10px 20px',
            backgroundColor: '#2a9d8f',
            color: 'white'
          }}>
            <span style={{ marginRight: '20px' }}>{userEmail}</span>
            <button 
              onClick={handleLogout} 
              style={{
                padding: '5px 10px',
                borderRadius: '5px',
                cursor: 'pointer',
                backgroundColor: '#264653',
                color: 'white',
                border: 'none'
              }}
            >
              Logout
            </button>
          </div>
        )}

        <main>
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            {isLoggedIn ? (
              <>
                <Route path="/" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/transactions" element={<Transactions />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/login" />} />
            )}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
