import React, { useState, useEffect } from "react";
import styles from "./IconButton.module.css";
import { likeApi, notificationApi } from "../../functions/apiWrapper";
import { getUserSession } from "../../functions/localStorage";
import { Heart } from "lucide-react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const LikeButton = ({ meow, authorUsername }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [likeCounter, setLikeCounter] = useState(meow.likes);
  const loggedInUser = getUserSession();

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
        const recipientUsername = authorUsername || meow.authorUsername;
        if (recipientUsername === loggedInUser.username) {
          return;
        }
        const dataNotification = {
          recipient: recipientUsername,
          sender: loggedInUser.username,
          action: "like",
          post: meow._id,
        };
        const notification = await notificationApi().post(
          `/`,
          dataNotification
        );
        if (notification.status === 201) {
        } else {
          throw new Error(notification.data.error);
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

  const handleUnlike = async () => {
    setLikeCounter(likeCounter - 1);
    setIsLoading(true);
    try {
      const response = await likeApi().delete(`/${meow._id}`, {
        data: { meowId: meow._id },
      });

      if (response.status === 200) {
        setIsLiked(false);
        const recipientUsername = authorUsername || meow.authorUsername;
        if (recipientUsername === loggedInUser.username) {
          return;
        }
        const dataNotification = {
          recipient: recipientUsername,
          sender: loggedInUser.username,
          action: "unlike",
          post: meow._id,
        };
        const notification = await notificationApi().post(
          `/`,
          dataNotification
        );
        if (notification.status === 201) {
        } else {
          throw new Error(notification.data.error);
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
    <div
      className={styles.iconsContainer}
      data-tooltip-id="Likes"
      data-tooltip-content="Likes"
      data-tooltip-place="top"
    >
      <p className={styles.buttonsText}>{likeCounter}</p>
      <button
        id="likeButton"
        type="button"
        className={styles.iconButton}
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
          <Heart color="grey" fill="#f67b7b" strokeWidth={1} size={20} />
        ) : (
          <Heart color="grey" size={20} />
        )}
        <Tooltip id="Likes" />
      </button>
    </div>
  );
};

export default LikeButton;
