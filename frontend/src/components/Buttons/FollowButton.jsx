import React, { useState, useEffect, useContext } from "react";
import styles from "./FollowButton.module.css";
import { followApi, notificationApi } from "../../functions/apiWrapper";
import { getUserSession } from "../../functions/localStorage";
import { context } from "../../App";

const FollowButton = ({ username }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const reload = useContext(context);
  const loggedInUser = getUserSession();

  useEffect(() => {
    const fetchFollowStatus = async () => {
      try {
        const response = await followApi().get(`/${username}`);

        if (response.status === 200) {
          setIsFollowing(response.data.isFollowing);
        } else {
          throw new Error(response.data.error);
        }
      } catch (error) {
        console.error("Error fetching follow status:", error);
      }
    };

    fetchFollowStatus();
  }, [username]);

  const handleFollow = async () => {
    setIsLoading(true);
    try {
      const response = await followApi().post(`/`, { username });

      if (response.status === 200) {
        setIsFollowing(true);
        if (username === loggedInUser.username) {
          return;
        }
        const dataNotification = {
          recipient: username,
          sender: loggedInUser.username,
          action: "follow",
          post: null,
        };
        const notification = await notificationApi().post(
          `/`,
          dataNotification,
        );
        if (notification.status === 201) {
        } else {
          throw new Error(notification.data.error);
        }
        reload.setReload(!reload.reload);
      } else {
        throw new Error(response.data.error);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnfollow = async () => {
    setIsLoading(true);
    try {
      const response = await followApi().delete(`/`, {
        data: { username },
      });

      if (response.status === 200) {
        setIsFollowing(false);
        if (username === loggedInUser.username) {
          return;
        }
        const dataNotification = {
          recipient: username,
          sender: loggedInUser.username,
          action: "unfollow",
          post: null,
        };
        const notification = await notificationApi().post(
          `/`,
          dataNotification,
        );
        if (notification.status === 201) {
        } else {
          throw new Error(notification.data.error);
        }
        reload.setReload(!reload.reload);
      } else {
        throw new Error(response.data.error);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      className={styles.followButton}
      onClick={() => {
        if (isFollowing) {
          handleUnfollow();
        } else {
          handleFollow();
        }
      }}
      disabled={isLoading}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowButton;
