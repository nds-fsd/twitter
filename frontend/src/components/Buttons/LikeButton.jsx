import React, { useState, useEffect } from "react";
import styles from "./LikeButton.module.css";
import { likeApi } from "../../functions/apiWrapper";
import { Heart } from "lucide-react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const LikeButton = ({ meow }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [likeCounter, setLikeCounter] = useState(meow.likes);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
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
      const response = await likeApi().post(
        `/${meow._id}`,
        { meowId: meow._id },
        {}
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
    setLikeCounter(likeCounter - 1);
    setIsLoading(true);
    try {
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
    <div
      className={styles.likeContainer}
      data-tooltip-id="Likes"
      data-tooltip-content="Likes"
      data-tooltip-place="top"
    >
      <p>{likeCounter}</p>
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
        {isLiked ? (
          <Heart fill="#f67b7b" strokeWidth={1} size={20} />
        ) : (
          <Heart size={20} />
        )}
        <Tooltip id="Likes" />
      </button>
    </div>
  );
};

export default LikeButton;
