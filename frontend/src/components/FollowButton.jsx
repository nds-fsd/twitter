import React, { useState } from "react";
import styles from "./FollowButton.module.css";
import { followApi } from "../apis/apiWrapper";

const FollowButton = ({ username }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFollow = async () => {
    setIsLoading(true);
    try {
      const response = await followApi.post(`/`, { username });

      if (response.status === 200) {
        setIsFollowing(true);
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
      const response = await followApi.get(`/`, { username });
      console.log(response);
      if (response.status === 200) {
        const responseUnfollow = await followApi.delete(`/`, { username });

        if (responseUnfollow.status === 200) {
          setIsFollowing(false);
        } else {
          throw new Error(responseUnfollow.data.error);
        }
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
