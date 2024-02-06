import styles from "./IconButton.module.css";
import { Link } from "lucide-react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const ShareButton = () => {
  return (
    <div
      className={styles.iconsContainer}
      data-tooltip-id="Share"
      data-tooltip-content="Share"
      data-tooltip-place="top"
    >
      <button id="bookmarkButton" type="button" className={styles.iconButton}>
        <Link size={20} color="grey" />
        <Tooltip id="Share" />
      </button>
    </div>
  );
};

export default ShareButton;
