import React from "react";
import PhotoUserProfile from "../Profile/PhotoUserProfile";
import styles from "./Message.module.css";

const Message = ({ user, text, date }) => {
  const photoStyle = "meow";
  let formattedDateString = "";

  if (date === undefined) {
    const formattedDate = new Date();
    formattedDateString = formattedDate.toLocaleString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } else {
    formattedDateString = date;
  }

  return (
    <div className={styles.container}>
      <PhotoUserProfile usernamePhoto={user} photoStyle={photoStyle} />
      <div className={styles.message}>
        <div className={styles.info}>
          <p className={styles.username}>{user}</p>
          <p className={styles.date}>{formattedDateString}</p>
        </div>
        <p className={styles.text}>{text}</p>
      </div>
    </div>
  );
};

export default Message;
