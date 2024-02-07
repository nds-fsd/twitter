import styles from "./IconButton.module.css";
import { MessageSquareMore } from "lucide-react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const MessageButton = () => {
  return (
    <div
      className={styles.iconsContainer}
      data-tooltip-id="Replies"
      data-tooltip-content="Replies"
      data-tooltip-place="top"
    >
      <button id="messageButton" type="button" className={styles.iconButton}>
        {/* {replyCounter}
        {replyCounter > 0 ? (
          <MessageSquareMore color="#F8F393" size={20} />
        ) : (
          <MessageSquareMore color="grey" size={20} />
        )} */}
        <MessageSquareMore size={20} color="grey" />
        <Tooltip id="Replies" />
      </button>
    </div>
  );
};

export default MessageButton;
