import PhotoUserProfile from "../Profile/PhotoUserProfile";
import styles from "./Message.module.css";

const Message = ({ user, text, date }) => {
  const photoStyle = "meow";

  return (
    <div className={styles.container}>
      <div className={styles.userInfo}>
        <PhotoUserProfile usernamePhoto={user} photoStyle={photoStyle} />
        <div className={styles.info}>
          <p className={styles.username}>{user}</p>
          <p className={styles.date}>{date}</p>
        </div>
      </div>
      <div className={styles.messageInfo}>
        <p className={styles.text}>{text}</p>
      </div>
    </div>
  );
};

export default Message;
