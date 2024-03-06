import React, { useState } from "react";
import styles from "./login.module.css";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import { Alert, CircularProgress } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../../store/auth/auth-slice";
const Login = () => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState("");
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
      matches: t("errors.password"),
      email: t("errors.email"),
    },
  });
  const formikProp = {
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required().email(),
      password: Yup.string()
        .required()
        .matches(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,15})/),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const user = await axios.post("/api/auth/signin", values);
        dispatch(setUser(user.data));
        setIsSubmitting(false);
        setShowAlert(true);
        setTimeout(() => {
          setRedirect(true);
        }, 1500);
      } catch (error) {
        setIsSubmitting(false);
        setError(error.message);
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
          Login successfull!
        </StyledAlert>
      )}
      <Formik {...formikProp}>
        {(formik) => (
          <>
            <Form className={styles.form}>
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
              {error && <p>{error}</p>}
              <p>
                If you don't have any account? Please{" "}
                <Link to='/register' className={styles.link}>
                  Register Page
                </Link>
              </p>
              <button type='submit' disabled={formik.isSubmitting}>
                {isSubmitting ? (
                  <CircularProgress size={24} color='inherit' />
                ) : (
                  t("buttons.submit")
                )}
              </button>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default Login;
