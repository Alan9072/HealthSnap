import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, delay, motion } from "framer-motion";
import Home from "./Pages/Home/Home.jsx";
import QRScanner from "./Pages/QRScanner/QRSScanner.jsx";
import FoodDetails from "./components/FoodDetails/FoodDetails.jsx";
import ProductDetails from "./Pages/ProductDetails/ProductDetails.jsx";
import Navbar from "./components/Navbar/Navbar";
import ChatGPTComponent from "./Pages/ChatGPTComponent/ChatGPTComponent.jsx";
import NutriExplain from "./Pages/NutriExplain/NutriExplain.jsx";
import OCR from "./Pages/OCR/OCR.jsx";
import UserProfile from "./Pages/UserProfile/UserProfile.jsx";
import styles from './App.module.css';

const pageVariants = {
  initial: { opacity: 0, y: 0 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 0 },
};

const transitionSettings = {
  duration: 0.15,
  ease: "easeInOut",
  delay:0.1,
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={transitionSettings}
        style={{ flex: 1 }} // Ensures the layout does not jump
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/food/:id" element={<FoodDetails />} />
          <Route path="/scan" element={<QRScanner />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/chatgpt" element={<ChatGPTComponent />} />
          <Route path="/nutriscore/:id" element={<NutriExplain />} />
          <Route path="/ocr" element={<OCR />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <Router>
      <div className={styles.appwrapper} style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <div style={{ flex: 1 }}>
          <AnimatedRoutes />
        </div>
        <Navbar /> {/* Moved outside so it never gets affected by Framer Motion */}
      </div>
    </Router>
  );
};

export default App;
