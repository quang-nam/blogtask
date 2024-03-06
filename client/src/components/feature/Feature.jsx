import React from "react";
import styles from "./feature.module.css";
const Feature = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <b>Hey, Nam Nguyen here!</b> Discover my stories and creative ideas
      </h1>
      <div className={styles.post}>
        <div className={styles.imgContainer}>
          <img src="/coding.png" alt="" className={styles.img} />
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}>Choose the perfect design</h1>
          <p className={styles.postDesc}>
            Create a beautiful blog that fits your style. Choose from a
            selection of easy-to-use templates – all with flexible layouts and
            hundreds of background images – or design something new.
          </p>
          <button className={styles.button}>Read More</button>
        </div>
      </div>
    </div>
  );
};

export default Feature;
