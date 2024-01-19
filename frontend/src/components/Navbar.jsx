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
import { getUserSession } from "../local-storage";
import { userApi } from "../apis/apiWrapper";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom/dist";

function Navbar() {
  const navigateHome = useNavigate();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");

  const loggedUser = getUserSession();
  const loggedUsername = loggedUser.username;

  useEffect(() => {
    userApi
      .get(`/${loggedUsername}`)
      .then((response) => {
        const user = response.data;
        setName(user.name);
        setSurname(user.surname);
        setUsername(user.username);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
          <div
            onClick={() => navigateHome("/user/" + loggedUsername)}
            className={styles.options}
          >
            <img src={usuario} alt="." />
            <p>Profile</p>
          </div>
          {/* <button>Post</button> */}
        </div>
      </nav>
      <div className={styles.usuario}>
        <div className={styles.userInfo}>
          <p>
            {name} {surname}
          </p>
          <p className={styles.usernameColor}>@{username}</p>
        </div>
        <LogOut />
      </div>
    </div>
  );
}

export default Navbar;
