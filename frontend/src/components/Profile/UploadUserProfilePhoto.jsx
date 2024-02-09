import styles from "./UploadPhoto.module.css";
import { useState } from "react";
import { cloudinaryApi } from "../../functions/apiWrapper";
import Loading from "../../effects/Loading";

function UploadUserProfilePhoto({ username }) {
  const [isUploading, setIsUploading] = useState(false);

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
  return (
    <div className={styles.button}>
      {isUploading ? (
        <Loading />
      ) : (
        <>
          <label htmlFor="userFile" className={styles.upload}>
            Select User Photo
          </label>
          <input
            id="userFile"
            type="file"
            onChange={handleUploadUser}
            multiple={false}
          />
        </>
      )}
    </div>
  );
}
export default UploadUserProfilePhoto;
