import React from 'react'
import styles from './NutriBox.module.css'


function NutrBox({val}) {
    const arr = ["A","B","C","D","E"];

  return (
        <div className={styles.nutriBox}>
            <p className={styles.subtitle}>Nutri-Score</p>
            <div className={styles.nutriScore}>
              {arr.map((letter) =>
                letter === val ? (
                  <p key={letter} className={`${styles.mainletter} ${styles[letter]}`}>{letter}</p>
                ) : (
                  <p key={letter} className={`${styles.letter} ${styles[letter]}`}>{letter}</p>
                )
              )}
            </div>
        </div>
  )
}

export default NutrBox