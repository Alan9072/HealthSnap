import React, { useEffect, useState } from "react";
import styles from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { MdError } from "react-icons/md";
import Cookies from "js-cookie";

function Register() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const [errmessage, setErrMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    name: "",
    username: "",
    password: "",
    gender: "Male",
    age: "",
    height: "",
    weight: "",
    dietType: "",
    allergies: "",
    intolerances: "",
    preExistingConditions: "",
    currentMedications: "",
    medicalHistory:
      "",
  });

  const url = import.meta.env.VITE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMessage("");

    if (!user.name || !user.username || !user.password) {
      setErrMessage("Please fill out all required fields!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${url}/register`, user);
      if (response.data.message !== "verified") {
        setErrMessage(response.data.message);
      } else {
        setUser({
          name: "",
          username: "",
          password: "",
          gender: "Male",
          age: "",
          height: "",
          weight: "",
          profilePic: "",
          dietType: "",
          allergies: "",
          intolerances: "",
          preExistingConditions: "",
          currentMedications: "",
          medicalHistory: "",
        });
      }
    } catch (error) {
      setErrMessage("There was an error creating your account.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


return (
    <div className={styles.registerContainer}>
        <div className={styles.registerBox}>
            <h1>Create an Account</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputdiv}>
                    <input type="text" name="name" placeholder="Full Name *" value={user.name} onChange={handleChange} required/>
                    <input type="text" name="username" placeholder="Username *" value={user.username} onChange={handleChange} required/>
                    <input type="password" name="password" placeholder="Password *" value={user.password} onChange={handleChange} required/>
                    <div className={styles.inputGroup}>
                        <select name="gender" value={user.gender} onChange={handleChange}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        <input type="number" name="age" placeholder="Age" value={user.age} onChange={handleChange} />
                        <input type="text" name="height" placeholder="Height (cm)" value={user.height} onChange={handleChange} />
                        <input type="text" name="weight" placeholder="Weight (kg)" value={user.weight} onChange={handleChange} />
                    </div>
                    <input type="text" name="dietType" placeholder="Diet Type" value={user.dietType} onChange={handleChange} />
                    <input type="text" name="allergies" placeholder="Allergies" value={user.allergies} onChange={handleChange} />
                    <input type="text" name="intolerances" placeholder="Intolerances" value={user.intolerances} onChange={handleChange} />
                    <input type="text" name="preExistingConditions" placeholder="Pre-existing Conditions" value={user.preExistingConditions} onChange={handleChange} />
                    <input type="text" name="currentMedications" placeholder="Current Medications" value={user.currentMedications} onChange={handleChange} />
                    <textarea name="medicalHistory" placeholder="Medical History" value={user.medicalHistory} onChange={handleChange} />
                </div>

                
                    <div className={styles.errDiv}>
                    {errmessage && (
                        <p className={styles.errMessage}>
                            <MdError style={{ marginTop: "2px" }} />
                            {errmessage}
                        </p>
                        )}
                    </div>
                

                {loading ? (
                    <div className={styles.loading}>Loading...</div>
                ) : (
                    <button className={styles.submit} type="submit">Create Account</button>
                )}
            </form>

            <div className={styles.alreadyAcc}>
                <p>Already have an account?</p>
                <Link className={styles.loginRedirect} to="/login">
                    <p>Login</p>
                </Link>
            </div>
        </div>
    </div>
);
}

export default Register;
