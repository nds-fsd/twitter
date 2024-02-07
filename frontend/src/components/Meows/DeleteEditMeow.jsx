import styles from "./DeleteEditMeow.module.css";
import { useState } from "react";

const DeleteEditMeow = ({ meow }) => {
  const [popOut, setPopOut] = useState(false);

  return (
    <>
      <button onClick={() => setPopOut(!popOut)} className={styles.mainButton}>
        ...
      </button>
      {popOut && <div className={styles.conteinre}></div>}
    </>
  );
};

export default DeleteEditMeow;
