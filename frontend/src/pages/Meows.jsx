import { useState, useContext, useEffect, createContext } from "react";
import { meowApi, userApi } from "../apis/apiWrapper";
import { postMeow, updateMeow, deleteMeow } from "../apis/meowsRequests";
import styles from "./Meows.module.css";
import user from "../assets/user.png";
import { context } from "../App.jsx";
import { getUserToken } from "../local-storage";
import LikeButton from "../components/LikeButton";
import { useNavigate } from "react-router-dom";

function Meows() {
  const [meows, setMeows] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");

  const navigate = useNavigate();

  const reload = useContext(context);

  useEffect(() => {
    const getAllMeows = async () => {
      try {
        const token = getUserToken();
        const res = await meowApi.get("/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;

        setMeows(data.reverse());

        const uniqueAuthorIds = Array.from(
          new Set(data.map((meow) => meow.author))
        );
        const authorDetails = await Promise.all(
          uniqueAuthorIds.map(async (authorId) => {
            try {
              const userRes = await userApi.get(`/id/${authorId}`);
              return {
                authorId,
                username: userRes.data.username,
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
            authorUsername: authorDetail
              ? authorDetail.username
              : "Unknown User",
          };
        });

        setMeows(meowsWithUsernames);
      } catch (error) {
        console.log(error);
        setError(true);
        seterrorMessage(error.message);
      }
    };
    getAllMeows();
  }, [reload.reload]);

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
            <div
              onClick={(e) => {
                if (e.target.className === "_likeButton_1kigi_1") return;
                navigate(`/meow/${meow._id}`);
              }}
              key={meow._id}
              className={styles.container}
            >
              <div className={styles.meowsContainer}>
                <div className={styles.userContainer}>
                  <img src={user} />
                  <p>{meow.authorUsername}</p>
                </div>
                <p>{meow.text}</p>
              </div>
              <div className={styles.likesContainer}>
                <p>
                  {meow.likes} <LikeButton meow={meow} />
                </p>
                <p>{meow.date}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
}
export default Meows;
