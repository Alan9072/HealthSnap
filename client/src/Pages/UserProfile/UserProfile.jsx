import { useState } from "react";
import styles from "./UserProfile.module.css";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { IoChevronBackOutline, IoHomeOutline } from "react-icons/io5";
import { FaUserEdit } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { useEffect } from "react";
import axios from "axios";
import { IoMale } from "react-icons/io5";
import { IoFemaleSharp } from "react-icons/io5";

const UserProfile = () => {
  const [user, setUser] = useState({})
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  useEffect(() => {
    // Set theme color when component mounts
    document.querySelector('meta[name="theme-color"]').setAttribute("content", "rgb(46, 156, 46)");

    return () => {
      // Optionally reset theme color when unmounting
      document.querySelector('meta[name="theme-color"]').setAttribute("content", "#ffffff");
    };
  }, []);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log("Fetching user data...");
        const res = await axios.get("http://localhost:3000/me", {
          withCredentials: true, // Required to send cookies
        });
        console.log(res.data);
        setUser(res.data.me); // Store user data in state
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
  

  const handleEdit = () => {
    setEditedUser(user);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };
  const handleClose = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const handleSave = async () => {
    try {
      const res = await axios.put("http://localhost:3000/update-user", editedUser, {
        withCredentials: true,
      });
  
      setUser(res.data.updatedUser);
      setIsModalOpen(false);
      document.body.style.overflow = "auto";
    } catch (error) {
      console.error("Error updating user:", error.response?.data || error);
    }
  };

  return (
 
      <div className={styles.profileContainer}>
        <div className={styles.toptopWrapper}>
          <div className={styles.buttonDivWrap}>
            <div className={styles.buttonDiv}>
              <button className={styles.backButton}>
                <IoChevronBackOutline
                  size={24}
                  color={"green"}
                  onClick={() => navigate(-1)}
                />
              </button>
              <p>HS</p>
              <button className={styles.backButton}>
                <IoHomeOutline
                  size={24}
                  color={"green"}
                  onClick={() => navigate("/")}
                />
              </button>
            </div>
          </div>
          <div className={styles.topWrapper}>
            <div className={styles.profileHeader}>
              <div>
                <h2 className={styles.profileName}>
                  {user.name} <small>{user.gender === "Male" ? <IoMale size={14}  color="white"/> : <IoFemaleSharp size={14} color="white"/>}</small>
                </h2>
                <p className={styles.profileEmail}>{user.username}</p>
              </div>
              <div className={styles.profileEdit}>
                <div className={styles.edit} onClick={handleEdit}>
                  <FaUserEdit size={15} color="green" />
                  <p>Edit</p>
                </div>
              </div>
            </div>
            <div className={styles.userDetailsWrapper}>
              <div className={styles.smallUserDetails}>
                <div>
                  <strong>Age:</strong> {user.age || "N/A"}
                </div>
                <div>
                  <strong>Weight:</strong> {user.weight || "N/A " }kg
                </div>
                <div>
                  <strong>Height:</strong> {user.height || "N/A " }cm
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.subWrapper}>
          <div className={styles.profileSection}>
            <label>Diet Type</label>
            <p className={styles.profInfo}>{user.dietType}</p>
          </div>
          <div className={styles.profileSection}>
            <label>Allergies</label>
            <p className={styles.profInfo}>{user.allergies}</p>
          </div>
          <div className={styles.profileSection}>
            <label>Intolerances</label>
            <p className={styles.profInfo}>{user.intolerances}</p>
          </div>
          <div className={styles.profileSection}>
            <label>Pre-existing Conditions</label>
            <p className={styles.profInfo}>{user.preExistingConditions}</p>
          </div>
          <div className={styles.profileSection}>
            <label>Current Medications</label>
            <p className={styles.profInfo}>{user.currentMedications}</p>
          </div>
          <div className={styles.profileSection}>
            <label>Medical History</label>
            <p className={styles.profInfo}>{user.medicalHistory}</p>
          </div>
        </div>

        {/* Edit Profile Popup Modal */}
        {isModalOpen && (
          <div className={`${styles.modalOverlay} ${isModalOpen ? styles.show : ""}`}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <CgProfile size={30} color="green" />
                <p>Edit Profile</p>
                <IoClose size={24} color="grey" onClick={handleClose} />
              </div>
              <div className={styles.ahw}>
                <div className={styles.formGroup}>
                  <label>Age</label>
                  <input
                    type="number"
                    name="age"
                    value={editedUser.age}
                    onChange={handleChange}
                    placeholder="Enter Age"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Height (cm)</label>
                  <input
                    type="text"
                    name="height"
                    value={editedUser.height}
                    onChange={handleChange}
                    placeholder="Enter height"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Weight (kg)</label>
                  <input
                    type="text"
                    name="weight"
                    value={editedUser.weight}
                    onChange={handleChange}
                    placeholder="Enter weight"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Diet Type</label>
                <input
                  type="text"
                  name="dietType"
                  value={editedUser.dietType}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Allergies</label>
                <input
                  type="text"
                  name="allergies"
                  value={editedUser.allergies}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Intolerances</label>
                <input
                  type="text"
                  name="intolerances"
                  value={editedUser.intolerances}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Pre-existing Conditions</label>
                <input
                  type="text"
                  name="preExistingConditions"
                  value={editedUser.preExistingConditions}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Current Medications</label>
                <input
                  type="text"
                  name="currentMedications"
                  value={editedUser.currentMedications}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Medical History</label>
                <input
                  type="text"
                  name="medicalHistory"
                  value={editedUser.medicalHistory}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className={styles.buttonGroup}>
                <button onClick={handleSave} className={styles.saveButton}>
                    Save
                </button>
            </div>
            
          </div>
        )}
      </div>
  );
};

export default UserProfile;
