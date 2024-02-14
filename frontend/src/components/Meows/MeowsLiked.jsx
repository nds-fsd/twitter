import { useState, useEffect, useContext } from "react";
import { meowApi, userApi } from "../../functions/apiWrapper";
import styles from "./MeowsFormat.module.css";
import MessageButton from "../Buttons/MessageButton";
import LikeButton from "../Buttons/LikeButton";
import RepostButton from "../Buttons/RepostButton.jsx";
import Bookmark from "../Buttons/BookmarkButton";
import Views from "../Buttons/Views";
import ShareButton from "../Buttons/ShareButton";
import { getUserSession } from "../../functions/localStorage";
import Loading from "../../effects/Loading";
import { useNavigate } from "react-router-dom";
import { context } from "../../App";
import { formatMeowDate } from "../../functions/dateFormat";
import PhotoUserProfile from "../Profile/PhotoUserProfile.jsx";
import DeleteEditMeow from "./DeleteEditMeow.jsx";

const MeowsLiked = ({ meowCounter, setMeowCounter }) => {
  const [meows, setMeows] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const photoStyle = "meow";
  const { id } = getUserSession();
  const userId = id;

  const navigate = useNavigate();

  const reload = useContext(context);

  useEffect(() => {
    const getAllMeows = async () => {
      try {
        setLoading(true);
        const res = await meowApi().get(`likes/${id}`);
        setLoading(false);
        const data = res.data;

        setMeows(data.reverse());

        const uniqueAuthorIds = Array.from(
          new Set(data.map((meow) => meow.author))
        );
        const authorDetails = await Promise.all(
          uniqueAuthorIds.map(async (authorId) => {
            try {
              const userRes = await userApi().get(`/id/${authorId}`);
              return {
                authorId,
                username: userRes.data.username,
                nameUser: userRes.data.name,
                surnameUser: userRes.data.surname,
              };
            } catch (userError) {
              console.error(
                `Error fetching user with ID ${authorId}: ${userError.message}`
              );
              return {
                authorId,
                username: "Unknown User",
              };
            }
          })
        );
        const meowsWithUsernames = data.map((meow) => {
          const authorDetail = authorDetails.find(
            (detail) => detail.authorId === meow.author
          );
          return {
            ...meow,
            nameAuthor: authorDetail.nameUser,
            surnameAuthor: authorDetail.surnameUser,
            authorUsername: authorDetail
              ? authorDetail.username
              : "Unknown User",
          };
        });

        const meowsToShow = meowsWithUsernames.map((meow) =>
          formatMeowDate(meow)
        );

        setMeows(meowsToShow);
      } catch (error) {
        setError(true);
        seterrorMessage(error.message);
      }
    };
    getAllMeows();
  }, [reload.reload]);

  if (loading) return <Loading />;

  if (error)
    return (
      <div style={{ fontSize: "40px" }}>
        Oops, something went wrong!
        <p style={{ fontSize: "20px", color: "red", fontWeight: "bold" }}>
          {errorMessage}
        </p>
      </div>
    );

  return (
    <div className={styles.bigContainer}>
      {meows &&
        meows.map((meow) => {
          return (
            <div key={meow._id} className={styles.container}>
              <div className={styles.userContainer}>
                <PhotoUserProfile
                  photoStyle={photoStyle}
                  usernamePhoto={meow.authorUsername}
                />
                {meow.author === userId && (
                  <DeleteEditMeow
                    meow={meow}
                    meows={meows}
                    setMeows={setMeows}
                    meowCounter={meowCounter}
                    setMeowCounter={setMeowCounter}
                  />
                )}

                {!meow.repostedMeowId && (
                  <div className={styles.infoUserContainer}>
                    <div className={styles.userData}>
                      <p
                        onClick={() => {
                          navigate("/user/" + meow.authorUsername);
                        }}
                        className={styles.nameSurname}
                      >
                        {meow.nameAuthor} {meow.surnameAuthor}
                      </p>
                      <p className={styles.username}>@{meow.authorUsername}</p>
                    </div>

                    <div>
                      <p className={styles.dateFormat}>{meow.date}</p>
                    </div>
                  </div>
                )}
                {meow.repostedMeowId && (
                  <div style={{ width: "100%" }}>
                    <p className={styles.repostedBy}>
                      Reposted by: @{meow.authorUsername}
                    </p>
                    <div className={styles.infoUserContainer}>
                      <div className={styles.userData}>
                        <p
                          onClick={() => {
                            navigate("/user/" + meow.originalUsername);
                            reload.setReload(!reload.reload);
                          }}
                          className={styles.nameSurname}
                        >
                          {meow.originalName} {meow.originalSurname}
                        </p>
                        <p className={styles.username}>
                          @{meow.originalUsername}
                        </p>
                      </div>
                      <div>
                        <p className={styles.dateFormat}>{meow.date}</p>
                      </div>
                    </div>
                  </div>
                )}
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
};

export default MeowsLiked;
