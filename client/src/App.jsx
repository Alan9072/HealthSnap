import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home.jsx";
import FoodDetails from "./components/FoodDetails/FoodDetails.jsx";
// import QRScanner from "./pages/QRScanner";
// import ProductDetails from "./pages/ProductDetails";
// import Profile from "./pages/Profile";
// import Settings from "./pages/Settings";
import Navbar from "./components/Navbar/Navbar";
import styles from './App.module.css'

const App = () => {
  return (
    <Router>
      <div className={styles.appwrapper}>
        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/food/:id" element={<FoodDetails />} />
            {/* <Route path="/scan" element={<QRScanner />} />
            <Route path="/product" element={<ProductDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} /> */}
          </Routes>
        
        <Navbar />
      </div>
    </Router>
  );
};

export default App;
