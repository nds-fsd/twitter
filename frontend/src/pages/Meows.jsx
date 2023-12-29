import { useState } from "react";
import { useEffect } from "react";
import { meowApi } from "../apis/apiWrapper";
import { postMeow, updateMeow, deleteMeow } from "../apis/meowsRequests";
import styles from "./Meows.module.css";
import user from "../assets/user.png";

function Meows() {
  const [meows, setMeows] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");

  useEffect(() => {
    const getAllMeows = async () => {
      try {
        const res = await meowApi.get("/");
        const data = res.data;

        setMeows(data);
      } catch (error) {
        console.log(error);
        setError(true);
        seterrorMessage(error.message);
      }
    };
    getAllMeows();
  }, []);

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
                  <p>user</p>
                </div>

                <p>{meow.text}</p>
              </div>
              <div className={styles.likesContainer}>
                <p>{meow.reposts}</p>
                <p>{meow.likes}</p>
                <p>{meow.views}</p>
                <p>{meow.date}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Meows;
