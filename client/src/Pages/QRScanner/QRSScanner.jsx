import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import styles from "./QRScanner.module.css";
import Scanner from "../../components/Scanner/Scanner";
import { CiLocationArrow1 } from "react-icons/ci";

const QRScanner = () => {
  const [barcodeData, setBarcodeData] = useState(null);
  const [showScanner, setShowScanner] = useState(false);
  const [cameraNotAllowed, setCameraNotAllowed] = useState(false);
  const [noProductFound, setNoProductFound] = useState(false);
  const [gotIt, setGotIt] = useState(false);
  const [productData, setProductData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScanner(true); // Show the scanner after 1 second
    }, 600);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [cameraNotAllowed]);

  useEffect(() => {
    if (showScanner && !cameraNotAllowed) {
      // Set a timeout to display "No product found" after 10 seconds
      const timeout = setTimeout(() => {
        setNoProductFound(true);
        setShowScanner(false); // Turn off the scanner
      }, 5000); // 10 seconds

      return () => clearTimeout(timeout); // Cleanup timeout on component unmount
    }
  }, [showScanner, cameraNotAllowed,gotIt]);

  const handleScan = async (err, result) => {
    if (result) {
      try {
        const response = await fetch(
          `https://world.openfoodfacts.org/api/v0/product/${result.text}.json`
        );
        const data = await response.json();
        console.log(data);

        if (data.product.product_name.length > 0) {
          const prodId =
            data.product.product_name + " " + data.product.brands;
          setBarcodeData(result.text);
          setProductData(prodId);
          console.log(prodId);
          setGotIt(true);
          // navigate(`/product/${result.text}`); // Capture scanned data
        } else {
          setNoProductFound(true);
          setShowScanner(false);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
        setNoProductFound(true);
        setShowScanner(false);
      }
    }
  };

  const handleRetry = () => {
    setNoProductFound(false);
    setGotIt(false);
    setShowScanner(true);
  };

  const handleError = (error) => {
    setCameraNotAllowed(true);
    console.error("Camera Error:", error);
  };

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        Back
      </button>
      {
        <div>
          <h1 className={styles.title}>Barcode Scanner</h1>
          <p className={styles.desc}>
            Scan the Barcode to get the details about the product.
            <br />
            <p style={{ color: "grey" }}>(Make sure to only scan barcodes of food products)</p>
          </p>
        </div>
      }

      <div className={styles.scannerWrapper}>
        { !gotIt && showScanner && <Scanner />}
        { !gotIt &&  showScanner && (
          <BarcodeScannerComponent
            width={350}
            height={350}
            onUpdate={handleScan}
            onError={handleError}
          />
        )}
      </div>
      {cameraNotAllowed && (
        <p className={styles.alert}>Camera access is required to scan barcodes</p>
      )}
      {(noProductFound || gotIt) && (
        <div className={styles.noProduct}>
          {gotIt ? (
            <div>
              <div className={styles.noFoundBox}>
              <div className={styles.productData}>
                  <p className={styles.detail}><strong>Barcode : </strong> {barcodeData}</p>
                  <p className={styles.detail}><strong>Product : </strong> {productData}</p>
              </div>
              <button className={styles.proceed} onClick={() => navigate(`/product/${barcodeData}`)}><CiLocationArrow1 size={20} style={{color:"white"}}/></button>
              </div>
              <div className={styles.check}>Make sure the result and the product scanned are same.(Proceed then only)</div>
            </div>
            
            
          ) : (
            <div className={styles.noFoundBox}>
              <p style={{color:"red"}}>No product found for the scanned barcode</p>
            </div>
          )}
          <button onClick={handleRetry} className={styles.retry}>
            Re-Scan
          </button>
        </div>
      )}
    </div>
  );
};

export default QRScanner;
