import React, { useState, useEffect } from "react";
import styles from "./LikeButton.module.css";
import { likeApi } from "../apis/apiWrapper";
import { getUserToken } from "../local-storage";

const LikeButton = ({ meow }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const token = getUserToken();
        console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" + meow._id);

        if (!token) {
          console.error("Token is not defined");
          return;
        }

        const response = await likeApi.get(`${meow._id}`, {
          params: {
            meowId: meow._id,
          },
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setIsLiked(response.data.isLiked);
        } else {
          throw new Error(response.data.error);
        }
      } catch (error) {
        console.error("Error fetching like status:", error);
      }
    };

    fetchLikeStatus();
  }, []);

  const handleLike = async () => {
    setIsLoading(true);
    try {
      const token = getUserToken();

      if (!token) {
        console.error("Token is not defined");
        return;
      }

      const response = await likeApi.post(
        `/${meow._id}`,
        { meowId: meow._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setIsLiked(true);
      } else {
        throw new Error(response.data.error);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnlike = async () => {
    setIsLoading(true);
    try {
      const token = getUserToken();

      if (!token) {
        console.error("Token is not defined");
        return;
      }

      const response = await likeApi.delete(`/${meow._id}`, {
        data: { meowId: meow._id },
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setIsLiked(false);
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
      className={styles.likeButton}
      onClick={() => {
        if (isLiked) {
          handleUnlike();
        } else {
          handleLike();
        }
      }}
      disabled={isLoading}
    >
      {isLiked ? "💔" : "❤️"}
    </button>
  );
};

export default LikeButton;
