import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home.jsx";
import QRScanner from "./Pages/QRScanner/QRSScanner.jsx";
import FoodDetails from "./components/FoodDetails/FoodDetails.jsx";
import ProductDetails from "./Pages/ProductDetails/ProductDetails.jsx";
import Navbar from "./components/Navbar/Navbar";
import styles from './App.module.css'
import ChatGPTComponent from "./Pages/ChatGPTComponent/ChatGPTComponent.jsx";
import NutriExplain from "./Pages/NutriExplain/NutriExplain.jsx";
import OCR from "./Pages/OCR/OCR.jsx";
import UserProfile from "./Pages/UserProfile/UserProfile.jsx";


const App = () => {
  return (

    <Router>
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
