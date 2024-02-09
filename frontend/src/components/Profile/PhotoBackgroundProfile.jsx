import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Photos.module.css";
import { userApi } from "../../functions/apiWrapper.js";

function PhotoBackgroundProfile() {
  const [backgroundProfilePhoto, setBackgroundProfilePhoto] = useState("");

  const { username: urlUsername } = useParams();

  useEffect(() => {
    userApi()
      .get(`/${urlUsername}`)
      .then((response) => {
        const user = response.data;
        setBackgroundProfilePhoto(user.backgroundProfilePhoto);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [urlUsername]);

  return (
    <img
      src={backgroundProfilePhoto}
      alt="backgroundProfilePhoto"
      className={styles.backgroundPhoto}
    />
  );
}

export default PhotoBackgroundProfile;
