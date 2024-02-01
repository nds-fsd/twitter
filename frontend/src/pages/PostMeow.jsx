import styles from "./PostMeow.module.css";
import image from "../assets/Elon-Musk.jpg";
import Swal from "sweetalert2";
import { getUserToken } from "../local-storage.js";
import { meowApi } from "../apis/apiWrapper.js";
import { useContext, useState } from "react";
import { context } from "../App.jsx";

function PostForm() {
  const [newMeow, setNewMeow] = useState("");
  const [error, setError] = useState(false);
  const token = getUserToken();
  const reload = useContext(context);
  const [color, setColor] = useState(false);
  const changeColor = () => {
    if (window.scrollY >= 70) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  window.addEventListener("scroll", changeColor);

  function handleKeyDown(e) {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  const postNewMeow = async () => {
    try {
      console.log(newMeow);
      const res = await meowApi.post(
        "/",
        { meow: newMeow, date: Date.now() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      setNewMeow("");
      reload.setReload(!reload.reload);
    } catch (err) {
      setError(true);
    }
  };
  if (error) {
    Swal.fire({
      text: "Ops, something went wrong!",
      icon: "error",
      confirmButtonColor: "#00A9A5",
      timer: "3000",
    });
    setError(false);
  }
  return (
    <div className={styles.container}>
      <div className={styles.containerPost}>
        <div className={color ? styles.header : styles.fixed}>
          <p>Here are your Meows!</p>
        </div>
        <img className={styles.accountImage} src={image} alt="Profile Photo" />
        <textarea
          value={newMeow}
          onChange={(e) => {
            handleKeyDown(e);
            setNewMeow(e.target.value);
          }}
          className={styles.postInput}
          name="text"
          id="text"
          cols="1"
          rows="5"
          placeholder="What is on your mind?"
        ></textarea>
      </div>
      <div className={styles.containerButtons}>
        <div>
          <p> </p>
        </div>
        <button
          disabled={!newMeow ? true : false}
          className={styles.postButton}
          onClick={postNewMeow}
        >
          Post
        </button>
      </div>
    </div>
  );
}

export default PostForm;
