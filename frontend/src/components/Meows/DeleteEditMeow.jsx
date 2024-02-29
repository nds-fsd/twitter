import styles from "./DeleteEditMeow.module.css";
import { useState, useRef, useEffect } from "react";
import { MoreHorizontal, Trash2, FilePenLine } from "lucide-react";
import { meowApi } from "../../functions/apiWrapper";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
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
  const location = useLocation();
  const isUserRoute = location.pathname.startsWith("/user/");
  const isMeowViewRoute = location.pathname.startsWith("/meow/");
  const [popOut, setPopOut] = useState(false);
  const [editPopOut, setEditPopOut] = useState(false);
  const [deletePopOut, setDeletePopOut] = useState(false);
  const [meowToEdit, setMeowToEdit] = useState(meow.text);
  const divRef = useRef();
  const textAreaRef = useRef();
  const navigate = useNavigate();

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
      if (isMeowViewRoute && !meow.parentMeow) {
        return setMeows(res.data.meowUpdated);
      }
      const updatedMeows = meows.map((element) => {
        if (element._id === meow._id) {
          return { ...element, text: meowToEdit };
        }
        return element;
      });
      setMeows(updatedMeows);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMeow = async () => {
    try {
      const res = await meowApi().delete(meow._id);
      setDeletePopOut(false);
      if (isMeowViewRoute && !meow.parentMeow) {
        return navigate("/home");
      }
      if (isMeowViewRoute) setReplyCounter(replyCounter - 1);

      const updatedMeows = meows.map((element) => {
        if (element._id === meow.repostedMeowId) {
          return { ...element, reposts: element.reposts - 1 };
        }
        return element;
      });

      setMeows(
        updatedMeows.filter(
          (element) =>
            element._id !== meow._id && element.repostedMeowId !== meow._id
        )
      );

      if (isUserRoute) setMeowCounter(meowCounter - 1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div ref={divRef} className={styles.container}>
        <MoreHorizontal onClick={() => setPopOut(true)} />

        {popOut && (
          <div className={styles.popOutContainer}>
            {!meow.repostedMeowId && (
              <div
                id="edit"
                onClick={handleClick}
                className={styles.editDeleteOptions}
              >
                <FilePenLine strokeWidth={1} color="grey" size={20} />
                <p className={styles.editDeleteTexts}>Edit</p>
              </div>
            )}

            <div
              id="delete"
              onClick={handleClick}
              className={styles.editDeleteOptions}
            >
              <Trash2 strokeWidth={1} color="#b30b0b" size={20} />
              <p
                className={styles.editDeleteTexts}
                style={{ color: "#b30b0b" }}
              >
                Delete
              </p>
            </div>
          </div>
        )}
      </div>

      {editPopOut && (
        <>
          <div
            className={`${styles.overlay} ${editPopOut ? styles.active : ""}`}
          />
          <div className={styles.editPopOut}>
            <p className={styles.editDeleteTitle}>Edit your Meow here</p>
            <textarea
              ref={textAreaRef}
              className={styles.editTextArea}
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
            <div className={styles.buttonsDiv}>
              <button
                onClick={() => {
                  setEditPopOut(false);
                  setMeowToEdit(meow.text);
                }}
                className={styles.cancelButton}
              >
                Cancel
              </button>
              <button onClick={updateMeow} className={styles.saveAndDelete}>
                Edit
              </button>
            </div>
          </div>
        </>
      )}

      {deletePopOut && (
        <>
          <div
            className={`${styles.overlay} ${deletePopOut ? styles.active : ""}`}
          />
          <div className={styles.deletePopOut}>
            <p className={styles.editDeleteTitle}>Are you sure?</p>
            <div className={styles.buttonsDiv}>
              <button
                onClick={() => setDeletePopOut(false)}
                className={styles.cancelButton}
              >
                Cancel
              </button>
              <button onClick={deleteMeow} className={styles.saveAndDelete}>
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DeleteEditMeow;
