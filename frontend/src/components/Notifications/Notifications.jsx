import React, { useState, useEffect } from "react";
import { notificationApi, userApi } from "../../functions/apiWrapper";
import { useParams, useNavigate } from "react-router-dom";
import { formatDate } from "../../functions/dateFormat";
import PhotoUserProfile from "../Profile/PhotoUserProfile";
import ReadNotificationButton from "../Buttons/ReadNotificationButton";
// import styles from "./Notifications.module.css";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [usernames, setUsernames] = useState({});
  const [notificationId, setNotificationId] = useState("");
  const { username: urlUsername } = useParams();
  const navigate = useNavigate();
  const photoStyle = "component";

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const notificationResponse = await notificationApi().get(
          `/${urlUsername}`
        );
        const formattedNotifications = notificationResponse.data.map(
          async (notification) => {
            setNotificationId(notification._id);
            try {
              const userResponse = await userApi().get(
                `/id/${notification.sender}`
              );
              setUsernames(userResponse.data.username);

              return {
                ...notification,
                date: formatDate(notification).date,
              };
            } catch (error) {
              console.error("Error fetching user:", error);
            }
          }
        );
        setNotifications(await Promise.all(formattedNotifications));
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [urlUsername]);

  const generateNotificationDivs = () => {
    const lastNotifications = notifications.slice(-20).reverse();

    return lastNotifications.map((notification) => {
      let actionText = "";
      switch (notification.action) {
        case "follow":
          actionText = `has started following you`;
          break;
        case "unfollow":
          actionText = `has stopped following you`;
          break;
        case "like":
          actionText = `has liked one of your posts`;
          break;
        case "unlike":
          actionText = `has unliked one of your posts`;
          break;
        case "bookmark":
          actionText = `has bookmarked one of your posts`;
          break;
        case "unbookmark":
          actionText = `has unbookmarked one of your posts`;
          break;
        case "replie":
          actionText = `has commented on one of your posts`;
          break;
        case "repost":
          actionText = `has reposted one of your posts`;
          break;
        default:
          actionText = `has performed an action on one of your posts`;
      }

      const handleClickToMeow = () => {
        if (
          notification.action !== "follow" &&
          notification.action !== "unfollow"
        ) {
          navigate(`/meow/${notification.post}`);
        }
      };

      return (
        <>
          <div key={notification._id} onClick={handleClickToMeow}>
            <PhotoUserProfile
              photoStyle={photoStyle}
              usernamePhoto={usernames}
            />
            <p>
              User {usernames} {actionText} - {notification.date}
            </p>
          </div>
          <ReadNotificationButton
            notificationId={notificationId}
            read={notification.read}
          />
        </>
      );
    });
  };

  return (
    <div>
      <h2>Notifications</h2>
      {generateNotificationDivs()}
    </div>
  );
};

export default Notifications;
