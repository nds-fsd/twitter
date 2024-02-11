import { useContext } from "react";
import { meowApi } from "../../functions/apiWrapper";
import { context } from "../../App";
import styles from "../Buttons/IconButton.module.css";
import { Repeat2 } from "lucide-react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const RepostButton = ({ meow }) => {
  const reload = useContext(context);

  const repostMeow = async () => {
    try {
      const res = await meowApi().post("/repost", {
        ...meow,
        date: Date.now(),
      });

      reload.setReload(!reload.reload);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div
      className={styles.iconsContainer}
      data-tooltip-id="Reposts"
      data-tooltip-content="Reposts"
      data-tooltip-place="top"
    >
      <p className={styles.buttonsText}>{meow.reposts}</p>
      <button
        id="repostButton"
        type="button"
        className={styles.iconButton}
        onClick={repostMeow}
      >
        {meow.reposts > 0 ? (
          <Repeat2 color="#5E8DF9" />
        ) : (
          <Repeat2 color="grey" />
        )}
        <Tooltip id="Reposts" />
      </button>
    </div>
  );
};

export default RepostButton;
