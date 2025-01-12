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
          <IoSearchOutline className={styles.searchIcon}/>
        </form>
      </div>
      <div className={styles.homeContent}>
      </div>
    </div>
  );
}


export default Home