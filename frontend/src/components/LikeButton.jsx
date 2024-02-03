import React, { useState, useEffect } from "react";
import styles from "./LikeButton.module.css";
import { likeApi } from "../apis/apiWrapper";
import { getUserToken } from "../Functions/local-storage";

const LikeButton = ({ meow }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [likeCounter, setLikeCounter] = useState(meow.likes);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const token = getUserToken();

        const response = await likeApi().get(`${meow._id}`, {
          params: {
            meowId: meow._id,
          },
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
    setLikeCounter(likeCounter + 1);
    setIsLoading(true);
    try {
      const token = getUserToken();

      const response = await likeApi().post(
        `/${meow._id}`,
        { meowId: meow._id },
        {}
      );

      if (response.status === 200) {
        setIsLiked(true);
        console.log(meow.likes);
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
    setLikeCounter(likeCounter - 1);
    setIsLoading(true);
    try {
      const token = getUserToken();

      const response = await likeApi().delete(`/${meow._id}`, {
        data: { meowId: meow._id },
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
    <>
      <span>{likeCounter}</span>
      <button
        id="likeButton"
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
    </>
  );
};

export default LikeButton;
