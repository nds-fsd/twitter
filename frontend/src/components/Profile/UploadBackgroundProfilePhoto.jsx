import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Photos.module.css";
import { cloudinaryApi, userApi } from "../../functions/apiWrapper";
import Loading from "../../effects/Loading";

function UploadBackgroundProfilePhoto() {
  const [backgroundProfilePhoto, setBackgroundProfilePhoto] = useState("");
  const [isUploading, setIsUploading] = useState(false);
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
  }, [urlUsername, isUploading]);

  const handleUploadBackground = async (e) => {
    try {
      setIsUploading(true);
      const data = new FormData();
      data.append("backgroundFile", e.target.files[0]);
      data.append("username", urlUsername);

      await cloudinaryApi().post("/background/", data);
      setIsUploading(false);
    } catch (error) {
      setIsUploading(false);
      alert(error.message);
    }
  };

  const handleBackgroundPhotoClick = () => {
    document.getElementById("backgroundFile").click();
  };

  return (
    <div className={styles.container}>
      {isUploading ? (
        <Loading />
      ) : (
        <>
          <img
            src={backgroundProfilePhoto}
            alt="backgroundProfilePhoto"
            className={styles.backgroundPhoto}
            onClick={handleBackgroundPhotoClick}
          />
          <input
            id="backgroundFile"
            type="file"
            onChange={handleUploadBackground}
            multiple={false}
          />
        </>
      )}
    </div>
  );
}
export default UploadBackgroundProfilePhoto;
