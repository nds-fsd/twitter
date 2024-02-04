import React, { useState, useEffect, useContext } from "react";
import styles from "./WhoToFollow.module.css";
import image from "../assets/user.png";
import FollowButton from "./FollowButton";
import { userApi } from "../functions/apiWrapper";
import { getUserSession } from "../functions/localStorage";
import { useNavigate } from "react-router-dom";
import { context } from "../App";

const WhoToFollow = () => {
  const [usersToFollow, setUsersToFollow] = useState([]);
  const [displayCount, setDisplayCount] = useState(5);
  const [showMore, setShowMore] = useState(true);
  const reload = useContext(context);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsersToFollow = async () => {
      try {
        const userSession = getUserSession();

        if (userSession) {
          const response = await userApi().get("/");

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

  const loadUsers = () => {
    const newDisplayCount = showMore ? displayCount + 5 : 5;
    setDisplayCount(Math.min(newDisplayCount, 10));
    setShowMore(!showMore);
  };

  const singleUser = (user) => (
    <div key={user.username} className={styles.containerFollow}>
      <img className={styles.accountImage} src={image} alt="" />
      <div>
        <p
          className={styles.name}
          onClick={() => {
            navigate("/user/" + user.username);
            reload.setReload(!reload.reload);
          }}
        >
          {user.name} {user.surname}
        </p>
        <p className={styles.accountName}>@{user.username}</p>
      </div>
      <div className={styles.rightButton}>
        <FollowButton username={user.username} />
      </div>
    </div>
  );

  const listOfUsersToFollow = () => {
    const usersToShow = Array.isArray(usersToFollow)
      ? usersToFollow.slice(0, displayCount)
      : [];
    return usersToShow.map((user) => singleUser(user));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Who to follow</h1>
      <div>{listOfUsersToFollow()}</div>
      <button className={styles.showMore} onClick={loadUsers}>
        {showMore ? "Show more" : "Show less"}
      </button>
    </div>
  );
};

export default WhoToFollow;
