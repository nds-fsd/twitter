import styles from "./LogOut.module.css";
import Cat from "../assets/Cat.png";
import { useState, useContext } from "react";
import { context } from "../App";
import { removeSession } from "../local-storage";

const LogOut = () => {
  const reloadPage = useContext(context);
  const [popOut, setPopOut] = useState(false);
  return (
    <>
      <button
        className={styles.mainButton}
        onClick={() => {
          setPopOut(true);
        }}
      >
        Logout
      </button>
      {popOut && (
        <div className={styles.popOut}>
          <img className={styles.logo} src={Cat} />
          <h2>Log out of Meower?</h2>
          <p>You can always log back in at any time.</p>
          <button
            onClick={() => {
              removeSession();
              reloadPage.setIsLogged(false);
            }}
          >
            Log out
          </button>
          <button onClick={() => setPopOut(false)}>Cancel</button>
        </div>
      )}
    </>
  );
};

export default LogOut;
