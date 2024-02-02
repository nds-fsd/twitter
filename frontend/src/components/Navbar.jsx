import styles from "./Navbar.module.css";
import cat from "../assets/Cat.png";
import LogOut from "./LogOut";
import { useContext, useEffect, useState } from "react";
import { context } from "../App";
import { getUserSession } from "../local-storage";
import { userApi } from "../apis/apiWrapper";
import { useNavigate } from "react-router-dom";
import { Home, UserRound, Mail, BellRing, Bookmark } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");

  const loggedUser = getUserSession();
  const loggedUsername = loggedUser.username;

  const reload = useContext(context);

  useEffect(() => {
    userApi()
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
        onClick={() => navigate("/home")}
      />
      <nav className={styles.navbar}>
        <div className={styles.navigator}>
          <div className={styles.options} onClick={() => navigate("/home")}>
            <Home />
            <p>Home</p>
          </div>
          {/* <div className={styles.options}> <BellRing /> <p>Notifications</p> </div> */}
          {/* <div className={styles.options}> <Mail /> <p>Messages</p> </div> */}
          {/* <div className={styles.options}> <Bookmark /> <p>Bookmark</p> </div> */}
          <div
            onClick={() => {
              navigate("/user/" + loggedUsername);
              reload.setReload(!reload.reload);
            }}
            className={styles.options}
          >
            <UserRound />
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
