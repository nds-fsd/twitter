import styles from "./Navbar.module.css";
import home from "../assets/hogar.png";
import campana from "../assets/campana.png";
import sobre from "../assets/sobre.png";
import usuario from "../assets/usuario.png";
import cat from "../assets/Cat.png";
import LogOut from "./LogOut";
import { removeSession } from "../local-storage";
import { useContext, useEffect, useState } from "react";
import { context } from "../App";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigateHome = useNavigate();

  return (
    <div className={styles.container}>
      <img
        className={styles.logo}
        src={cat}
        alt="logo"
        onClick={() => navigateHome("/home")}
      />
      <nav className={styles.navbar}>
        <div className={styles.navigator}>
          <div className={styles.options} onClick={() => navigateHome("/home")}>
            <img src={home} alt="." />
            <p>Home</p>
          </div>
          {/*<div className={styles.options}><img src={campana} alt="."/><p>Notifications</p></div>
              <div className={styles.options}><img src={sobre} alt="."/><p>Messages</p></div>*/}
          <div className={styles.options}>
            <img src={usuario} alt="." />
            <p>Profile</p>
          </div>
          {/* <button>Post</button> */}
        </div>
      </nav>
      <div className={styles.usuario}>
        <LogOut />
      </div>
    </div>
  );
}

export default Navbar;
