import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { Link, useLocation, useParams } from "react-router-dom";
import i18next from "i18next";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import ThemeToogle from "../themeToggle/ThemeToogle";
import AuthLink from "../authLinks/AuthLink";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Public } from "@mui/icons-material";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
const Navbar = () => {
  const languages = [
    {
      code: "vi",
      name: "Vietnamese",
      country_code: "vn",
    },
    {
      code: "en",
      name: "English",
      country_code: "gb",
    },
  ];

  const links = [
    {
      title: "Homepage",
      path: "/",
    },
    {
      title: "About",
      path: "/about",
    },
    {
      title: "Contact",
      path: "/contact",
    },
  ];
  const [language, setLanguage] = useState("");
  const handleChange = (e) => {
    setLanguage(e.target.value);
  };
  const pathName = useLocation();
  const { theme } = useContext(ThemeContext);

  return (
    <div className={styles.container}>
      <div className={styles.social}>
        <img src='/facebook.png' alt='facebook' width={24} height={24} />
        <img src='/instagram.png' alt='instagra' width={24} height={24} />
        <img src='/tiktok.png' alt='tiktok' width={24} height={24} />
        <img src='/youtube.png' alt='youtube' width={24} height={24} />
      </div>
      <div className={styles.logo}>Nam Blog</div>
      <div className={styles.links}>
        <ThemeToogle />
        {links.map(({ title, path }) => (
          <Link
            className={`${styles.link} ${
              pathName.pathname === path && styles.active
            }`}
            key={title}
            to={path}
          >
            {title}
          </Link>
        ))}
        <AuthLink />
        <FormControl>
          <InputLabel id='language-label'>
            <Public
              sx={{
                width: "22px",
                marginLeft: "-2px",
                borderRadius: "50%",
                color: theme === "dark" ? "white" : "black",
              }}
            />
          </InputLabel>
          <Select
            labelId='language-label'
            id='language-select'
            label='Language'
            sx={{
              paddingRight: "15px",
              "& .MuiSelect-root": {
                border: "none",
                borderBottom: "1px solid white",
              },
              "& .MuiSelect-icon": {
                color: theme === "dark" ? "white" : "black",
              },
            }}
            onChange={handleChange}
            value={language}
          >
            {languages.map(({ code, name, country_code }) => (
              <MenuItem
                key={code}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  "&:hover": {
                    background: "rgba(255, 255, 255, 0.1)",
                  },
                }}
                onClick={() => i18next.changeLanguage(code)}
                value={country_code}
              >
                <span className={`fi fi-${country_code} `}></span>
                {/* {name} */}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default Navbar;
