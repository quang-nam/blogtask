import React, { useEffect, useState } from "react";
import styles from "./admin.module.css";
import AdminPostForm from "../../components/adminPostForm/AdminPostForm";
import { setUser } from "../../store/auth/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../createInstance";
import { Link } from "react-router-dom";
import useSWR from "swr";
const AdminPage = () => {
  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const accessToken = useSelector(
    (state) => state.authSlice.auth.user?.access_token
  );
  const dispatch = useDispatch();
  let axiosJwt = axiosInstance(accessToken, setUser, dispatch);

  const fetcher = async (url) => {
    const res = await axiosJwt.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  };
  const { data, mutate, isLoading } = useSWR("/api/post/admin", fetcher);
  // handle delete
  const handleDelete = (postId) => {
    axiosJwt
      .delete(`/api/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        mutate();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={styles.container}>
      <div className={styles.posts}>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          data?.map((post) => (
            <div className={styles.post} key={post.id}>
              <Link
                to={`/blog/${post.id}`}
                className={styles.postLink}
                onClick={handleScroll}
              >
                <img src={post.img} alt='' width={100} height={100} />
                <h2 className={styles.postTitle}>{post.title}</h2>
              </Link>
              <button
                type='submit'
                className={styles.delete}
                onClick={() => handleDelete(post.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
      <AdminPostForm />
    </div>
  );
};

export default AdminPage;
