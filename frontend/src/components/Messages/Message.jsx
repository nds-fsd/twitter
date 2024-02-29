import PhotoUserProfile from "../Profile/PhotoUserProfile";
import styles from "./Message.module.css";

const Message = ({ user, text, date }) => {
  const photoStyle = "meow";

  return (
    <div className={styles.container}>
      <PhotoUserProfile usernamePhoto={user} photoStyle={photoStyle} />
      <div className={styles.message}>
        <div className={styles.info}>
          <p className={styles.username}>{user}</p>
          <p className={styles.date}>{date}</p>
        </div>
        <p className={styles.text}>{text}</p>
      </div>
    </div>
  );
};

export default Message;
