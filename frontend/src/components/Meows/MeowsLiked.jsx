import { useState, useEffect, useContext } from "react";
import styles from "./MeowsFormat.module.css";
import { meowApi, userApi } from "../../functions/apiWrapper";
import user from "../../assets/user.png";
import MessageButton from "../Buttons/MessageButton";
import LikeButton from "../Buttons/LikeButton";
import RepostButton from "../Buttons/RepostButton.jsx";
import Bookmark from "../Buttons/BookmarkButton";
import Views from "../Buttons/Views";
import ShareButton from "../Buttons/ShareButton";
import { getUserSession, getUserToken } from "../../functions/localStorage";
import Loading from "../../effects/Loading";
import { useNavigate } from "react-router-dom";
import { context } from "../../App";
import { formatMeowDate } from "../../functions/dateFormat";

const MeowsLiked = () => {
  const [meows, setMeows] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");

  const navigate = useNavigate();

  const reload = useContext(context);

  useEffect(() => {
    const getAllMeows = async () => {
      try {
        const { id } = getUserSession();
        const token = getUserToken();
        setLoading(true);
        const res = await meowApi().get(`likes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
            <div className={styles.container}>
              <div className={styles.userContainer}>
                <img src={user} className={styles.imageProfile} />
                <div className={styles.infoUserContainer}>
                  <div className={styles.userData}>
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
};

export default MeowsLiked;
