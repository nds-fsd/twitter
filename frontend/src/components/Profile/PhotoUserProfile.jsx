import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Photos.module.css";
import { userApi } from "../../functions/apiWrapper.js";

function PhotoUserProfile({ photoStyle, usernamePhoto }) {
  const [userProfilePhoto, setUserProfilePhoto] = useState("");
  const [userProfilePhotoStatus, setUserProfilePhotoStatus] = useState("");

  const { username: urlUsername } = useParams();
  const targetUsername = usernamePhoto ? usernamePhoto : urlUsername;

  useEffect(() => {
    userApi()
      .get(`/${targetUsername}`)
      .then((response) => {
        const user = response.data;
        setUserProfilePhoto(user.userProfilePhoto);
        setUserProfilePhotoStatus(user.userProfilePhotoStatus);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [targetUsername]);

  let className = "";
  if (photoStyle === "profile") {
    className = styles.userPhotoUserProfile;
  } else if (photoStyle === "meow") {
    className = styles.userPhotoMeow;
  } else {
    className = styles.userPhotoComponents;
  }

  return (
    <>
      {userProfilePhotoStatus ? (
        <img
          src={userProfilePhoto}
          alt="userProfilePhoto"
          className={className}
        />
      ) : (
        <img
          src={
            "https://res.cloudinary.com/dkfs5w0ga/image/upload/v1707388880/code/defaultUserProfile.jpg"
          }
          alt="userProfilePhoto"
          className={className}
        />
      )}
    </>
  );
}

export default PhotoUserProfile;
