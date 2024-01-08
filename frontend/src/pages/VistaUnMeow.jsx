import styles from "./VistaUnMeow.module.css";
import userpic from "../assets/user.png";
import flecha from "../assets/flecha-izquierda.png";

const VistaUnMeow = ({ meow, user }) => {
  function handleKeyDown(e) {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  return (
    <div className={styles.container}>
      <div className={styles.firstContainer}>
        <div className={styles.postContainer}>
          <div className={styles.post}>
            <img src={flecha} alt="flecha" />
            <p>Post</p>
          </div>
        </div>
      </div>

      <div className={styles.username}>
        <img src={userpic} alt="user" />
        <p className={styles.user}>user.name</p>
      </div>

      <p className={styles.meow}>
        Lorem ipsum dolor sit, amet consec adipisicing elit. Sit, voluptatibus!
        Lorem ipsum dolor sit onsectetur adipisicing elit. Tempore,
        aliquam.asdad asdsad dsadadsan dsadsad dsadsadasdsa d sadsadsadasds
        sadsadsadasdss
      </p>
      <div className={styles.dateAndViews}>
        <span>11:34 AM 20/11/2023</span>
        <span className="views">Views</span>
      </div>

      <div className={styles.stats}>
        <span>💬​Reply</span>
        <span>🔁Repost</span>
        <span>❤️Likes</span>
        <span>🔖Bookmark</span>
        <span>🔗Share</span>
      </div>

      <div className={styles.replies}>
        <img src={userpic} alt="" />
        <textarea
          onChange={handleKeyDown}
          className={styles.textarea}
          placeholder="Post your reply"
        ></textarea>
        <button>Reply</button>
      </div>
    </div>
  );
};

export default VistaUnMeow;
