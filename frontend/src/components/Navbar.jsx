import styles from "./Navbar.module.css";
import home from "../assets/hogar.png";
import busqueda from "../assets/busqueda.png";
import campana from "../assets/campana.png";
import marcador from "../assets/marcador.png";
import menu from "../assets/menu.png";
import sobre from "../assets/sobre.png";
import square from "../assets/square.png";
import usuario from "../assets/usuario.png";
import user from "../assets/user.png";
import cat from "../assets/Cat.png";
import { removeSession } from "../local-storage";
import { useContext, useState, useEffect } from "react";
import { context } from "../App";
import { getUserSession } from "../local-storage";
import { userApi } from "../apis/apiWrapper";

function Navbar() {
  const reloadPage = useContext(context);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");

  const loggedUser = getUserSession();
  const loggedUsername = loggedUser.username

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
      <img className={styles.logo} src={cat} alt="logo" />
      <nav className={styles.navbar}>
        <div className={styles.navigator}>
          <div className={styles.options}>
            <img src={home} alt="." />
            <p>Home</p>
          </div>
          {/* <div className={styles.options}><img src={busqueda} alt="."/><p>Explore</p></div>
                <div className={styles.options}><img src={campana} alt="."/><p>Notifications</p></div>
                <div className={styles.options}><img src={sobre} alt="."/><p>Messages</p></div>
                <div className={styles.options}><img src={square} alt="."/><p>Lists</p></div>
                <div className={styles.options}><img src={marcador} alt="."/><p>Booksmarks</p></div> */}
          <div className={styles.options}>
            <img src={usuario} alt="." />
            <p>Profile</p>
          </div>
          {/* <div className={styles.options}><img src={menu} alt="."/><p>More</p></div> */}
          {/* <button>Post</button> */}
        </div>
      </nav>
      <div className={styles.usuario}>
        <img className={styles.user} src={user} alt="." />
        <div>
          <p>{name} {surname}</p>
          <p>@{username}</p>
          <button
            style={{
              width: "60px",
              height: "30px",
              fontSize: "13px",
              marginTop: "5px",
            }}
            onClick={() => {
              removeSession();
              reloadPage.setIsLogged(false);
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
