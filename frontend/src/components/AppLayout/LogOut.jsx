import styles from "./LogOut.module.css";
import { useState, useContext, useEffect } from "react";
import { context } from "../../App";
import { removeSession, getUserSession } from "../../functions/localStorage";
import { logo } from "../../assets/defaultAssets";
import { userApi } from "../../functions/apiWrapper";

const LogOut = () => {
  const reloadPage = useContext(context);
  const [popOut, setPopOut] = useState(false);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");

  const loggedUser = getUserSession();
  const loggedUsername = loggedUser.username;

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
    <>
      <div className={styles.usuario}>
        <div className={styles.userInfo}>
          <p>
            {name} {surname}
          </p>
          <p className={styles.usernameColor}>@{username}</p>
        </div>
        <button
          className={styles.mainButton}
          onClick={() => {
            setPopOut(true);
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          Logout
        </button>
      </div>

      {popOut && (
        <>
          <div className={`${styles.overlay} ${popOut ? styles.active : ""}`} />
          <div className={styles.popOut}>
            <img className={styles.logo} src={logo} />
            <h2>Log out of Meower?</h2>
            <p>You can always log back in at any time</p>
            <button
              className={styles.logoutButton}
              onClick={() => {
                removeSession();
                reloadPage.setIsLogged(false);
              }}
            >
              Log out
            </button>
            <button
              className={styles.cancelButton}
              onClick={() => setPopOut(false)}
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default LogOut;
