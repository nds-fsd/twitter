import styles from "./MeowsFormat.module.css";
import LikeButton from "../Buttons/LikeButton";
import { useNavigate } from "react-router-dom";
import { formatMeowDate } from "../../functions/dateFormat";
import PhotoUserProfile from "../Profile/PhotoUserProfile";

const MeowReplies = ({ allMeowReplies }) => {
  const navigate = useNavigate();
  const meowsToShow = allMeowReplies.map((meow) => formatMeowDate(meow));
  const photoStyle = "meow";

  return (
    <>
      {meowsToShow && (
        <div className={styles.bigContainer}>
          {meowsToShow.map((meow) => (
            <div key={meow._id} className={styles.container}>
              <div className={styles.userContainer}>
                <PhotoUserProfile
                  photoStyle={photoStyle}
                  usernamePhoto={meow.authorUsername}
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
                <LikeButton meow={meow} />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MeowReplies;
