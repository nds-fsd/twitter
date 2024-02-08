import styles from "./LogOut.module.css";
import { useState, useContext } from "react";
import { context } from "../../App";
import { removeSession } from "../../functions/localStorage";

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
          <img className={styles.logo} src={"https://res.cloudinary.com/dkfs5w0ga/image/upload/v1707388881/code/cat.png"} />
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
      )}
    </>
  );
};

export default LogOut;
