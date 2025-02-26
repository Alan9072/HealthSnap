import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./UserProfile.module.css";
import { FaUserEdit } from "react-icons/fa";
import Loading from "../../components/Loading/Loading";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // useEffect(() => {
  //   document
  //     .querySelector('meta[name="theme-color"]')
  //     .setAttribute("content", "rgb(46, 156, 46)");
  //   return () => {
  //     document
  //       .querySelector('meta[name="theme-color"]')
  //       .setAttribute("content", "#ffffff");
  //   };
  // }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log("Fetching user data...");
        const res = await axios.get(`${backendURL}/me`, {
          withCredentials: true,
        });
        setUser(res.data.me);
        console.log("User data fetched:", res.data.me);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    setTimeout(() => {
      fetchUserData();
    }, 1000);

  }, []);
  if (loading) {
    return (
      <div className={styles.loading}>
        <Loading height={80} width={80} loop={true} autoplay={true} />
      </div>
    );
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.toptopWrapper}>
        <p>My Profile</p>
        <div className={styles.topWrapper}>
          <div className={styles.profileHeader}>
            <div>
              <h2 className={styles.profileName}>{user.name || "N/A"}</h2>
              <p className={styles.profileEmail}>
                {user.username || "N/A"}{" "}
                <small>{user.gender === "Male" ? "(M)" : "(F)"}</small>{" "}
              </p>
            </div>
            <div
              className={styles.profileEdit}
              onClick={() => navigate("/userupdate")}
            >
              <FaUserEdit size={15} color="white" />
              <p>Edit</p>
            </div>
          </div>
          <div className={styles.userDetailsWrapper}>
            <div className={styles.smallUserDetails}>
              <div>
                <strong>Age:</strong> {user.age || "N/A"}
              </div>
              <div>
                <strong>Weight:</strong> {user.weight || "N/A "}kg
              </div>
              <div>
                <strong>Height:</strong> {user.height || "N/A "}cm
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.subWrapper}>
        <div className={styles.profileSection}>
          <label>Diet Type</label>
          <p className={styles.profInfo}>{user.dietType || "N/A"}</p>
        </div>
        <div className={styles.profileSection}>
          <label>Allergies</label>
          <p className={styles.profInfo}>{user.allergies || "N/A"}</p>
        </div>
        <div className={styles.profileSection}>
          <label>Intolerances</label>
          <p className={styles.profInfo}>{user.intolerances || "N/A"}</p>
        </div>
        <div className={styles.profileSection}>
          <label>Pre-existing Conditions</label>
          <p className={styles.profInfo}>
            {user.preExistingConditions || "N/A"}
          </p>
        </div>
        <div className={styles.profileSection}>
          <label>Current Medications</label>
          <p className={styles.profInfo}>{user.currentMedications || "N/A"}</p>
        </div>
        <div className={styles.profileSection}>
          <label>Medical History</label>
          <p className={styles.profInfo}>{user.medicalHistory || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
