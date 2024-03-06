import React from "react";
import styles from "./pagination.module.css";
import { useNavigate } from "react-router-dom";
const Pagination = ({ page, hasPrev, hasNext }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={!hasPrev}
        onClick={() => navigate(`?page=${page - 1}`)}
      >
        Previous
      </button>
      <button
        className={styles.button}
        disabled={!hasNext}
        onClick={() => navigate(`?page=${page + 1}`)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
