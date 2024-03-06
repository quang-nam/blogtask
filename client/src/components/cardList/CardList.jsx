import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../createInstance";
import { fetchCardList } from "../../store/apiRequest";
import { setUser } from "../../store/auth/auth-slice";
import Card from "../card/Card";
import Pagination from "../pagination/Pagination";
import styles from "./cardList.module.css";

const CardList = ({ page, cat }) => {
  const [data, setData] = useState({ posts: [], count: 0 });
  const [hasNext, setHasNext] = useState(true);
  const [hasPrev, setHasPrev] = useState(false);
  const accessToken = useSelector(
    (state) => state.authSlice.auth.user?.access_token
  );
  const dispatch = useDispatch();
  let axiosJwt = axiosInstance(accessToken, setUser, dispatch);
  useEffect(() => {
    fetchCardList(
      axiosJwt,
      page,
      cat,
      accessToken,
      setData,
      setHasPrev,
      setHasNext
    );
  }, [page, cat, accessToken]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
      {data.posts?.map((post) => (
        <Card key={post.id} post={post} />
      ))}
      <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
    </div>
  );
};

export default CardList;
