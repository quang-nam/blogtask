import React, { useContext } from 'react'
import styles from './themeToggle.module.css'
import { ThemeContext } from '../../context/ThemeContext'
const ThemeToogle = () => {
  const {theme, toggle}= useContext(ThemeContext)
  return (
    <div className={styles.container} onClick={toggle}>
      <img src="/moon.png" alt="moon" width={14} height={14} />
      <div 
      className={styles.ball}
      style={
        theme==='dark'
        ? {transform:  'translateX(1px)', backgroundColor:'#f9f9f9'}
        : {transform: 'translateX(23px)', backgroundColor:'#f9f9f9'}
      }
      >

      </div>
      <img src="/sun.png" alt="sun" width={14} height={14} />
    </div>
  )
}

export default ThemeToogle