import React, { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const QRScanner = () => {
  const [barcodeData, setBarcodeData] = useState(null);

  const handleScan = (err, result) => {
    if (result) {
      setBarcodeData(result.text); // Capture scanned data
    }
  };

  const handleError = (error) => {
    console.error("Camera Error:", error);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Scan Barcode</h1>
      {barcodeData ? (
        <div>
          <p>Scanned Code: {barcodeData}</p>
          <button onClick={() => setBarcodeData(null)}>Scan Again</button>
        </div>
      ) : (
        <BarcodeScannerComponent
          width={400}
          height={300}
          onUpdate={handleScan}
          onError={handleError}
        />
      )}
    </div>
  );
};

export default QRScanner;
