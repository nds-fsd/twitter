import styles from "./PostForm.module.css";
import image from "../assets/Elon-Musk.jpg";
import { useState } from "react";
import { event } from "jquery";

function PostForm() {
  function handleKeyDown(e) {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  const [text, setText] = useState("");
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({ text: "" });
  const [responseError, setResponseError] = useState(false);

  const handleText = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = (event) => {
    console.log(text);
    const data = { text, id };
    let error = { ...errors };

    if (!text) {
      setErrors({ text: "Text required" });
    }

    fetch("", {
      method: "POST",
    })
      .then((response) => {
        console.log(response);
        if (response.status !== 200) {
          setResponseError(true);
        }
        return response.json();
      })
      .then((data) => {
        setSuccess(true);
      })
      .catch((error) => {
        setResponseError(true);
      });
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
        <button className={styles.postButton} onSubmit={handleSubmit}>
          Post
        </button>
      </div>
    </div>
  );
}

export default PostForm;
