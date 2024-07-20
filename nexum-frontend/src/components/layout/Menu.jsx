import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

const Menu = ({ user, onLogout }) => {
  return (
    <nav className="menu">
      <ul>
        <li><Link to="/">Home</Link></li>
        {!user ? (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        ) : (
          <li><button onClick={onLogout}>Logout</button></li>
        )}
      </ul>

      <div className="search-bar">
        <input type="text" placeholder="Search for products, services..." />
      </div>

      {user ? (
        <div className="user-profile">
          <img src={user.profilePicture} alt="User" className="user-image" />
          <div className="user-info">
            <span className="user-name">{user.nombre}</span>
            <span className="user-handle">@{user.handle}</span>
          </div>
        </div>
      ) : null}
    </nav>
  );
};

export default Menu;
