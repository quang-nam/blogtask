import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import styles from "./adminPostForm.module.css";
import { Field, Form, Formik } from "formik";
import styled from "@emotion/styled";
import { Alert, CircularProgress } from "@mui/material";
import { axiosInstance } from "../../createInstance";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/auth/auth-slice";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../utils/firebase";
const StyledAlert = styled(Alert)({
  position: "fixed",
  top: "100px",
  right: "20px",
});
const AdminPostForm = () => {
  const { t } = useTranslation();
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const accessToken = useSelector(
    (state) => state.authSlice.auth.user?.access_token
  );
  const dispatch = useDispatch();
  let axiosJwt = axiosInstance(accessToken, setUser, dispatch);
  Yup.setLocale({
    mixed: {
      required: t("errors.required"),
    },
  });
  const formikProps = {
    initialValues: {
      title: "",
      desc: "",
      img: "",
      catSlug: "",
      slug: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required(),
      desc: Yup.string().required(),
      img: Yup.string().required(),
      catSlug: Yup.string().required(),
      slug: Yup.string().required(),
    }),
  };

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  const handleSubmit = async (values) => {
    console.log(values);
    setIsSubmiting(true);
    try {
      await axiosJwt.post("/api/post", values, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setIsSubmiting(false);
      setTimeout(() => {
        setShowAlert(true);
      }, 1500);
    } catch (error) {
      setIsSubmiting(false);
    }
  };

  const handleFileChange = async (event, formik) => {
    const file = event.currentTarget.files[0];
    const storage = getStorage(app);
    const storageRef = ref(storage, new Date().getTime() + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Error uploading file:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            formik.setFieldValue("img", downloadURL); // Update the value of img field in Formik
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
          });
      }
    );
  };
  return (
    <div className={styles.App}>
      {showAlert && (
        <StyledAlert
          severity='success'
          onClose={() => setShowAlert(false)}
          sx={{ width: "300px" }}
        >
          Create successfull!
        </StyledAlert>
      )}
      <Formik {...formikProps} onSubmit={handleSubmit}>
        {(formik) => (
          <Form className={styles.form}>
            <h1 className={styles.title}>Add new post</h1>
            <div className={styles.formGroup}>
              <label htmlFor='title'>Title</label>
              <Field
                type='text'
                name='title'
                id='title'
                placeholder='Enter title'
                className={styles.input}
              />
              <span className={styles.errorMsg}>
                {formik.touched.title && formik.errors.title}
              </span>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor='catSlug'>Category</label>
              <Field
                as='select'
                type='text'
                name='catSlug'
                id='catSlug'
                className={styles.input}
              >
                <option value='style'>style</option>
                <option value='fashion'>fashion</option>
                <option value='food'>food</option>
                <option value='culture'>culture</option>
                <option value='travel'>travel</option>
                <option value='coding'>coding</option>
              </Field>
              <span className={styles.errorMsg}>
                {formik.touched.desc && formik.errors.desc}
              </span>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor='img'>Image</label>
              <input
                type='file'
                id='img'
                name='img'
                className={styles.input}
                onChange={(event) => handleFileChange(event, formik)}
              />
              <span className={styles.errorMsg}>
                {formik.touched.img && formik.errors.img}
              </span>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor='desc'>Description</label>
              <Field
                as='textarea'
                type='text'
                name='desc'
                id='desc'
                placeholder='Enter description'
                className={styles.textarea}
              />
              <span className={styles.errorMsg}>
                {formik.touched.desc && formik.errors.desc}
              </span>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor='slug'>Slug</label>
              <Field
                type='text'
                name='slug'
                id='slug'
                placeholder='Enter slug'
                className={styles.input}
              />
              <span className={styles.errorMsg}>
                {formik.touched.slug && formik.errors.slug}
              </span>
            </div>
            <button type='submit'>
              {isSubmiting ? (
                <CircularProgress size={24} color='inherit' />
              ) : (
                t("buttons.submit")
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AdminPostForm;
