import React from "react";
import styles from "./contact.module.css";
const Contact = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img src='/contact.png' alt='' className={styles.img} />
      </div>
      <div className={styles.formContainer}>
        <form action='' className={styles.form}>
          <input type='text' placeholder='Name and Surname' />
          <input type='text' placeholder='Email Address' />
          <input type='text' placeholder='Phone Number (optional)' />
          <textarea
            name=''
            id=''
            cols='30'
            rows='10'
            placeholder='Message'
          ></textarea>
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
