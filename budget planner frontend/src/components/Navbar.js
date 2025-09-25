import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

// Small logo for navbar
const logo = "https://www.istockphoto.com/illustrations/tree-logo"; // use same image as Login.js

function Navbar() {
  const navigate = useNavigate();
  const user = localStorage.getItem('user');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login'); // redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Budget Planner Logo" className="navbar-logo" />
        <h1>Budget Planner</h1>
      </div>

      <div className="profile-section">
        {user ? (
          <span>Welcome, {user}</span>
        ) : (
          <span>Not logged in</span>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
