import styles from "./DeleteEditMeow.module.css";
import { useState } from "react";
import options from "../../assets/options.jpg";

const DeleteEditMeow = ({ meow }) => {
  const [popOut, setPopOut] = useState(false);

  return (
    <>
      <div className={styles.container}>
        <img
          src={options}
          onClick={() => setPopOut(!popOut)}
          className={styles.dots}
        />

        {popOut && <div className={styles.popOutContainer}></div>}
      </div>
    </>
  );
};

export default DeleteEditMeow;
