import styles from "./DeleteEditMeow.module.css";
import { useState, useRef, useEffect } from "react";
import options from "../../assets/options.jpg";
import del from "../../assets/delete.png";
import edit from "../../assets/edit.png";
import { meowApi } from "../../functions/apiWrapper";
import { useLocation } from "react-router-dom";
import {
  ajustarAlturaTextArea,
  handleKeyDown,
} from "../../functions/adjustTextAreaHeight";

const DeleteEditMeow = ({
  meow,
  setMeows,
  meows,
  replyCounter,
  setReplyCounter,
  meowCounter,
  setMeowCounter,
}) => {
  // ---------------------------------------------------------Variables-------------------------------------------------------
  const location = useLocation();
  const isUserRoute = location.pathname.startsWith("/user/");
  const [popOut, setPopOut] = useState(false);
  const [editPopOut, setEditPopOut] = useState(false);
  const [deletePopOut, setDeletePopOut] = useState(false);
  const [meowToEdit, setMeowToEdit] = useState(meow.text);
  const divRef = useRef();
  const textAreaRef = useRef();

  // ------------------------------------------------Funciones-------------------------------------------------------------------

  document.addEventListener("click", (e) => {
    if (divRef.current && divRef.current.contains(e.target)) {
      return;
    } else {
      setPopOut(false);
    }
  });

  useEffect(() => {
    if (editPopOut) {
      ajustarAlturaTextArea(textAreaRef);
    }
  }, [editPopOut]);

  const handleClick = (e) => {
    if (e.target.innerHTML === "Edit" || e.target.id === "edit") {
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
      setEditPopOut(false);
      const updatedMeows = meows.map((element) => {
        if (element._id === meow._id) {
          return { ...element, text: meowToEdit };
        }
        return element;
      });
      setMeows(updatedMeows);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMeow = async () => {
    try {
      const res = await meowApi().delete(meow._id);
      setDeletePopOut(false);

      setMeows(
        meows.filter(
          (element) =>
            element._id !== meow._id && element.repostedMeowId !== meow._id
        )
      );
      if (isUserRoute) setMeowCounter(meowCounter - 1);
      if (meow.parentMeowId) setReplyCounter(replyCounter - 1);
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
            <div id="edit" onClick={handleClick}>
              <img id="edit" src={edit} /> <span>Edit</span>
            </div>

            <div id="delete" onClick={handleClick}>
              <img src={del} /> <span style={{ color: "#b30b0b" }}>Delete</span>
            </div>
          </div>
        )}
      </div>
      {editPopOut && (
        <div className={styles.editPopOut}>
          <textarea
            ref={textAreaRef}
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
              onClick={() => {
                setEditPopOut(false);
                setMeowToEdit(meow.text);
              }}
              className={styles.cancelEdit}
            >
              Cancel
            </button>
            <button onClick={updateMeow} className={styles.saveEdit}>
              Edit
            </button>
          </div>
        </div>
      )}
      {deletePopOut && (
        <div className={styles.deletePopOut}>
          <div>
            <p>Are you sure?</p>
            <div className={styles.deleteButtons}>
              <button onClick={() => setDeletePopOut(false)}>Cancel</button>
              <button onClick={deleteMeow} style={{ color: "red" }}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteEditMeow;
