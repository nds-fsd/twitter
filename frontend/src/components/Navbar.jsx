import styles from "./Navbar.module.css";
import home from "../assets/hogar.png";
import campana from "../assets/campana.png";
import sobre from "../assets/sobre.png";
import usuario from "../assets/usuario.png";
import cat from "../assets/Cat.png";
import { removeSession } from "../local-storage";
import { useContext } from "react";
import { context } from "../App";

function Navbar() {
  const reloadPage = useContext(context);

  return (
    <div className={styles.container}>
      <img className={styles.logo} src={cat} alt="logo" />
      <nav className={styles.navbar}>
        <div className={styles.navigator}>
          <div className={styles.options}>
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
  );
}

export default Navbar;
