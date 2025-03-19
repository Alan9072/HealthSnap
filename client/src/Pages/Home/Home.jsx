import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import { GoGitCompare } from "react-icons/go";
import { IoScan } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { GoHistory } from "react-icons/go";
import Loading from "../../components/Loading/Loading";

function Home() {
  const [userData, setUserData] = useState({});
  const [Loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Add navigation
  

  useEffect(() => {
    const cachedUser = sessionStorage.getItem("userData");
    if (cachedUser) {
      setLoading(false);
      console.log("Using cached user data...");
      setUserData(JSON.parse(cachedUser)); // Use cached data instantly
    } else{
      
      const fetchUserData = async () => {
        try {
          console.log("Fetching user data...");
          const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/me`, {
            withCredentials: true,
          });
          setUserData(res.data.me);
          sessionStorage.setItem("userData", JSON.stringify(res.data.me));
          console.log("User data fetched:", res.data.me);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }finally{
          setLoading(false);
        }
      };

      fetchUserData();

    }
  }, []);

  return (
    <div className={styles.homeDiv}>
      <div className={styles.productTitle}>
        <div className={styles.logo}></div>
      </div>
      <div className={styles.homeContent}>
        <div className={styles.name}>
          <p>Hii, {Loading ? "User" : userData.name}</p>
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
