import React, { useState, useEffect, useContext } from "react";
import styles from "./FollowButton.module.css";
import { followApi } from "../../functions/apiWrapper";
import { getUserToken } from "../../functions/localStorage";
import { context } from "../../App";

const FollowButton = ({ username }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const reload = useContext(context);

  useEffect(() => {
    const fetchFollowStatus = async () => {
      try {
        const token = getUserToken();

        if (!token) {
          console.error("Token is not defined");
          return;
        }

        const response = await followApi().get(`/${username}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

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
      const token = getUserToken();

      if (!token) {
        console.error("Token is not defined");
        return;
      }

      const response = await followApi().post(
        `/`,
        { username },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setIsFollowing(true);
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
      const token = getUserToken();

      if (!token) {
        console.error("Token is not defined");
        return;
      }

      const response = await followApi().delete(`/`, {
        data: { username },
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setIsFollowing(false);
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
