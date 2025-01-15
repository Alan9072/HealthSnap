import React, { useState, useEffect } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import styles from "./QRScanner.module.css";
import Scanner from "../../components/Scanner/Scanner";

const QRScanner = () => {
  const [barcodeData, setBarcodeData] = useState(null);
  const [showScanner, setShowScanner] = useState(false); // State to manage the delay for the scanner

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScanner(true); // Show the scanner after 1 second
    }, 600);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  const handleScan = (err, result) => {
    if (result) {
      setBarcodeData(result.text); // Capture scanned data
    }
  };

  const handleError = (error) => {
    console.error("Camera Error:", error);
  };

  return (
    <div className={styles.container}>
      {!barcodeData && <h1>Scan Barcode</h1>}
      {barcodeData ? (
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
      ) : (
        <div className={styles.scannerWrapper}>
          {showScanner && <Scanner />} {/* Render Scanner after delay */}
          
            <BarcodeScannerComponent
              width={300}
              height={300}
              onUpdate={handleScan}
              onError={handleError}
            />
          <div className={styles.scanHint}>Align the barcode within the frame</div>
        </div>
      )}
    </div>
  );
};

export default QRScanner;
