import { useState, useContext, useEffect } from "react";
import { meowApi, userApi } from "../../functions/apiWrapper.js";
import styles from "./ListOfMeows.module.css";
import user from "../../assets/user.png";
import Loading from "../../effects/Loading.jsx";
import { context } from "../../App.jsx";
import { getUserToken } from "../../functions/localStorage.js";
import LikeButton from "../Buttons/LikeButton.jsx";
import RepostMeow from "./RepostMeow.jsx";
import { useNavigate } from "react-router-dom";
import { formatMeowDate } from "../../functions/dateFormat.js";

function Meows() {
  const [meows, setMeows] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");

  const navigate = useNavigate();

  const reload = useContext(context);

  useEffect(() => {
    const getAllMeows = async () => {
      try {
        const token = getUserToken();
        setLoading(true);
        const res = await meowApi().get("/", {
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
        console.error(error);
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
        Ops, something went wrong!
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
              <div className={styles.meowsContainer}>
                <div className={styles.userContainer}>
                  <img src={user} />
                  {!meow.repostedMeowId && (
                    <>
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
                    </>
                  )}
                  {meow.repostedMeowId && (
                    <div>
                      <p
                        className={styles.repost}
                        style={{ fontSize: "0.8rem" }}
                      >
                        Reposted by: {meow.authorUsername}
                      </p>
                      <p>{meow.originalUsername}</p>
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
                <div className={styles.likesContainer}>
                  <p>
                    <LikeButton meow={meow} />
                    <RepostMeow meow={meow} />
                    <p>{meow.date}</p>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
export default Meows;
