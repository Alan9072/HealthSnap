import React from 'react'
import styles from './OCR.module.css'
import { IoChevronBackOutline, IoHomeOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { BsFileEarmarkArrowUpFill } from "react-icons/bs";
import { IoCloudUploadSharp } from "react-icons/io5";
import { GoPaperclip } from "react-icons/go";
import { IoCamera } from "react-icons/io5";


function OCR() {
    const navigate = useNavigate();

  return (
    <div className={styles.container}>
        <div className={styles.buttonDiv}>
            <button className={styles.backButton} onClick={() => navigate(-1)}>
              <IoChevronBackOutline size={24} color={"green"}/>
            </button>
            <p>HS</p>
            <button className={styles.backButton} onClick={()=> navigate('/')}>
              <IoHomeOutline size={24} color={"green"}/>
            </button>
        </div>
        <div className={styles.title}>
            <h1><BsFileEarmarkArrowUpFill/> Upload Files</h1>
            <p>Please upload product nutri-info and Ingredients.</p>
        </div>
        <div className={styles.imageUploadDiv}>
            <div className={styles.imageUpload}>
                <p>Upload Ingredients</p>
                <div><IoCloudUploadSharp size={39} color={"green"}/></div>
                <div className={styles.buttons}>
                    <button className={styles.firstBtn}><GoPaperclip size={18}/></button>
                    <button className={styles.secondBtn}><p>Capture</p><IoCamera size={18} style={{marginTop:"2px"}}/></button>
                </div>
            </div>
            <div className={styles.imageUpload}>
                <p>Upload Nutri-Label</p>
                <div><IoCloudUploadSharp size={39} color={"green"}/></div>
                <div className={styles.buttons}>
                    <button className={styles.firstBtn}><GoPaperclip size={18}/></button>
                    <button className={styles.secondBtn}><p>Capture</p><IoCamera size={18} style={{marginTop:"2px"}}/></button>
                </div>
            </div>
        </div>
        <p className={styles.note}>Only .jpg and .png files.1MB max file size</p>
        <div className={styles.bothfiles}>
            <h2>Uploaded Files</h2>
            <div className={styles.uploadedFiles}>
                <p>Ingredients</p>
                <div className={styles.file}></div>
            </div>
            <div className={styles.uploadedFiles}>
                <p>Nutri-Label</p>
                <div className={styles.file}>
                    NutriInfo.jpg
                    <GoPaperclip/>
                </div>
            </div>
        </div>

    </div>
  )
}

export default OCR