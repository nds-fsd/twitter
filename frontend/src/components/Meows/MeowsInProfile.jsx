import { useState, useEffect } from "react";
import { meowApi } from "../../functions/apiWrapper";
import styles from "./MeowsFormat.module.css";
import { useNavigate } from "react-router-dom";
import { formatMeowDate } from "../../functions/dateFormat";
import PhotoUserProfile from "../Profile/PhotoUserProfile.jsx";
import AllMeowButtons from "../Buttons/AllMeowButtons.jsx";

function MeowsInProfile({ username }) {
  const [meows, setMeows] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const photoStyle = "meow";

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
            <div key={meow._id} className={styles.container}>
              <div className={styles.userContainer}>
                <PhotoUserProfile
                  photoStyle={photoStyle}
                  usernamePhoto={username}
                />
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
                <AllMeowButtons meow={meow} />
              </div>
            </div>
          );
        })}
    </div>
  );
}
export default MeowsInProfile;
