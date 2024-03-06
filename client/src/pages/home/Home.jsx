import React from "react";
import styles from "./home.module.css";
import Feature from "../../components/feature/Feature";
import CategoryList from "../../components/categoryList/CategoryList";
import Menu from "../../components/menu/Menu";
import CardList from "../../components/cardList/CardList";
import { useLocation } from "react-router-dom";
const Home = () => {
  const page =
    parseInt(new URLSearchParams(useLocation().search).get("page")) || 1;
  return (
    <div className={styles.container}>
      <Feature />
      <CategoryList />
      <div className={styles.content}>
        <CardList page={page} />
        <Menu />
      </div>
    </div>
  );
};

export default Home;
