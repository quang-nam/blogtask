import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import styles from "./signup.module.css";
import styled from "@emotion/styled";
import { Navigate } from "react-router-dom";
import { Alert, CircularProgress } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/auth/auth-slice";
const SignUp = () => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();
  const StyledAlert = styled(Alert)({
    position: "fixed",
    top: "100px",
    right: "20px",
  });
  Yup.setLocale({
    mixed: {
      required: t("errors.required"),
    },
    string: {
      min: ({ min }) => t("errors.min", { min }),
      matches: t("errors.password"),
      oneOf: t("errors.confirmPassword"),
      email: t("errors.email"),
    },
  });
  const formikProp = {
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required().min(4),
      email: Yup.string().required().email(),
      password: Yup.string()
        .required()
        .matches(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,15})/),
      confirmPassword: Yup.string()
        .required()
        .oneOf(
          [Yup.ref("password"), t("errors.confirmPassword")],
          "Passwords must match"
        ),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const res = await axios.post("/api/auth/signup", values);
        dispatch(setUser(res.data));
        setIsSubmitting(false);
        setShowAlert(true);
        setTimeout(() => {
          setRedirect(true);
        }, 1500);
        // Xử lý logic sau khi đăng nhập thành công (ví dụ: điều hướng người dùng đến trang chính)
      } catch (error) {
        setIsSubmitting(false);
        console.error("Error submitting form:", error);
        // Xử lý khi có lỗi trong quá trình gửi yêu cầu đăng nhập
      }
    },
  };

  // custom component
  const customComponent = ({
    field,
    form: { touched, errors },
    type,
    ...props
  }) => (
    <>
      <label htmlFor={field.name}>{props.labelname}</label>
      <input
        type={type}
        className={styles.input}
        placeholder={props.placeholder}
        {...field}
      />
      {errors[field.name] && touched[field.name] ? (
        <span className={styles.errorMsg}>{errors[field.name]}</span>
      ) : null}
    </>
  );
  return (
    <div className={styles.App}>
      {redirect && <Navigate to='/' />}
      {showAlert && (
        <StyledAlert
          severity='success'
          onClose={() => setShowAlert(false)}
          sx={{ width: "300px" }}
        >
          Register Successfully!!!
        </StyledAlert>
      )}
      <Formik {...formikProp}>
        {(formik) => (
          <Form className={styles.form}>
            <Field
              name='username'
              placeholder={t("placeholders.username")}
              component={customComponent}
              labelname={t("placeholders.username")}
            />
            <Field
              name='email'
              placeholder={t("placeholders.email")}
              component={customComponent}
              labelname={t("placeholders.email")}
            />
            <Field
              name='password'
              placeholder={t("placeholders.password")}
              type='password'
              component={customComponent}
              labelname={t("placeholders.password")}
            />
            <Field
              name='confirmPassword'
              type='password'
              placeholder={t("placeholders.confirmPassword")}
              component={customComponent}
              labelname={t("placeholders.confirmPassword")}
            />
            <button type='submit' disabled={formik.isSubmitting}>
              {isSubmitting ? (
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

export default SignUp;
