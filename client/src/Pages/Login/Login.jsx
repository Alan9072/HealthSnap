import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
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
    <div className={styles.registerBox}>
        <h1>Login to Account</h1>
        <form onSubmit={handleSubmit}>
            <div className={styles.inputdiv}>
                <input type="text" name="name" placeholder="Full Name *" value={user.name} onChange={handleChange} required/>
                <input type="text" name="username" placeholder="Username *" value={user.username} onChange={handleChange} required/>
                <input type="password" name="password" placeholder="Password *" value={user.password} onChange={handleChange} required/>
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
                <button className={styles.submit} type="submit">Login</button>
            )}
        </form>

        <div className={styles.alreadyAcc}>
            <p>Dont have an Account?</p>
            <Link className={styles.loginRedirect} to="/register">
                <p>Register</p>
            </Link>
        </div>
    </div>
);
}

export default Register;
