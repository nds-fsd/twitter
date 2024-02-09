import styles from "./IconButton.module.css";
import { Bookmark } from "lucide-react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const BookmarkButton = () => {
  return (
    <div
      className={styles.iconsContainer}
      data-tooltip-id="Bookmark"
      data-tooltip-content="Bookmark"
      data-tooltip-place="top"
    >
      <button id="bookmarkButton" type="button" className={styles.iconButton}>
        <Bookmark size={20} color="grey" />
        <Tooltip id="Bookmark" />
      </button>
    </div>
  );
};

export default BookmarkButton;
