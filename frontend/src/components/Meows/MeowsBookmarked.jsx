import { useState, useEffect, useContext } from "react";
import { bookmarkApi, userApi } from "../../functions/apiWrapper.js";
import styles from "./MeowsFormat.module.css";
import { getUserSession } from "../../functions/localStorage.js";
import Loading from "../../effects/Loading.jsx";
import { useNavigate } from "react-router-dom";
import { context } from "../../App.jsx";
import { formatDate } from "../../functions/dateFormat.js";
import PhotoUserProfile from "../Profile/PhotoUserProfile.jsx";
import AllMeowButtons from "../Buttons/AllMeowButtons.jsx";

const MeowsBookmarked = () => {
  const [meows, setMeows] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userMentions, setUserMentions] = useState([]);
  const photoStyle = "meow";

  const navigate = useNavigate();

  const reload = useContext(context);

  const [color, setColor] = useState(false);
  const changeColor = () => {
    if (window.scrollY >= 70) {
      setColor(true);
    } else {
      setColor(false);
    }
  };
  window.addEventListener("scroll", changeColor);

  useEffect(() => {
    const getAllMeows = async () => {
      try {
        const { userId } = getUserSession();
        setLoading(true);
        const res = await bookmarkApi().get(`/user/${userId}`);
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

        const meowsToShow = meowsWithUsernames.map((meow) => formatDate(meow));

        const possibleMentions = new Set();

        meowsToShow.forEach((meowToReview) => {
          const regex = /@(\w+)/g;
          const matchAll = meowToReview.text.matchAll(regex);
          for (const match of matchAll) {
            possibleMentions.add(match[1]);
          }
        });

        const mentionDetails = await Promise.all(
          [...possibleMentions].map(async (possibleMention) => {
            try {
              const userRes = await userApi().get(`/${possibleMention}`);
              return possibleMention;
            } catch (userError) {
              console.error(
                `Error fetching possible mention with username ${possibleMention}: ${userError.message}`
              );
              return undefined;
            }
          })
        );

        const successfulMentions = mentionDetails.filter(
          (mention) => mention !== undefined
        );

        setUserMentions(successfulMentions);
        setMeows(meowsToShow);
      } catch (error) {
        setError(true);
        setErrorMessage(error.message);
      }
    };
    getAllMeows();
  }, [reload.reload]);

  const renderMeowText = (baseMeowText) => {
    const regex = /@(\w+)/g;
    let lastIndex = 0;
    const meowText = [];

    baseMeowText.replace(regex, (match, mention, index) => {
      if (index > lastIndex) {
        const beforeMention = baseMeowText.substring(lastIndex, index);
        meowText.push(beforeMention);
      }

      if (userMentions.includes(mention)) {
        meowText.push(
          <a key={index} href={`/user/${mention}`}>
            {match}
          </a>
        );
      } else {
        meowText.push(<span key={index}>{match}</span>);
      }

      lastIndex = index + match.length;
    });

    if (lastIndex < baseMeowText.length) {
      const remainingText = baseMeowText.substring(lastIndex);
      meowText.push(remainingText);
    }

    return <p>{meowText}</p>;
  };

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
      <div
        className={color ? styles.titleBookmarksScroll : styles.titleBookmarks}
      >
        <h2 className={styles.titleText}>Meows Bookmarked</h2>
      </div>

      {meows.length === 0 ? (
        <p>You can Bookmark some meows to find them again easily.</p>
      ) : (
        meows.map((meow) => {
          return (
            <div key={meow._id} className={styles.container}>
              <div className={styles.userContainer}>
                <PhotoUserProfile
                  photoStyle={photoStyle}
                  usernamePhoto={meow.authorUsername}
                />
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
                onClick={() => {
                  navigate(`/meow/${meow._id}`, { state: { meow } });
                }}
                key={meow._id}
                className={styles.postContainer}
              >
                {renderMeowText(meow.text)}
              </div>
              <div className={styles.iconsContainer}>
                <AllMeowButtons
                  meow={meow}
                  authorUsername={meow.authorUsername}
                />
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default MeowsBookmarked;
