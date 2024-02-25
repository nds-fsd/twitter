import { useState, useEffect } from "react";
import { meowApi, userApi } from "../../functions/apiWrapper.js";
import styles from "./MeowsFormat.module.css";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../functions/dateFormat";
import PhotoUserProfile from "../Profile/PhotoUserProfile.jsx";
import AllMeowButtons from "../Buttons/AllMeowButtons.jsx";
import DeleteEditMeow from "./DeleteEditMeow.jsx";

function MeowsInProfile({ username, meowCounter, setMeowCounter }) {
  const [meows, setMeows] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [userMentions, setUserMentions] = useState([]);
  const photoStyle = "meow";

  const navigate = useNavigate();

  useEffect(() => {
    const getProfileMeows = async () => {
      try {
        const res = await meowApi().get(username);
        const meowsToShow = res.data.meowsProfile.map((meow) =>
          formatDate(meow)
        );
        setMeows(meowsToShow.reverse());
        setName(res.data.user.name);
        setSurname(res.data.user.surname);

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
      } catch (error) {
        console.error(error);
      }
    };
    getProfileMeows();
  }, [username]);

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
                  <div className={styles.buttonDateContainer}>
                    <DeleteEditMeow
                      meow={meow}
                      meows={meows}
                      setMeows={setMeows}
                      meowCounter={meowCounter}
                      setMeowCounter={setMeowCounter}
                    />
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
                {renderMeowText(meow.text)}
              </div>
              <div className={styles.iconsContainer}>
                <AllMeowButtons meow={meow} authorUsername={username} />
              </div>
            </div>
          );
        })}
    </div>
  );
}
export default MeowsInProfile;
