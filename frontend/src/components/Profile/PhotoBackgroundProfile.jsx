import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Photos.module.css";
import { userApi } from "../../functions/apiWrapper.js";

function PhotoBackgroundProfile() {
  const [backgroundProfilePhoto, setBackgroundProfilePhoto] = useState("");
  const [backgroundProfilePhotoStatus, setBackgroundProfilePhotoStatus] =
    useState("");

  const { username: urlUsername } = useParams();

  useEffect(() => {
    userApi()
      .get(`/${urlUsername}`)
      .then((response) => {
        const user = response.data;
        setBackgroundProfilePhoto(user.backgroundProfilePhoto);
        setBackgroundProfilePhotoStatus(user.backgroundProfilePhotoStatus);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [urlUsername]);

  return (
    <>
      {backgroundProfilePhotoStatus ? (
        <img
          src={backgroundProfilePhoto}
          alt="backgroundProfilePhoto"
          className={styles.backgroundPhoto}
        />
      ) : (
        <img
          src={
            "https://res.cloudinary.com/dkfs5w0ga/image/upload/v1707388880/code/defaultBackgroundProfile.jpg"
          }
          alt="backgroundProfilePhoto"
          className={styles.backgroundPhoto}
        />
      )}
    </>
  );
}

export default PhotoBackgroundProfile;
