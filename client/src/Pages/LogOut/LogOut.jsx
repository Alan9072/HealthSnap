import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import styles from './LogOut.module.css';

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the JWT token from cookies
    Cookies.remove('token');

    // Redirect to the login page
    navigate('/login');
  };

  return (
    <div className={styles.logOutBox}>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
