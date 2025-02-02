import React from 'react'
import styles from './AiInsights.module.css'

function AiInsights() {
return (
    <div className={styles.AiBox}>
        <div className={styles.subtitle}>
            <div className={styles.logo}></div>
            Ai Insights..
        </div>
        <div className={styles.Airesult}>
            <div className={`${styles.loadingLine} ${styles.long}`}></div>
            <div className={`${styles.loadingLine} ${styles.medium}`}></div>
            <div className={`${styles.loadingLine} ${styles.short}`}></div>
        </div>
    </div>
)
}

export default AiInsights