import React from 'react'
import styles from './Home.module.css';
import { IoSearchOutline } from "react-icons/io5";

function Home() {
  return (
    <div className={styles.homeDiv}>{/* Every main page should have a main div that accumulates all inner content, the styles of these also should be same .*/}
      <div className={styles.productTitle}>
        <p>Products</p>
        <form className={styles.searchBar}>
          <input type="text" placeholder='Search your products'/>
          <IoSearchOutline style={{
          position: "absolute",
          top: "50%",
          right: "15px",
          transform: "translate(0%, -50%)"
        }}/>
        </form>
      </div>
      <div className={styles.homeContent}>
        
      </div>
    </div>
  );
}


export default Home