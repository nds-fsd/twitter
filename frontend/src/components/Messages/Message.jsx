import PhotoUserProfile from "../Profile/PhotoUserProfile";
import styles from "./Message.module.css";

const Message = ({ user, text }) => {
  const photoStyle = "meow";
  return (
    <div className={styles.message}>
      <PhotoUserProfile usernamePhoto={user} photoStyle={photoStyle} />
      <div>
        <p className={styles.username}>{user}</p>
        {text}
      </div>
    </div>
  );
};

export default Message;
