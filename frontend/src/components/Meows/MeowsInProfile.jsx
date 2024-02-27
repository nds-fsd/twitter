import { useState, useEffect } from "react";
import { meowApi } from "../../functions/apiWrapper";
import styles from "./MeowsFormat.module.css";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../functions/dateFormat";
import PhotoUserProfile from "../Profile/PhotoUserProfile.jsx";
import AllMeowButtons from "../Buttons/AllMeowButtons.jsx";
import DeleteEditMeow from "./DeleteEditMeow.jsx";
import { getUserSession } from "../../functions/localStorage.js";

function MeowsInProfile({ username, meowCounter, setMeowCounter }) {
  const [meows, setMeows] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [reloadProfilePage, setReloadProfilePage] = useState(false)
  const photoStyle = "meow";
const userId = getUserSession().id

  const navigate = useNavigate();

  useEffect(() => {
    const getProfileMeows = async () => {
      try {
        const res = await meowApi().get(username);
        const meowsToShow = res.data.meowsWithOriginalAuthors.map((meow) =>
          formatDate(meow)
        );
        setMeows(meowsToShow.reverse());
        setName(res.data.user.name);
        setSurname(res.data.user.surname);
      } catch (error) {
        console.error(error);
      }
    };
    getProfileMeows();
  }, [username, reloadProfilePage]);
  console.log(meows)

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
                {!meow.repostedMeowId && (
                  <div className={styles.infoUserContainer}>
                    <div className={styles.userData}>
                      <p
                        onClick={() => {
                          navigate("/user/" + meow.authorUsername);
                        }}
                        className={styles.nameSurname}
                      >
                        {meow.authorName} {meow.authorSurname}
                      </p>
                      <p className={styles.username}>@{meow.authorUsername}</p>
                    </div>

                    <div className={styles.buttonDateContainer}>
                    {meow.author === userId&&(
                      <DeleteEditMeow
                          meow={meow}
                          meows={meows}
                         setMeows={setMeows}
                   />
                          )}
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
                      <div className={styles.buttonDateContainer}>
                        {meow.author === userId && (
                          <DeleteEditMeow
                            meow={meow}
                            meows={meows}
                            setMeows={setMeows}
                          />
                        )}
                        <p className={styles.dateFormat}>{meow.date}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div
                onClick={() => {
                  navigate(`/meow/${meow._id}`, { state: { meow } });
                }}
                key={meow._id}
                className={styles.postContainer}
              >
                <p>{meow.text}</p>
              </div>
              <div className={styles.iconsContainer}>
                <AllMeowButtons
                  meow={meow}
                  authorUsername={meow.authorUsername}
                  setReloadProfilePage={setReloadProfilePage}
                  reloadProfilePage={reloadProfilePage}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}
export default MeowsInProfile;
