import React from "react";
import styles from "./blog.module.css";
import CardList from "../../components/cardList/CardList";
import Menu from "../../components/menu/Menu";
import { useLocation } from "react-router-dom";
const Blog = () => {
  const router = useLocation();
  const page = parseInt(router.pathname.split("/")) || 1;
  const style = router.search.split("=")[1];
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{style} Blog</h1>
      <div className={styles.content}>
        <CardList page={page} cat={style} />
        <Menu />
      </div>
    </div>
  );
};

export default Blog;
