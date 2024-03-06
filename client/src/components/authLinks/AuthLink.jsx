import React, { useState } from "react";
import styles from "./auth.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { deleteUser, setUser } from "../../store/auth/auth-slice";
import { axiosInstance } from "../../createInstance";
const AuthLink = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const username = useSelector((state) => state.authSlice.auth.user?.username);
  const isAdmin = useSelector((state) => state.authSlice.auth.user?.role);
  const id = useSelector((state) => state.authSlice.auth.user?.id);
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state) => state.authSlice.auth.user?.access_token
  );
  let axiosJwt = axiosInstance(accessToken, setUser, dispatch);

  const path = useLocation();
  const handleLogout = async () => {
    await axiosJwt.post("/api/auth/logout", id, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(deleteUser());
    navigate("/login");
  };
  return (
    <>
      {!username ? (
        <Link
          className={`${styles.link} ${
            path.pathname === "/login" && styles.active
          }`}
          to='/login'
        >
          Login
        </Link>
      ) : (
        <>
          {isAdmin === "ADMIN" && (
            <Link
              className={`${styles.link} ${
                path.pathname === "/admin" && styles.active
              }`}
              to='/admin'
            >
              Admin
            </Link>
          )}
          <Link
            className={`${styles.link} ${
              path.pathname === "/write" && styles.active
            }`}
            to='/write'
          >
            Write
          </Link>
          <span className={styles.link} onClick={handleLogout}>
            Logout
          </span>
        </>
      )}
      <div className={styles.burger} onClick={() => setOpen(!open)}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>

      {open && (
        <div className={styles.menu}>
          <Link to='/'>Homepage</Link>
          <Link to='/contact'>Contact</Link>
          <Link to='/about'>About</Link>
          {!username ? (
            <Link href='/login'>Login</Link>
          ) : (
            <>
              <Link href='/write'>Write</Link>
              <span className={styles.link}>Logout</span>
            </>
          )}
          {isAdmin === "ADMIN" && <Link to='/admin'>Admin</Link>}
        </div>
      )}
    </>
  );
};

export default AuthLink;
