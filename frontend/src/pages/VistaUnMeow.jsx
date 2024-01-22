import styles from "./VistaUnMeow.module.css";
import userpic from "../assets/user.png";
import flecha from "../assets/flecha-izquierda.png";

import { useParams } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { meowApi, userApi } from "../apis/apiWrapper";

const VistaUnMeow = ({ username }) => {
  function handleKeyDown(e) {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  const [meow, setMeow] = useState({});
  const [userName, setUserName] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const getDetails = async () => {
      const meowRes = await meowApi.get(id);
      const userRes = await userApi.get(`id/${meowRes.data.author}`);
      setMeow(meowRes.data);
      setUserName(userRes.data.username);

      console.log(meowRes.data);
    };

    getDetails();
  }, []);
  console.log(userName);

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
        <p className={styles.user}>{userName}</p>
      </div>

      <p className={styles.meow}>{meow.text}</p>
      <div className={styles.dateAndViews}>
        <span>11:34 AM 20/11/2023</span>
        <span>Views</span>
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
