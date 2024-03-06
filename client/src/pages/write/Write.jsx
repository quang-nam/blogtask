import styled from "@emotion/styled";
import { Alert, Box } from "@mui/material";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LinearProgressWithLabel from "../../components/utils/LinearProgress";
import app from "../../components/utils/firebase";
import { axiosInstance } from "../../createInstance";
import { setUser } from "../../store/auth/auth-slice";
import styles from "./write.module.css";
const Write = () => {
  const [open, setOpen] = useState(false);
  // image, subscrition, title
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [img, setImg] = useState("");
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [upload, setUpload] = useState(false);
  const StyledAlert = styled(Alert)({
    position: "fixed",
    top: "100px",
    right: "20px",
  });
  const accessToken = useSelector(
    (state) => state.authSlice.auth.user?.access_token
  );
  const navigate = useNavigate();
  useEffect(() => {
    const storage = getStorage(app);
    const upload = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {},
        () => {
          //download image to handle
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUpload(true);
            setImg(downloadURL);
          });
        }
      );
    };

    file && upload();
  }, [file]);

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const newPost = {
    title,
    desc: description,
    img: img,
    slug: slugify(title),
    catSlug: catSlug || "style",
  };
  const dispatch = useDispatch();
  let axiosJwt = axiosInstance(accessToken, setUser, dispatch);
  const handleSubmit = async () => {
    const res = await axiosJwt.post("/api/post", newPost, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const data = res.data;
    setShowAlert(true);
    setTimeout(() => {
      navigate(`/blog/${data.id}`);
    }, 1500);
  };
  return (
    <div className={styles.container}>
      <input
        type='text'
        placeholder='Title'
        className={styles.input}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select
        className={styles.select}
        onChange={(e) => setCatSlug(e.target.value)}
      >
        <option value='style'>style</option>
        <option value='fashion'>fashion</option>
        <option value='food'>food</option>
        <option value='culture'>culture</option>
        <option value='travel'>travel</option>
        <option value='coding'>coding</option>
      </select>
      <div className={styles.editor}>
        <div className={styles.button} onClick={() => setOpen(!open)}>
          <img src='/plus.png' alt='' width={16} height={16} />
        </div>
        {open && (
          <div className={styles.add}>
            {upload ? (
              <Box>
                <LinearProgressWithLabel
                  value={uploadProgress}
                  sx={{ color: "green" }}
                />
              </Box>
            ) : (
              <input
                type='file'
                id='image'
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            )}
            <button className={styles.addButton}>
              <label htmlFor='image'>
                <img src='/image.png' alt='' width={16} height={16} />
              </label>
            </button>
            <button className={styles.addButton}>
              <img src='/external.png' alt='' width={16} height={16} />
            </button>
            <button className={styles.addButton}>
              <img src='/video.png' alt='' width={16} height={16} />
            </button>
          </div>
        )}

        <ReactQuill
          className={styles.textArea}
          theme='bubble'
          value={description}
          onChange={setDescription}
          placeholder='Tell your story...'
        />
      </div>
      {showAlert ? (
        <StyledAlert
          severity='success'
          onClose={() => setShowAlert(false)}
          sx={{ width: "300px" }}
        >
          Write Successfull!
        </StyledAlert>
      ) : (
        <button className={styles.publish} onClick={handleSubmit}>
          Publish
        </button>
      )}
    </div>
  );
};

export default Write;
