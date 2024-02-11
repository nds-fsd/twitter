import styles from "./MeowsFormat.module.css";
import LikeButton from "../Buttons/LikeButton";
import user from "../../assets/user.png";
import { useNavigate } from "react-router-dom";
import { formatMeowDate } from "../../functions/dateFormat";
import DeleteEditMeow from "./DeleteEditMeow";
const MeowReplies = ({ allMeowReplies, setAllMeowReplies }) => {
  const navigate = useNavigate();
  const meowsToShow = allMeowReplies.map((meow) => formatMeowDate(meow));

  return (
    <>
      {meowsToShow && (
        <div className={styles.bigContainer}>
          {meowsToShow.map((meow) => (
            <div key={meow._id || meow.text} className={styles.container}>
              <div className={styles.userContainer}>
                <img src={user} alt="user" className={styles.imageProfile} />
                <DeleteEditMeow
                  meow={meow}
                  meows={allMeowReplies}
                  setMeows={setAllMeowReplies}
                />
                <div className={styles.infoUserContainer}>
                  <div className={styles.userData}>
                    <p
                      onClick={() => navigate("/user/" + meow.authorUsername)}
                      className={styles.nameSurname}
                    >
                      {meow.authorName} {meow.authorSurname}
                    </p>
                    <p className={styles.username}>@{meow.authorUsername}</p>
                  </div>
                  <div>
                    <p className={styles.dateFormat}>{meow.date}</p>
                  </div>
                </div>
              </div>
              <div className={styles.postContainerInView}>
                <p>{meow.text}</p>
              </div>
              <div className={styles.iconsReplyContainer}>
                {meow._id && <LikeButton meow={meow} />}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MeowReplies;
