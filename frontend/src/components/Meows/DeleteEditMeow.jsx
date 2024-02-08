import styles from "./DeleteEditMeow.module.css";
import { useState, useRef } from "react";
import options from "../../assets/options.jpg";
import del from "../../assets/delete.png";
import edit from "../../assets/edit.png";

const DeleteEditMeow = ({ meow }) => {
  const [popOut, setPopOut] = useState(false);
  const divRef = useRef();
  document.addEventListener("click", (e) => {
    if (divRef.current && divRef.current.contains(e.target)) {
      return;
    } else {
      setPopOut(false);
    }
  });

  return (
    <>
      <div ref={divRef} className={styles.container}>
        <img
          src={options}
          onClick={() => setPopOut(!popOut)}
          className={styles.dots}
        />

        {popOut && (
          <div className={styles.popOutContainer}>
            <div>
              <img src={edit} /> <span>Edit</span>
            </div>

            <div>
              <img src={del} /> <span style={{ color: "#b30b0b" }}>Delete</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DeleteEditMeow;
