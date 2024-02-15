import styles from "./IconButton.module.css";
import { Eye, EyeOff } from "lucide-react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { notificationApi } from "../../functions/apiWrapper";
import { useState } from "react";

const ReadNotificationButton = ({ notificationId, read }) => {
  const [isRead, setIsRead] = useState(read);

  const handleClickToView = async () => {
    await notificationApi().patch(`/${notificationId}`);
    setIsRead(!isRead);
  };

  return (
    <div
      className={styles.iconsContainer}
      data-tooltip-id="Read"
      data-tooltip-content={isRead ? "Viewed" : "Not viewed"}
      data-tooltip-place="top"
    >
      <button
        id="Read"
        type="button"
        className={styles.iconButton}
        onClick={handleClickToView}
      >
        {!isRead ? (
          <Eye color="grey" size={20} />
        ) : (
          <EyeOff color="grey" size={20} />
        )}
        <Tooltip id="Read" />
      </button>
    </div>
  );
};

export default ReadNotificationButton;
