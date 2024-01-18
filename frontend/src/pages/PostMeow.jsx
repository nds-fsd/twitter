import React, { useState } from "react";
import styles from "./PostMeow.module.css";
import image from "../assets/Elon-Musk.jpg";
import { meowApi } from "../apis/apiWrapper";
import { getUserToken } from "../local-storage";

function PostMeow() {
  const [postText, setPostText] = useState("");

  const handleKeyDown = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
    setPostText(e.target.value);
  };

  const handlePostClick = async () => {
    try {
      const date = new Date().toDateString();
      const token = getUserToken();

      if (!token) {
        console.error("Token is not defined");
        return;
      }

      const response = await meowApi.post(
        "/",
        { text: postText, date },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 201) {
        console.log("Post creado exitosamente");
      } else {
        console.error("Error al crear el post:", response.data);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerPost}>
        <img className={styles.accountImage} src={image} alt="Profile Photo" />
        <textarea
          onChange={handleKeyDown}
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
        <button className={styles.postButton} onClick={handlePostClick}>
          Post
        </button>
      </div>
    </div>
  );
}

export default PostMeow;
