import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Photos.module.css";
import { cloudinaryApi, userApi } from "../../functions/apiWrapper";
import Loading from "../../effects/Loading";

function UploadUserProfilePhoto({ username }) {
  const [userProfilePhoto, setUserProfilePhoto] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const { username: urlUsername } = useParams();
  const targetUsername = username ? username : urlUsername;

  useEffect(() => {
    if (targetUsername) {
      userApi()
        .get(`/${targetUsername}`)
        .then((response) => {
          const user = response.data;
          setUserProfilePhoto(user.userProfilePhoto);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [targetUsername, isUploading]);

  const handleUploadUser = async (e) => {
    try {
      setIsUploading(true);
      const data = new FormData();
      data.append("userFile", e.target.files[0]);
      data.append("username", username);

      await cloudinaryApi().post("/profile/", data);
      setIsUploading(false);
    } catch (error) {
      setIsUploading(false);
      alert(error.message);
    }
  };

  const handleProfilePhotoClick = () => {
    document.getElementById("userFile").click();
  };

  return (
    <div className={styles.container}>
      {isUploading ? (
        <Loading />
      ) : (
        <>
          <img
            src={userProfilePhoto}
            alt="userProfilePhoto"
            className={styles.userPhotoUserProfile}
            onClick={handleProfilePhotoClick}
          />
          <input
            id="userFile"
            type="file"
            onChange={handleUploadUser}
            className={styles.inputFile}
            multiple={false}
          />
        </>
      )}
    </div>
  );
}

export default UploadUserProfilePhoto;
