import React from "react";
import { BrowserRouter as Router, Routes, Route ,useLocation } from "react-router-dom";
import Home from "./Pages/Home/Home.jsx";
import QRScanner from "./Pages/QRScanner/QRSScanner.jsx";
import FoodDetails from "./components/FoodDetails/FoodDetails.jsx";
import ProductDetails from "./Pages/ProductDetails/ProductDetails.jsx";
// import QRScanner from "./pages/QRScanner";
// import Profile from "./pages/Profile";
// import Settings from "./pages/Settings";
import Navbar from "./components/Navbar/Navbar";
import styles from './App.module.css'
import ChatGPTComponent from "./Pages/ChatGPTComponent/ChatGPTComponent.jsx";
import NutriExplain from "./Pages/NutriExplain/NutriExplain.jsx";
import OCR from "./Pages/OCR/OCR.jsx";
import UserProfile from "./Pages/UserProfile/UserProfile.jsx";

const THEME_COLORS = {
  "/": "#ff5733",           // Home (Red-Orange)
  "/scan": "#4CAF50",       // Scanner (Green)
  "/food/:id": "#2196F3",   // Food Details (Blue)
  "/product/:id": "#FFC107",// Product (Yellow)
  "/chatgpt": "#9C27B0",    // ChatGPT (Purple)
  "/nutriscore/:id": "#FF5722", // NutriExplain (Deep Orange)
  "/ocr": "#795548",        // OCR (Brown)
  "/profile": "#607D8B"     // Profile (Gray)
};

const ThemeColorUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    const color = Object.keys(THEME_COLORS).find((route) =>
      new RegExp(`^${route.replace(/:\w+/g, ".*")}$`).test(location.pathname)
    );
    document
      .querySelector('meta[name="theme-color"]')
      .setAttribute("content", THEME_COLORS[color] || "#ffffff");
  }, [location]);

  return null;
};

const App = () => {
  return (

    <Router>
      <ThemeColorUpdater />
      <div className={styles.appwrapper}>
        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/food/:id" element={<FoodDetails />} />
            <Route path="/scan" element={<QRScanner />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/chatgpt" element={<ChatGPTComponent/>} />
            <Route path="/nutriscore/:id" element={<NutriExplain />} />
            <Route path="/ocr" element={<OCR />} />
            <Route path="/profile" element={<UserProfile />} />
            {/* <Route path="/scan" element={<QRScanner />} />
            // <Route path="/product" element={<ProductDetails />} />
            
            <Route path="/settings" element={<Settings />} /> */}
          </Routes>
        
        <Navbar />
      </div>
    </Router>

  );
};

export default App;
