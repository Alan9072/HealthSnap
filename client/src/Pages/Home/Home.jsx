import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import { IoSearchOutline } from "react-icons/io5";
import Loading from '../../components/Loading/Loading';

function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Add navigation


  return (
    <div className={styles.homeDiv}>
      <div className={styles.productTitle}>
        <p>Foods By Categories</p>
      </div>
      <div className={styles.homeContent}>
        <div className={styles.name}>
          <p>Hii Alan</p>
          <p>Want to scan a new Product ?</p>
        </div>
        <div className={styles.tipBox}>
          <div className={styles.tagline}>
            <p>Health starts with a Scan!</p>
            <p>Quickly check food quality, allergens, and health impact before you buy.</p>
            <p>Scan Now</p> 
          </div>
          <div className={styles.img}></div>
        </div>
        <div className={styles.navBox}>
          <div className={styles.eachBox}></div>
          <div className={styles.eachBox}></div>
          <div className={styles.eachBox}></div>
          <div className={styles.eachBox}></div>
        </div>
      </div>
    </div>
  );
}

export default Home;
