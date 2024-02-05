import styles from "./MeowReplies.module.css";
import LikeButton from "../Buttons/LikeButton";
import user from "../../assets/user.png";
import { useNavigate } from "react-router-dom";
import { formatMeowDate } from "../../functions/dateFormat";
const MeowReplies = ({ allMeowReplies }) => {
  const navigate = useNavigate();
  const meowsToShow = allMeowReplies.map((meow) => formatMeowDate(meow));

  return (
    <>
      {meowsToShow && (
        <div className={styles.bigContainer}>
          {meowsToShow.map((meow) => (
            <div key={meow._id} className={styles.container}>
              <div className={styles.meowsContainer}>
                <div className={styles.userContainer}>
                  <img src={user} alt="user" />
                  <p
                    onClick={() => navigate("/user/" + meow.authorUsername)}
                    className={styles.nameSurname}
                  >
                    {meow.authorName} {meow.authorSurname}
                  </p>
                  <p className={styles.username}>@{meow.authorUsername}</p>
                </div>
                <p>{meow.text}</p>
              </div>
              <div className={styles.likesContainer}>
                <p>
                  <LikeButton meow={meow} />
                </p>
              </div>
              <p>{meow.date}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MeowReplies;
