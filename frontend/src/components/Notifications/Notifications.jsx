import React, { useState, useEffect } from "react";
import { notificationApi, userApi } from "../../functions/apiWrapper";
import { useParams, useNavigate } from "react-router-dom";
import { formatDate } from "../../functions/dateFormat";
import PhotoUserProfile from "../Profile/PhotoUserProfile";
import ReadNotificationButton from "../Buttons/ReadNotificationButton";
import styles from "./Notifications.module.css";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [usernames, setUsernames] = useState({});
  const [name, setName] = useState({});
  const [surname, setSurname] = useState({});
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
              setName(userResponse.data.name);
              setSurname(userResponse.data.surname);
              setUsernames(userResponse.data.username);
              console.log(userResponse);
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
          actionText = `liked one of your posts`;
          break;
        case "unlike":
          actionText = `unliked one of your posts`;
          break;
        case "bookmark":
          actionText = `has bookmarked one of your posts`;
          break;
        case "unbookmark":
          actionText = `has unbookmarked one of your posts`;
          break;
        case "replie":
          actionText = `commented one of your posts`;
          break;
        case "repost":
          actionText = `reposted one of your posts`;
          break;
        default:
          actionText = `performed an action on one of your posts`;
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
          <div className={styles.mainContainerNotifications}>
            <div
              key={notification._id}
              onClick={handleClickToMeow}
              className={styles.containerNotifications}
            >
              <PhotoUserProfile
                photoStyle={photoStyle}
                usernamePhoto={usernames}
              />
              <div className={styles.notificationText}>
                <p>
                  {name} {surname} <em>(@{usernames})</em> {actionText}
                </p>
                <p className={styles.notificationDate}>{notification.date}</p>
              </div>
            </div>
            <ReadNotificationButton
              notificationId={notificationId}
              read={notification.read}
            />
          </div>
        </>
      );
    });
  };

  return (
    <div>
      <h2 className={styles.titleNotifications}>Notifications</h2>
      {generateNotificationDivs()}
    </div>
  );
};

export default Notifications;
