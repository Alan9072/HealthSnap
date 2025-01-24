import React, { useState, useEffect } from "react";
import {useNavigate } from 'react-router-dom';
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import styles from "./QRScanner.module.css";
import Scanner from "../../components/Scanner/Scanner";

const QRScanner = () => {
  const [barcodeData, setBarcodeData] = useState(null);
  const [showScanner, setShowScanner] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScanner(true); // Show the scanner after 1 second
    }, 600);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  const handleScan = (err, result) => {
    if (result) {
      setBarcodeData(result.text);
      navigate(`/product/${result.text}`); // Capture scanned data
    }
  };

  const handleError = (error) => {
    console.error("Camera Error:", error);
  };

  return (
    <div className={styles.container}>
      { showScanner &&
      <button className={styles.backButton} onClick={() => navigate(-1)}>
              Back
      </button>
    }
      {showScanner && !barcodeData && 
        <div>
          <h1 className={styles.title}>Barcode Scanner</h1>
          <p className={styles.desc}>
            Scan the Barcode to get the details about the product.
            <br />
            <p style={{color:"grey"}}>(Make sure to only scan barcodes of food products)</p>
          </p>
        </div>
      }
      {/* {barcodeData ? (
        <div className={styles.resultContainer}>
          <p className={styles.resultText}>Scanned Code: {barcodeData}</p>
          <button
            className={styles.scanAgainBtn}
            onClick={() => {
              setBarcodeData(null);
              setShowScanner(false); // Reset scanner visibility
              setTimeout(() => setShowScanner(true), 1000); // Delay reactivation of scanner
            }}
          >
            Scan Again
          </button>
        </div>
      ) : ( */}
        <div className={styles.scannerWrapper}>
          {showScanner && <Scanner />} {/* Render Scanner after delay */}
          
            <BarcodeScannerComponent
              width={350}
              height={300}
              onUpdate={handleScan}
              onError={handleError}
            />
        </div>
      
    </div>
  );
};

export default QRScanner;
