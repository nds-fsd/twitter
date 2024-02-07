import { useState, useEffect } from "react";
import { meowApi } from "../../functions/apiWrapper";
import styles from "./MeowsFormat.module.css";
import user from "../../assets/user.png";
import MessageButton from "../Buttons/MessageButton";
import LikeButton from "../Buttons/LikeButton.jsx";
import RepostButton from "../Buttons/RepostButton.jsx";
import Bookmark from "../Buttons/BookmarkButton";
import Views from "../Buttons/Views";
import ShareButton from "../Buttons/ShareButton";
import { useNavigate } from "react-router-dom";
import { formatMeowDate } from "../../functions/dateFormat";

function MeowsInProfile({ username }) {
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
            <div className={styles.container}>
              <div className={styles.userContainer}>
                <img src={user} className={styles.imageProfile} />
                <div className={styles.infoUserContainer}>
                  <div className={styles.userData}>
                    <p className={styles.nameSurname}>
                      {name} {surname}
                    </p>
                    <p className={styles.username}>@{username}</p>
                  </div>
                  <div>
                    <p className={styles.dateFormat}>{meow.date}</p>
                  </div>
                </div>
              </div>
              <div
                onClick={(e) => {
                  if (e.target.id === "likeButton") return;
                  navigate(`/meow/${meow._id}`, { state: { meow } });
                }}
                key={meow._id}
                className={styles.postContainer}
              >
                <p>{meow.text}</p>
              </div>
              <div className={styles.iconsContainer}>
                <MessageButton />
                <LikeButton meow={meow} />
                <RepostButton meow={meow} />
                <Bookmark />
                <Views />
                <ShareButton />
              </div>
            </div>
          );
        })}
    </div>
  );
}
export default MeowsInProfile;
