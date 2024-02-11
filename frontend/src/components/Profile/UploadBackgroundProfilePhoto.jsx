import styles from "./UploadPhoto.module.css";
import { useState } from "react";
import { cloudinaryApi } from "../../functions/apiWrapper";
import Loading from "../../effects/Loading";

function UploadBackgroundProfilePhoto({ username }) {
  const [isUploading, setIsUploading] = useState(false);

  const handleUploadBackground = async (e) => {
    try {
      setIsUploading(true);
      const data = new FormData();
      data.append("backgroundFile", e.target.files[0]);
      data.append("username", username);

      await cloudinaryApi().post("/background/", data);
      setIsUploading(false);
    } catch (error) {
      setIsUploading(false);
      alert(error.message);
    }
  };
  return (
    <div className={styles.button}>
      {isUploading ? (
        <Loading />
      ) : (
        <>
          <label htmlFor="backgroundFile" className={styles.upload}>
            Select Background Photo
          </label>
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
