import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import styles from "./LogOut.module.css";

const backendURL = import.meta.env.VITE_BACKEND_URL;

function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${backendURL}/logout`, {}, { withCredentials: true }); // Call backend logout
      Cookies.remove("token"); // Remove token from frontend cookies
      sessionStorage.clear(); // Clear all session storage
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className={styles.logOutBox}>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
