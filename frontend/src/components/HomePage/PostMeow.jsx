import styles from "./PostMeow.module.css";
import Swal from "sweetalert2";
import { meowApi } from "../../functions/apiWrapper.js";
import { useContext, useState } from "react";
import { context } from "../../App.jsx";
import PhotoUserProfile from "../Profile/PhotoUserProfile.jsx";
import { getUserSession } from "../../functions/localStorage.js";

function PostForm() {
  const [newMeow, setNewMeow] = useState("");
  const [error, setError] = useState(false);
  const reload = useContext(context);
  const photoStyle = "component";
  const { username } = getUserSession();

  const postNewMeow = async () => {
    try {
      const res = await meowApi().post("/", {
        meow: newMeow,
        date: Date.now(),
      });
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
        <PhotoUserProfile photoStyle={photoStyle} usernamePhoto={username} />
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
          rows="3"
          maxLength="300"
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
