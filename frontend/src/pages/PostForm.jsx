import styles from "./PostForm.module.css";
import image from "../assets/Elon-Musk.jpg";
import Swal from "sweetalert2";
import { getUserToken } from "../local-storage";
import { meowApi } from "../apis/apiWrapper";
import { useContext, useState } from "react";
import { context } from "../App.jsx";

function PostForm() {
  const [newMeow, setNewMeow] = useState("");
  const [error, setError] = useState(false);
  const token = getUserToken();
  const reload = useContext(context);

  function handleKeyDown(e) {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  const postNewMeow = async () => {
    try {
      const res = await meowApi.post(
        "/",
        { meow: newMeow, date: new Date().toDateString() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      setNewMeow("");
      reload.setReload(true);
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
        <button className={styles.postButton} onClick={postNewMeow}>
          Post
        </button>
      </div>
    </div>
  );
}

export default PostForm;
