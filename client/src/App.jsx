import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./Pages/Home/Home.jsx";
import QRScanner from "./Pages/QRScanner/QRSScanner.jsx";
import FoodDetails from "./components/FoodDetails/FoodDetails.jsx";
import ProductDetails from "./Pages/ProductDetails/ProductDetails.jsx";
import Navbar from "./components/Navbar/Navbar";
import ChatGPTComponent from "./Pages/ChatGPTComponent/ChatGPTComponent.jsx";
import NutriExplain from "./Pages/NutriExplain/NutriExplain.jsx";
import OCR from "./Pages/OCR/OCR.jsx";
import UserProfile from "./Pages/UserProfile/UserProfile.jsx";
import Register from "./Pages/Register/Register.jsx";
import styles from './App.module.css';
import Login from "./Pages/Login/Login.jsx";
const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const transitionSettings = {
  duration: 0.15,
  ease: "easeInOut",
};

// ✅ Move useLocation INSIDE the Router
const AnimatedRoutes = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/register","/login"]; // Define routes where Navbar shouldn't appear

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          transition={transitionSettings}
          style={{ flex: 1 }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/food/:id" element={<FoodDetails />} />
            <Route path="/scan" element={<QRScanner />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/nutriscore/:id" element={<NutriExplain />} />
            <Route path="/ocr" element={<OCR />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login/>} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </motion.div>
      </AnimatePresence>

      {/* ✅ Conditionally show Navbar */}
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
    </>
  );
};

// ✅ Ensure Router wraps everything
const App = () => {
  return (
    <Router>
      <div className={styles.appwrapper} style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <AnimatedRoutes />
      </div>
    </Router>
  );
};

export default App;
