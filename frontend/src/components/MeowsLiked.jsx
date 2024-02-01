import { useState, useEffect } from "react";
import styles from "../pages/Meows.module.css";
import { useParams } from "react-router-dom";
import { meowApi } from "../apis/apiWrapper";
import user from "../assets/user.png";
import LikeButton from "./LikeButton";
import { getUserSession, getUserToken } from "../local-storage";
const MeowsLiked = () => {
  const [meows, setMeows] = useState("");

  console.log("holsa");

  useEffect(() => {
    const getMeows = async () => {
      console.log("wwwwwwwwwwww");
      try {
        const token = getUserToken();
        const { id } = getUserSession();
        const res = await meowApi().get(`likes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res);
        setMeows(res.data);
      } catch (error) {
        console.log(error, "te jodes");
      }
    };

    getMeows();
  }, []);

  return (
    <div className={styles.bigContainer}>
      {meows &&
        meows.map((meow) => {
          return (
            <div className={styles.container}>
              <div className={styles.userContainer}>
                <img src={user} />
                <p
                  onClick={() => {
                    navigate("/user/" + meow.authorUsername);
                    reload.setReload(!reload.reload);
                  }}
                  className={styles.nameSurname}
                >
                  {meow.nameAuthor} {meow.surnameAuthor}
                </p>
                <p className={styles.username}>@{meow.authorUsername}</p>
              </div>
              <div
                onClick={(e) => {
                  console.log(e.target.id);
                  if (e.target.id === "likeButton") return;
                  navigate(`/meow/${meow._id}`, { state: { meow } });
                }}
                key={meow._id}
                className={styles.postContainer}
              >
                <p>{meow.text}</p>
                <div className={styles.likesContainer}>
                  <p>
                    <LikeButton meow={meow} />
                  </p>
                  <p>{meow.date}</p>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default MeowsLiked;
