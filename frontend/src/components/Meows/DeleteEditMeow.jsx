import styles from "./DeleteEditMeow.module.css";
import { useState, useRef, useContext } from "react";
import options from "../../assets/options.jpg";
import del from "../../assets/delete.png";
import edit from "../../assets/edit.png";
import { meowApi } from "../../functions/apiWrapper";
import { context } from "../../App.jsx";

const DeleteEditMeow = ({ meow }) => {
  // ---------------------------------------------------------Variables-------------------------------------------------------

  const [popOut, setPopOut] = useState(false);
  const [editPopOut, setEditPopOut] = useState(false);
  const [deletePopOut, setDeletePopOut] = useState(false);
  const [meowToEdit, setMeowToEdit] = useState(meow.text);
  const divRef = useRef();
  const reload = useContext(context)

  // ------------------------------------------------Funciones-------------------------------------------------------------------

  document.addEventListener("click", (e) => {
    if (divRef.current && divRef.current.contains(e.target)) {
      return;
    } else {
      setPopOut(false);
    }
  });

  const handleKeyDown = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleClick = (e) => {
    if (e.target.id === "edit") {
      setPopOut(false);
      setEditPopOut(true);
    } else {
      setPopOut(false);
      setDeletePopOut(true);
    }
  };

  const updateMeow = async () => {
    try {
      const res = await meowApi().patch(meow._id, { text: meowToEdit });
      console.log(res);
      setEditPopOut(false);
      reload.setReload(!reload.reload)
    } catch (error) {
      console.log(error);
    }
  };

  // -------------------------------------------------------------------------------------------------------------------------

  return (
    <>
      <div ref={divRef} className={styles.container}>
        <img
          src={options}
          onClick={() => setPopOut(true)}
          className={styles.dots}
        />

        {popOut && (
          <div className={styles.popOutContainer}>
            <div>
              <img id="edit" src={edit} onClick={handleClick} />{" "}
              <span>Edit</span>
            </div>

            <div>
              <img id="delete" src={del} onClick={handleClick} />{" "}
              <span style={{ color: "#b30b0b" }}>Delete</span>
            </div>
          </div>
        )}
      </div>
      {editPopOut && (
        <div className={styles.editPopOut}>
          <textarea
            onChange={(e) => {
              handleKeyDown(e);
              setMeowToEdit(e.target.value);
            }}
            value={meowToEdit}
            name="text"
            id="text"
            cols="1"
            rows="3"
            maxLength="300"
          ></textarea>
          <div>
            <button
              onClick={() => setEditPopOut(false)}
              className={styles.cancelEdit}
            >
              Cancel
            </button>
            <button onClick={updateMeow} className={styles.saveEdit}>
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteEditMeow;
