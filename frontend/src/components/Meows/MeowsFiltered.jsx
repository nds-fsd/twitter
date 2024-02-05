import { useState, useEffect } from "react";
import { meowApi } from "../../functions/apiWrapper";
import styles from "./MeowsFiltered.module.css";
import user from "../../assets/user.png";
import LikeButton from "../Buttons/LikeButton";
import { useNavigate } from "react-router-dom";
import { formatMeowDate } from "../../functions/dateFormat";

function MeowsFiltered({ username }) {
  const [meows, setMeows] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getProfileMeows = async () => {
      try {
        const res = await meowApi().get(username);
        const meowsToShow = res.data.meowsProfile.map((meow) =>
          formatMeowDate(meow)
        );
        setMeows(meowsToShow.reverse());
        setName(res.data.user.name);
        setSurname(res.data.user.surname);
      } catch (error) {
        console.error(error);
      }
    };
    getProfileMeows();
  }, [username]);

  return (
    <div className={styles.bigContainer}>
      {meows &&
        meows.map((meow) => {
          return (
            <div
              onClick={(e) => {
                if (e.target.id === "likeButton") return;
                navigate(`/meow/${meow._id}`, { state: { meow } });
              }}
              key={meow._id}
              className={styles.container}
            >
              <div className={styles.userContainer}>
                <img src={user} />
                <p className={styles.nameText}>
                  {name} {surname}
                </p>
                <p className={styles.usernameText}>@{username}</p>
              </div>
              <div className={styles.postContainer}>
                <p>{meow.text}</p>
              </div>
              <div className={styles.likesContainer}>
                <LikeButton meow={meow} />
                <p>{meow.date}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
}
export default MeowsFiltered;
