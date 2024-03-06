import React from "react";
import styles from "./card.module.css";
import { Link } from "react-router-dom";
const Card = ({ post }) => {
  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img src={post.img} alt='' className={styles.img} height={350} />
      </div>
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>
            {" "}
            {post.createdAt.substring(0, 10)} -{" "}
          </span>
          <span className={styles.category}>{post.catSlug}</span>
        </div>
        <Link to={`/blog/${post.id}`}>
          <h1>{post.title}</h1>
        </Link>
        <p className={styles.desc}>
          {getText(post.desc.substring(0, 150)) + "..."}
        </p>
        <Link
          to={`/blog/${post.id}`}
          className={styles.link}
          onClick={handleScroll}
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Card;
