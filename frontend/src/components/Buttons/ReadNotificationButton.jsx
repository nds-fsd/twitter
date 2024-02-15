import styles from "./IconButton.module.css";
import { Eye, EyeOff } from "lucide-react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { notificationApi } from "../../functions/apiWrapper";

const ReadNotificationButton = ({ notificationId, read }) => {
  
  const handleClickToView = async () => {
    await notificationApi().put(`/${notificationId}`);
  };

  return (
    <div
      className={styles.iconsContainer}
      data-tooltip-id="ReadNotification"
      data-tooltip-content="ReadNotification"
      data-tooltip-place="top"
    >
      <button
        id="Read"
        type="button"
        className={styles.iconButton}
        onClick={handleClickToView}
      >
        {!read ? (
          <Eye color="grey" size={20} />
        ) : (
          <EyeOff color="grey" size={20} />
        )}
        {!read ? <Tooltip id="Viewed" /> : <Tooltip id="Not viewed" />}
      </button>
    </div>
  );
};

export default ReadNotificationButton;
