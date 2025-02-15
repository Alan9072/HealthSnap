import { useState } from "react";
import styles from "./UserProfile.module.css";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { IoChevronBackOutline, IoHomeOutline } from "react-icons/io5";
import { FaUserEdit } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    gender: "Male",
    age: 25,
    height: "175cm",
    weight: "70kg",
    profilePic: "https://via.placeholder.com/100",
    dietType: "Vegetarian",
    allergies: "Peanuts, Dairy",
    intolerances: "Lactose",
    preExistingConditions: "Diabetes, Hypertension",
    currentMedications: "Metformin, Aspirin",
    medicalHistory: "Family history of heart disease, Lung Cancer for all people and some issues"
  });
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

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
  }
  const handleSave = () => {
    setUser(editedUser);
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.toptopWrapper}>
        <div className={styles.buttonDivWrap}>
          <div className={styles.buttonDiv}>
            <button className={styles.backButton}>
              <IoChevronBackOutline size={24} color={"green"} onClick={() => navigate(-1)}/>
            </button>
            <p>HS</p>
            <button className={styles.backButton}>
              <IoHomeOutline size={24} color={"green"} onClick={() => navigate('/')}/>
            </button>
          </div>
        </div>
        <div className={styles.topWrapper}>
          <div className={styles.profileHeader}>
            <div>
              <h2 className={styles.profileName}>
                {user.name} <small>({user.gender.charAt(0)})</small>
              </h2>
              <p className={styles.profileEmail}>{user.email}</p>
            </div>
            <div className={styles.profileEdit}>
              <RiVerifiedBadgeFill size={24} color="white" />
              <div className={styles.edit} onClick={handleEdit}>
                <FaUserEdit size={15} color="green" />
                <p>Edit</p>
              </div>
            </div>
          </div>
          <div className={styles.userDetailsWrapper}>
            <div className={styles.smallUserDetails}>
              <div><strong>Age:</strong> {user.age}</div>
              <div><strong>Weight:</strong> {user.weight}</div>
              <div><strong>Height:</strong> {user.height}</div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.subWrapper}>
        <div className={styles.profileSection}><label>Diet Type</label><p className={styles.profInfo}>{user.dietType}</p></div>
        <div className={styles.profileSection}><label>Allergies</label><p className={styles.profInfo}>{user.allergies}</p></div>
        <div className={styles.profileSection}><label>Intolerances</label><p className={styles.profInfo}>{user.intolerances}</p></div>
        <div className={styles.profileSection}><label>Pre-existing Conditions</label><p className={styles.profInfo}>{user.preExistingConditions}</p></div>
        <div className={styles.profileSection}><label>Current Medications</label><p className={styles.profInfo}>{user.currentMedications}</p></div>
        <div className={styles.profileSection}><label>Medical History</label><p className={styles.profInfo}>{user.medicalHistory}</p></div>
      </div>

      {/* Edit Profile Popup Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2><CgProfile size={30} color="green"/>Edit Profile</h2>
            <div className={styles.ahw}>
            <div className={styles.formGroup}>
              <label>Age</label>
              <input type="number" name="age" value={editedUser.age} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label>Height (cm)</label>
              <input type="text" name="height" value={editedUser.height} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label>Weight (kg)</label>
              <input type="text" name="weight" value={editedUser.weight} onChange={handleChange} />
            </div>
            </div>
            
            <div className={styles.formGroup}>
              <label>Diet Type</label>
              <input type="text" name="dietType" value={editedUser.dietType} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label>Allergies</label>
              <input type="text" name="allergies" value={editedUser.allergies} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label>Intolerances</label>
              <input type="text" name="intolerances" value={editedUser.intolerances} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label>Pre-existing Conditions</label>
              <input type="text" name="preExistingConditions" value={editedUser.preExistingConditions} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label>Current Medications</label>
              <input type="text" name="currentMedications" value={editedUser.currentMedications} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label>Medical History</label>
              <input type="text" name="medicalHistory" value={editedUser.medicalHistory} onChange={handleChange} />
            </div>
            <div className={styles.buttonGroup}>
              <button onClick={handleSave} className={styles.saveButton}>Save</button>
              <button onClick={handleClose} className={styles.cancelButton}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
