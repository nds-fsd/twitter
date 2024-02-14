import styles from "./MeowsFormat.module.css";
import { useNavigate } from "react-router-dom";
import { formatMeowDate } from "../../functions/dateFormat";
import PhotoUserProfile from "../Profile/PhotoUserProfile";
import AllMeowButtons from "../Buttons/AllMeowButtons";
// import LikeButton from "../Buttons/LikeButton";
// import BookmarkButton from "../Buttons/BookmarkButton";
import DeleteEditMeow from "./DeleteEditMeow";

const MeowReplies = ({
  allMeowReplies,
  setAllMeowReplies,
  setReplyCounter,
  replyCounter,
}) => {
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
                <DeleteEditMeow
                  meow={meow}
                  meows={allMeowReplies}
                  setMeows={setAllMeowReplies}
                  setReplyCounter={setReplyCounter}
                  replyCounter={replyCounter}
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
              <div className={styles.iconsContainer}>
                {/* <div className={styles.iconsReplyContainer}>
                <LikeButton meow={meow} />
                <BookmarkButton meow={meow} /> */}
                <AllMeowButtons meow={meow} />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MeowReplies;
