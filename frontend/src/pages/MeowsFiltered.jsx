import { useState, useContext, useEffect, createContext } from "react";
import { meowApi, userApi } from "../apis/apiWrapper";
import { postMeow, updateMeow, deleteMeow } from "../apis/meowsRequests";
import styles from "./MeowsFiltered.module.css";
import user from "../assets/user.png";
import Loading from "../effects/Loading.jsx";
import { context } from "../App.jsx";
import { getUserToken } from "../local-storage";
import LikeButton from "../components/LikeButton";
import { useNavigate } from "react-router-dom";

function MeowsFiltered({ username }) {
  const [meows, setMeows] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");

  const navigate = useNavigate();

  const reload = useContext(context);

  useEffect(() => {
    const getProfileMeows = async () => {
      try {
        const res = await meowApi.get(username);
        console.log(res);
        setMeows(res.data.meowsProfile);
        setName(res.data.user.name);
        setSurname(res.data.user.surname);
      } catch (error) {
        console.log(error);
      }
    };
    getProfileMeows();
  }, []);

  return (
    <div className={styles.bigContainer}>
      {meows &&
        meows.map((meow) => {
          return (
            <div
              onClick={(e) => {
                console.log(e.target.id);
                if (e.target.id === "likeButton") return;
                navigate(`/meow/${meow._id}`, { state: { meow } });
              }}
              key={meow._id}
              className={styles.container}
            >
              <div className={styles.meowsContainer}>
                <div className={styles.userContainer}>
                  <img src={user} />
                  <p>{name}</p>

                  <p>{surname}</p>
                  <p>{username}</p>
                </div>
                <p>{meow.text}</p>
              </div>
              <div className={styles.likesContainer}>
                <p>
                  <LikeButton meow={meow} />
                </p>
                <p>{meow.date}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
}
export default MeowsFiltered;
