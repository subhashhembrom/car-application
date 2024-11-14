// src/pages/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const token = localStorage.getItem('token'); // Retrieve token from localStorage
  const navigate = useNavigate();

  // If no token is found, redirect to login page
  if (!token) {
    navigate('/login'); // Redirect to login if no token
    return null; // Prevent rendering the page
  }

  return (
    <div className="home-page">
      <h1>Welcome to the Home Page</h1>
      <p className="subHeading">This is a protected page, visible only to authenticated users.</p>

      <div className="button-container">
        {/* Navigate to Product List */}
        <button className='buttons' onClick={() => navigate('/productList')}>View Product List</button>

        {/* Navigate to Product Creation */}
        <button className='buttons' onClick={() => navigate('/productCreation')}>Create Product</button>

        {/* Navigate to Product Details (you can use a dynamic ID for product details page) */}
        <button className='buttons' onClick={() => navigate('/productDetails/1')}>Product Details</button> {/* Use dynamic ID as needed */}
      </div>

      <button className='logOut'
        onClick={() => {
          localStorage.removeItem('token'); // Remove token on logout
          navigate('/login'); // Redirect to login
        }}
      >
        Log Out
      </button>
    </div>
  );
};

export default HomePage;
