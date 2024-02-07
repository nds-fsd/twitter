import styles from "./IconButton.module.css";
import { BarChart2 } from "lucide-react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const Views = () => {
  return (
    <div
      className={styles.iconsContainer}
      data-tooltip-id="Views"
      data-tooltip-content="Views"
      data-tooltip-place="top"
    >
      <BarChart2 size={20} color="grey" />
      <Tooltip id="Views" />
    </div>
  );
};

export default Views;
