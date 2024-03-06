import React, { useEffect, useState } from "react";
import styles from "./singleblog.module.css";
import Menu from "../../components/menu/Menu";
import Comment from "../../components/comments/Comment";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleBlog } from "../../store/apiRequest";
import { axiosInstance } from "../../createInstance";
import { setUser } from "../../store/auth/auth-slice";
const SingleBlog = () => {
  const [postData, setPostData] = useState({});
  const accessToken = useSelector(
    (state) => state.authSlice.auth.user?.access_token
  );
  const id = useLocation().pathname.split("/")[2];
  const dispatch = useDispatch();
  let axiosJwt = axiosInstance(accessToken, setUser, dispatch);

  useEffect(() => {
    fetchSingleBlog(axiosJwt, accessToken, setPostData, id);
  }, [id, accessToken]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{postData.title}</h1>
          <div className={styles.user}>
            <div className={styles.userImageContainer}>
              <img src={postData.img} alt='' className={styles.avatar} />
            </div>
            <div className={styles.userText}>
              <span className={styles.username}>
                {postData.author?.username}
              </span>
              <span className={styles.date}>12.07.2023</span>
            </div>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <img src={postData.img} alt='' className={styles.image} />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div className={styles.description}>
            <p>{getText(postData.desc)}</p>
            <span>Viewers: {postData.views}</span>
          </div>
          {/**comment section */}
          <div className={styles.comment}>
            <Comment postSlug={postData.slug} />
          </div>
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default SingleBlog;
