import React, { useState, useEffect } from "react";
import styles from "./WhoToFollow.module.css";
import image from "../assets/user.png";
import FollowButton from "./FollowButton";
import { userApi } from "../apis/apiWrapper";
import { getUserSession } from "../local-storage";

const WhoToFollow = () => {
  const [usersToFollow, setUsersToFollow] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState("");

  useEffect(() => {
    const fetchUsersToFollow = async () => {
      try {
        const userSession = getUserSession();

        if (userSession) {
          setLoggedInUser(userSession);

          const response = await userApi.get("/");

          if (response.status === 200) {
            if (Array.isArray(response.data)) {
              const filteredUsers = response.data.filter(
                (user) => user.username !== userSession.username
              );

              const randomUsers = filteredUsers.sort(() => Math.random() - 0.5);
              setUsersToFollow(randomUsers);
            } else {
              console.error("Invalid response format:", response.data);
            }
          } else {
            throw new Error(response.data.error);
          }
        }
      } catch (error) {
        console.error("Error fetching users to follow:", error);
      }
    };

    fetchUsersToFollow();
  }, []);

  const singleUser = (user) => (
    <div key={user.username} className={styles.containerFollow}>
      <img className={styles.accountImage} src={image} alt="" />
      <div>
        <p className={styles.name}>{user.name}</p>
        <p className={styles.accountName}>@{user.username}</p>
      </div>
      <div className={styles.rightButton}>
        <FollowButton username={user.username} />
      </div>
    </div>
  );

  const listOfUsersToFollow = () => {
    const usersToShow = Array.isArray(usersToFollow)
      ? usersToFollow.slice(0, 5)
      : [];
    return usersToShow.map((user) => singleUser(user));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Who to follow</h1>
      <div>{listOfUsersToFollow()}</div>
      <button className={styles.showMore}>Show more</button>
    </div>
  );
};

export default WhoToFollow;
