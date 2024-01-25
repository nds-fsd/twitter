import styles from "./MeowReplies.module.css";
import { userApi } from "../apis/apiWrapper";
import { useState, useEffect } from "react";
import user from "../assets/user.png";

const MeowReplies = ({ allMeowReplies }) => {
  return (
    <>
      {allMeowReplies && (
        <div className={styles.bigContainer}>
          {allMeowReplies.map((meow) => (
            <div key={meow._id} className={styles.container}>
              <div className={styles.meowsContainer}>
                <div className={styles.userContainer}>
                  <img src={user} alt="user" />
                  <p>{meow.authorUsername}</p>
                </div>
                <p>{meow.text}</p>
              </div>
              <div className={styles.likesContainer}>
                <p>{meow.likes}</p>
                <p>{meow.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MeowReplies;
