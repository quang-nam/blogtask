import React from 'react'
import styles from './menuPosts.module.css'
import { Link } from 'react-router-dom'
const MenuPosts = ({withImage}) => {
  return (
    <div className={styles.items}>
    <Link to="/" className={styles.item}>
      {withImage && (<div className={styles.imgContainer}>
        <img src="/culture.png" alt="" className={styles.image}/>
      </div>)}
      <div className={styles.textContainer}>
        <span className={`${styles.category} ${styles.travel}`}>
          Travel
        </span>
        <h3 className={styles.postTitle}>Know your audience</h3>
        <div className={styles.detail}>
          <span className={styles.username}>John Doe</span>
          <span className={styles.date}>- 12.06.2023</span>
        </div>
      </div>
    </Link>

    <Link to="/" className={styles.item}>
    {withImage && (<div className={styles.imgContainer}>
        <img src="/culture.png" alt="" className={styles.image}/>
      </div>)}
      <div className={styles.textContainer}>
        <span className={`${styles.category} ${styles.culture}`}>
          Culture
        </span>
        <h3 className={styles.postTitle}>Know your audience</h3>
        <div className={styles.detail}>
          <span className={styles.username}>John Doe</span>
          <span className={styles.date}>- 12.06.2023</span>
        </div>
      </div>
    </Link>

    <Link to="/" className={styles.item}>
    {withImage && ( <div className={styles.imgContainer}>
        <img src="/culture.png" alt="" className={styles.image}/>
      </div>)}
      <div className={styles.textContainer}>
        <span className={`${styles.category} ${styles.food}`}>
          Food
        </span>
        <h3 className={styles.postTitle}>Know your audience</h3>
        <div className={styles.detail}>
          <span className={styles.username}>John Doe</span>
          <span className={styles.date}>- 12.06.2023</span>
        </div>
      </div>
    </Link>

    <Link to="/" className={styles.item}>
    {withImage && (<div className={styles.imgContainer}>
        <img src="/culture.png" alt="" className={styles.image}/>
      </div>)}
      <div className={styles.textContainer}>
       <span className={`${styles.category} ${styles.culture}`}>
          Culture
        </span>
        <h3 className={styles.postTitle}>Know your audience</h3>
        <div className={styles.detail}>
          <span className={styles.username}>John Doe</span>
          <span className={styles.date}>- 12.06.2023</span>
        </div>
      </div>
    </Link>
  </div>
  )
}

export default MenuPosts