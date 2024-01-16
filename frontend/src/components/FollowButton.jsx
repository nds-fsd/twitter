import React, { useState, useEffect } from "react";
import styles from "./FollowButton.module.css";
import { followApi } from "../apis/apiWrapper";
import { getUserToken } from "../local-storage";

const FollowButton = ({ username }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFollowStatus = async () => {
      try {
        const token = getUserToken();
  
        if (!token) {
          console.error("Token is not defined");
          return;
        }
  
        const response = await followApi.get(`/${username}`, {
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

      const response = await followApi.post(
        `/`,
        { username },
        { headers: { Authorization: `Bearer ${token}` } }
      );

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
      const token = getUserToken();

      if (!token) {
        console.error("Token is not defined");
        return;
      }

      const response = await followApi.delete(`/`, {
        data: { username },
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setIsFollowing(false);
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
