import { useContext } from "react";
import { meowApi, notificationApi } from "../../functions/apiWrapper";
import { getUserSession } from "../../functions/localStorage";
import { context } from "../../App";
import styles from "../Buttons/IconButton.module.css";
import { Repeat2 } from "lucide-react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useLocation, useNavigate } from "react-router-dom";
const loggedInUser = getUserSession();

const RepostButton = ({ meow, authorUsername, setReloadProfilePage, reloadProfilePage }) => {
  const reload = useContext(context);
  const location = useLocation();
  const isInUserRoute = location.pathname.startsWith('/user');
  const navigate = useNavigate()

  const repostMeow = async () => {
    try {
      const res = await meowApi().post("/repost", {
        ...meow,
        date: Date.now(),
      });

      if (res.status === 201) {
        const recipientUsername = authorUsername || meow.authorUsername;
        if (recipientUsername === loggedInUser.username) {
          if(isInUserRoute){
            setReloadProfilePage(!reloadProfilePage)
          } 
          return reload.setReload(!reload.reload);
        

       
        }
        const dataNotification = {
          recipient: recipientUsername,
          sender: loggedInUser.username,
          action: "repost",
          post: meow._id,
        };

        const notification = await notificationApi().post(
          `/`,
          dataNotification
        );

        if (notification.status === 201) {
        } else {
          throw new Error(notification.data.error);
        }
      } else {
        throw new Error(res.data.error);
      }
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
