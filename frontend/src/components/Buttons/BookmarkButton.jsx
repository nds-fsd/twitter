import React, { useState, useEffect } from "react";
import styles from "./IconButton.module.css";
import { bookmarkApi, notificationApi } from "../../functions/apiWrapper";
import { getUserSession } from "../../functions/localStorage";
import { Bookmark } from "lucide-react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const BookmarkButton = ({ meow, authorUsername }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bookmarkCounter, setBookmarkCounter] = useState(meow.bookmarks);
  const loggedInUser = getUserSession();

  useEffect(() => {
    const fetchBookmarkStatus = async () => {
      try {
        const response = await bookmarkApi().get(`${meow._id}`, {
          params: {
            meowId: meow._id,
          },
        });

        if (response.status === 200) {
          setIsBookmarked(response.data.isBookmarked);
        } else {
          throw new Error(response.data.error);
        }
      } catch (error) {
        console.error("Error fetching bookmarks status:", error);
      }
    };

    fetchBookmarkStatus();
  }, []);

  const handleBookmark = async () => {
    setBookmarkCounter(bookmarkCounter + 1);
    setIsLoading(true);
    try {
      const response = await bookmarkApi().post(
        `/${meow._id}`,
        { meowId: meow._id },
        {},
      );

      if (response.status === 200) {
        setIsBookmarked(true);
        const recipientUsername = authorUsername || meow.authorUsername;
        if (recipientUsername === loggedInUser.username) {
          return;
        }
        const dataNotification = {
          recipient: recipientUsername,
          sender: loggedInUser.username,
          action: "bookmark",
          post: meow._id,
        };
        const notification = await notificationApi().post(
          `/`,
          dataNotification,
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

  const handleUnbookmark = async () => {
    setBookmarkCounter(bookmarkCounter - 1);
    setIsLoading(true);
    try {
      const response = await bookmarkApi().delete(`/${meow._id}`, {
        data: { meowId: meow._id },
      });

      if (response.status === 200) {
        setIsBookmarked(false);
        const recipientUsername = authorUsername || meow.authorUsername;
        if (recipientUsername === loggedInUser.username) {
          return;
        }
        const dataNotification = {
          recipient: recipientUsername,
          sender: loggedInUser.username,
          action: "unbookmark",
          post: meow._id,
        };
        const notification = await notificationApi().post(
          `/`,
          dataNotification,
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
      data-tooltip-id="Bookmark"
      data-tooltip-content="Bookmark"
      data-tooltip-place="top"
    >
      <p className={styles.buttonsText}>{bookmarkCounter}</p>
      <button
        id="bookmarkButton"
        type="button"
        className={styles.iconButton}
        onClick={() => {
          if (isBookmarked) {
            handleUnbookmark();
          } else {
            handleBookmark();
          }
        }}
        disabled={isLoading}
      >
        {isBookmarked ? (
          <Bookmark color="grey" fill="#568340" strokeWidth={0} size={20} />
        ) : (
          <Bookmark color="grey" size={20} />
        )}
        <Tooltip id="Bookmark" />
      </button>
    </div>
  );
};

export default BookmarkButton;
