import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import styles from "./QRScanner.module.css";
import Scanner from "../../components/Scanner/Scanner";
import { CiLocationArrow1 } from "react-icons/ci";

const QRScanner = () => {
  const [scannedBarcode, setScannedBarcode] = useState(null);
  const [isScannerVisible, setIsScannerVisible] = useState(false);
  const [isCameraAccessDenied, setIsCameraAccessDenied] = useState(false);
  const [isProductNotFound, setIsProductNotFound] = useState(false);
  const [isProductScanned, setIsProductScanned] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsScannerVisible(true); // Show the scanner after 1 second
    }, 600);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [isCameraAccessDenied]);

  useEffect(() => {
    if (isScannerVisible && !isCameraAccessDenied) {
      // Set a timeout to display "No product found" after 5 seconds
      const timeout = setTimeout(() => {
        setIsProductNotFound(true);
        setIsScannerVisible(false); // Turn off the scanner
      }, 10000);

      return () => clearTimeout(timeout); // Cleanup timeout on component unmount
    }
  }, [isScannerVisible, isCameraAccessDenied, isProductScanned]);

  const handleScan = async (error, result) => {
    if (result) {
      try {
        setScannedBarcode(result.text);
        const response = await fetch(
          `https://world.openfoodfacts.org/api/v0/product/${result.text}.json`
        );
        const data = await response.json();

        if (data.product.product_name.length > 0) {
          const productInfo = `${data.product.product_name} ${data.product.brands}`;
          
          setProductDetails(productInfo);
          setIsProductScanned(true);
        } else {
          setIsProductNotFound(true);
          setIsScannerVisible(false);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
        setIsProductNotFound(true);
        setIsScannerVisible(false);
      }
    }
  };

  const retryScan = () => {
    setIsProductNotFound(false);
    setIsProductScanned(false);
    setIsScannerVisible(true);
  };

  const handleCameraError = (error) => {
    setIsCameraAccessDenied(true);
    console.error("Camera Error:", error);
  };

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        Back
      </button>
      <div>
        <h1 className={styles.title}>Barcode Scanner</h1>
        <p className={styles.desc}>
          Scan the Barcode to get the details about the product.
          <br />
          <p style={{ color: "grey" }}>(Make sure to only scan barcodes of food products)</p>
        </p>
      </div>

      <div className={styles.scannerWrapper}>
        {!isProductScanned && isScannerVisible && <Scanner />}
        {!isProductScanned && isScannerVisible && (
          <BarcodeScannerComponent
            width={350}
            height={350}
            onUpdate={handleScan}
            onError={handleCameraError}
          />
        )}
      </div>
      {isCameraAccessDenied && (
        <p className={styles.alert}>Camera access is required to scan barcodes</p>
      )}
      {(isProductNotFound || isProductScanned) && (
        <div className={styles.noProduct}>
          {isProductScanned ? (
            <div>
              <div className={styles.noFoundBox}>
                <div className={styles.productData}>
                  <p className={styles.detail}><strong>Barcode : </strong> {scannedBarcode}</p>
                  <p className={styles.detail}><strong>Product : </strong> {productDetails}</p>
                </div>
                <button
                  className={styles.proceed}
                  onClick={() => navigate(`/product/${scannedBarcode}`)}
                >
                  <CiLocationArrow1 size={20} style={{ color: "white" }} />
                </button>
              </div>
              <div className={styles.check}>
                Make sure the result and the product scanned are the same. (Proceed only if they match.)
              </div>
            </div>
          ) : (
            <div className={styles.noFoundBox}>
              <p className={styles.notFound} >{scannedBarcode === null ? "No Barcode Detected" : `No Product found for barcode : ${scannedBarcode}` }</p>
            </div>
          )}
          <button onClick={retryScan} className={styles.retry}>
            Re-Scan
          </button>
        </div>
      )}
    </div>
  );
};

export default QRScanner;
