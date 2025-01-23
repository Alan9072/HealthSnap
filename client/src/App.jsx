import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
            {/* <Route path="/scan" element={<QRScanner />} />
            // <Route path="/product" element={<ProductDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} /> */}
          </Routes>
        
        <Navbar />
      </div>
    </Router>
  );
};

export default App;
