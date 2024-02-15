import React, { useState, useEffect } from "react";
import styles from "./IconButton.module.css";
import { bookmarkApi } from "../../functions/apiWrapper";
import { Bookmark } from "lucide-react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const BookmarkButton = ({ meow }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bookmarkCounter, setBookmarkCounter] = useState(meow.bookmarks);

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
        {}
      );

      if (response.status === 200) {
        setIsBookmarked(true);
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
      <p className={styles.buttonsText}>{meow.bookmarks}</p>
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
          <Bookmark color="grey" fill="#ff5200" strokeWidth={0} size={20} />
        ) : (
          <Bookmark color="grey" size={20} />
        )}
        <Tooltip id="Bookmark" />
      </button>
    </div>
  );
};

export default BookmarkButton;
