import styles from "./PostForm.module.css";
import image from "../assets/Elon-Musk.jpg";
import { getUserToken } from "../local-storage";
import { meowApi } from "../apis/apiWrapper";
import { useState } from "react";

function PostForm() {
  const [newMeow, setNewMeow] = useState("");
  const token = getUserToken();

  const postNewMeow = async () => {
    try {
      const res = await meowApi.post("/", {});
    } catch (err) {}
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerPost}>
        <img className={styles.accountImage} src={image} alt="Profile Photo" />
        <textarea
          onChange={(e) => {
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
        <button className={styles.postButton}>Post</button>
      </div>
    </div>
  );
}

export default PostForm;
