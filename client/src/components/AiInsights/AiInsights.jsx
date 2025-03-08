import React from 'react'
import styles from './AiInsights.module.css'

function AiInsights({val,rec,onClick}) {
  
return (
    <div className={styles.AiBox} onClick={onClick}>
        <div className={styles.subtitle}>
            <div className={styles.logo}></div>
            Ai Insights..
        </div>
        <div className={styles.Airesult}>
            {val ? 
            <>
            <div className={`${styles.loadingLine} ${styles.long}`}></div>
            <div className={`${styles.loadingLine} ${styles.medium}`}></div>
            <div className={`${styles.loadingLine} ${styles.short}`}></div>
            </>
            :
            <div className={styles.result}>{rec}</div>}
        </div>
    </div>
)
}

export default AiInsights