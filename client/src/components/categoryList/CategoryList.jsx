import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../createInstance";
import { fetchCategory } from "../../store/apiRequest";
import { setUser } from "../../store/auth/auth-slice";
import styles from "./categoryList.module.css";
const CategoryList = () => {
  const [data, setData] = useState([]);
  const accessToken = useSelector(
    (state) => state.authSlice.auth.user?.access_token
  );

  const dispatch = useDispatch();

  let axiosJwt = axiosInstance(accessToken, setUser, dispatch);
  useEffect(() => {
    fetchCategory(axiosJwt, accessToken, setData);
  }, [accessToken]);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Popular Categories</h1>
      <div className={styles.categories}>
        {data?.map((item) => (
          <Link
            to={`/blog?category=${item.slug}`}
            className={`${styles.category} ${styles[item.slug]}`}
            key={item.id}
          >
            {item.img && (
              <img
                src={item.img}
                alt=''
                width={32}
                height={32}
                className={styles.image}
              />
            )}
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
