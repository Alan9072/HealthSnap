import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import { GoGitCompare } from "react-icons/go";
import { IoScan } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { GoHistory } from "react-icons/go";

function Home() {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate(); // Add navigation

  useEffect(() => {
    const cachedUser = sessionStorage.getItem("userData");
    if (cachedUser) {

      console.log("Using cached user data...");
      setUserData(JSON.parse(cachedUser)); // Use cached data instantly
    } 
  }, []);

  return (
    <div className={styles.homeDiv}>
      <div className={styles.productTitle}>
        <div className={styles.logo}></div>
      </div>
      <div className={styles.homeContent}>
        <div className={styles.name}>
          <p>Hii, {userData.name}</p>
          <p>Want to scan a new Product ?</p>
        </div>
        <div className={styles.tipBox}>
          <div className={styles.tagline}>
            <p>Health starts with a Scan!</p>
            <p>
              Quickly check food quality, allergens, and health impact before
              you buy.
            </p>
            <p>Scan Now</p>
          </div>
          <div className={styles.img}></div>
        </div>
        <div className={styles.navBox}>
          <div className={styles.eachBox}>
            <div className={styles.iconBox}>
              <div className={styles.icon}>
                <IoScan size={17} color="white"/>
              </div>
            </div>
            <div className={styles.content}>
              <p>Scan</p>
              <p> Instantly scan barcodes for product details.</p>
            </div>
          </div>
          <div className={styles.eachBox}>
            <div className={styles.iconBox}>
              <div className={styles.icon}>
                <CgProfile size={17} color="white"/>
              </div>
            </div>
            <div className={styles.content}>
              <p>Profile</p>
              <p>View and manage your health preferences.</p>
            </div>
          </div>
          <div className={styles.eachBox}>
            <div className={styles.iconBox}>
              <div className={styles.icon}>
                <GoHistory size={17} color="white"/>
              </div>
            </div>
            <div className={styles.content}>
              <p>History</p>
              <p>Track previously scanned food items.</p>
            </div>
          </div>
          <div className={styles.eachBox}>
            <div className={styles.iconBox}>
              <div className={styles.icon}>
                <GoGitCompare size={17} color="white"/>
              </div>
            </div>
            <div className={styles.content}>
              <p>Compare</p>
              <p>Compare products for better choices.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
