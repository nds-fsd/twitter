import styles from "./Post-form.module.css";
import image from "../assets/Elon-Musk.jpg";

function PostForm() {
  function handleKeyDown(e) {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

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
        <button className={styles.postButton}>Post</button>
      </div>
    </div>
  );
}

export default PostForm;
