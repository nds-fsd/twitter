import styles from "./IconButton.module.css";
import { BarChart2 } from "lucide-react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const Views = ({ meow }) => {
  return (
    <div
      className={styles.iconsContainer}
      data-tooltip-id="Views"
      data-tooltip-content="Views"
      data-tooltip-place="top"
    >
      <p className={styles.buttonsText}>{meow.views}</p>
      <button id="bookmarkButton" type="button" className={styles.iconButton}>
        <BarChart2 size={20} color="grey" />
        <Tooltip id="Views" />
      </button>
    </div>
  );
};

export default Views;
