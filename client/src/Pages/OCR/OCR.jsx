import React, { useState } from "react";
import styles from "./OCR.module.css";
import {
  IoChevronBackOutline,
  IoHomeOutline,
  IoCloudUploadSharp,
  IoCamera,
} from "react-icons/io5";
import { BsFileEarmarkArrowUpFill } from "react-icons/bs";
import { GoPaperclip } from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function OCR() {
  const navigate = useNavigate();
  const [uploadedNutriImage, setUploadedNutriImage] = useState({
    image: null,
    name: null,
  });
  const [uploadedIngredImage, setUploadedIngredImage] = useState({
    image: null,
    name: null,
  });
  const [error, setError] = useState("");

  const handleUploadIngreChange = (e) => {
    setError("");
    const file = e.target.files[0];
    const fileType = file.type;
    console.log(fileType);

    if (fileType === "image/png" || fileType === "image/jpeg") {
      setUploadedIngredImage({
        image: URL.createObjectURL(file),
        name: file.name,
      });
    } else {
      setError("Invalid file type. Please upload a .jpg or .png file.");
    }
  };

  const handleUploadNutriChange = (e) => {
    setError("");
    const file = e.target.files[0];
    const fileType = file.type;

    if (fileType === "image/png" || fileType === "image/jpeg") {
      setUploadedNutriImage({
        image: URL.createObjectURL(file),
        name: file.name,
      });
    } else {
      setError("Invalid file type. Please upload a .jpg or .png file.");
    }
  };

  const handleNutriDelete = (e) => {
    setUploadedNutriImage({ image: null, name: null });
  };
  const handleIngreDelete = (e) => {
    setUploadedIngredImage({ image: null, name: null });
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonDiv}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          <IoChevronBackOutline size={24} color={"green"} />
        </button>
        <p>HS</p>
        <button className={styles.backButton} onClick={() => navigate("/")}>
          <IoHomeOutline size={24} color={"green"} />
        </button>
      </div>
      <div className={styles.title}>
        <h1>
          <BsFileEarmarkArrowUpFill /> Upload Files
        </h1>
        <p>Please upload product nutri-info and Ingredients.</p>
      </div>
      <div className={styles.imageUploadDiv}>
        <div
          className={styles.imageUpload}
          style={{
            backgroundImage: `url(${uploadedIngredImage.image || "none"})`,
          }}
        >
          {uploadedIngredImage.image ? null : (
            <>
              <p>Upload Ingredients</p>
              <div>
                <IoCloudUploadSharp size={50} color={"white"} />
              </div>
            </>
          )}
          <div className={styles.buttons}>
            <label className={styles.firstBtn}>
              <input
                type="file"
                accept="image/*"
                onChange={handleUploadIngreChange}
                style={{ display: "none" }}
              />
              <GoPaperclip size={18} />
            </label>
            <label className={styles.secondBtn}>
              <input
                type="file"
                accept="image/*"
                capture="camera"
                onChange={handleUploadIngreChange}
                style={{ display: "none" }}
              />
              <p>Capture</p>
              <IoCamera size={18} style={{ marginTop: "2px" }} />
            </label>
          </div>
        </div>
        <div
          className={styles.imageUpload}
          style={{
            backgroundImage: `url(${uploadedNutriImage.image || "none"})`,
          }}
        >
          {uploadedNutriImage.image ? null : (
            <>
              <p>Upload Nutri-Label</p>
              <div>
                <IoCloudUploadSharp size={50} color={"white"} />
              </div>
            </>
          )}
          <div className={styles.buttons}>
            <label className={styles.firstBtn}>
              <input
                type="file"
                accept="image/*"
                onChange={handleUploadNutriChange}
                style={{ display: "none" }}
              />
              <GoPaperclip size={18} />
            </label>
            <label className={styles.secondBtn}>
              <input
                type="file"
                accept="image/*"
                capture="camera"
                onChange={handleUploadNutriChange}
                style={{ display: "none" }}
              />
              <p>Capture</p>
              <IoCamera size={18} style={{ marginTop: "2px" }} />
            </label>
          </div>
        </div>
      </div>
      <p className={error ? styles.error : styles.note}>
        {error ? error : "Only .jpg and .png files. 1MB max file size"}
      </p>
      <div className={styles.bothfiles}>
        <h2>Uploaded Files</h2>
        <p>Make sure to upload a high-quality image.</p>
        <div className={styles.uploadedFiles}>
          <p>Ingredients</p>
          <div className={styles.file}>
            {uploadedIngredImage.name && (
              <>
                <p className={styles.name}>{uploadedIngredImage.name}</p>
                <div>
                <MdDeleteOutline
                  onClick={handleIngreDelete}
                  size={18}
                  color={"rgb(247, 49, 49)"}
                />
                </div>
              </>
            )}
          </div>
        </div>
        <div className={styles.uploadedFiles}>
          <p>Nutri-Label</p>
          <div className={styles.file}>
            {uploadedNutriImage.name && (
              <>
                <p className={styles.name}>{uploadedNutriImage.name}</p>
                <div>
                <MdDeleteOutline
                  onClick={handleNutriDelete}
                  size={18}
                  color={"rgb(247, 49, 49)"}
                />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <button className={styles.proceed}>Continue</button>
    </div>
  );
}

export default OCR;
