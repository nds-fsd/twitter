import styles from "./MeowReplies.module.css";
import { userApi } from "../apis/apiWrapper";
import { useState, useEffect } from "react";

const MeowReplies = ({ allMeowReplies }) => {
  const [meows, setMeows] = useState("");

  const uniqueAuthorIds = Array.from(
    new Set(allMeowReplies.map((meow) => meow.author))
  );
  useEffect(() => {
    const getUserDetails = async () => {
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
      const meowsWithUsernames = allMeowReplies.map((meow) => {
        const authorDetail = authorDetails.find(
          (detail) => detail.authorId === meow.author
        );
        return {
          ...meow,
          authorUsername: authorDetail ? authorDetail.username : "Unknown User",
        };
      });
      setMeows(meowsWithUsernames);
    };
    getUserDetails();
  }, []);

  console.log(meows);

  return (
    <>
      <div className={styles.bigContainer}>
        {allMeowReplies &&
          allMeowReplies.map((meow) => {
            return (
              <div key={meow._id} className={styles.container}>
                <div className={styles.meowsContainer}>
                  <div className={styles.userContainer}>
                    <img />
                    npm run de
                    <p></p>
                  </div>
                  <p>{meow.text}</p>
                </div>
                <div className={styles.likesContainer}>
                  <p>{meow.likes}</p>
                  <p>{meow.date}</p>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default MeowReplies;
