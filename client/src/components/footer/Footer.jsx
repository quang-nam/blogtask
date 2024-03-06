import React from "react";
import styles from "./footer.module.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.logo}>
          <img className={styles.image} src="/Harry Potter.jpg" alt="" />
          <h1 className={styles.logoText}>Nam Blog</h1>
        </div>
        <p className={styles.desc}>
          Create a beautiful blog that fits your style. Choose from a selection
          of easy-to-use templates – all with flexible layouts and hundreds of
          background images – or design something new.
        </p>
        <div className={styles.icons}>
          <img src="/facebook.png" alt="" width={18} height={18} />
          <img src="/instagram.png" alt="" width={18} height={18} />
          <img src="/tiktok.png" alt="" width={18} height={18} />
          <img src="/youtube.png" alt="" width={18} height={18} />
        </div>
      </div>
      <div className={styles.links}>
        <div className={styles.list}>
          <span className={styles.listTitle}>Links</span>
          <Link href="/">Homepage</Link>
          <Link href="/">Blog</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Tags</span>
          <Link href="/">Style</Link>
          <Link href="/">Fashion</Link>
          <Link href="/">Coding</Link>
          <Link href="/">Travel</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Social</span>
          <Link href="/">Facebook</Link>
          <Link href="/">Instagram</Link>
          <Link href="/">Tiktok</Link>
          <Link href="/">Youtube</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
