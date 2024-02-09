import styles from "./UploadPhoto.module.css";
import { useState } from "react";
import { cloudinaryApi } from "../../functions/apiWrapper";

function UploadUserProfilePhoto({ username }) {
  const [userFile, setUserFile] = useState(null);

  const handleSelectUserFile = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile || !selectedFile.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }
    setUserFile(selectedFile);
  };

  const handleUploadUser = async () => {
    try {
      const data = new FormData();
      data.append("userFile", userFile);
      data.append("username", username);

      await cloudinaryApi().post("/profile/", data);
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className={styles.button}>
      {userFile ? (
        <>
          <button onClick={handleUploadUser} className={styles.upload}>
            Upload
          </button>
        </>
      ) : (
        <>
          <label htmlFor="userFile" className={styles.upload}>
            Select User Photo
          </label>
          <input
            id="userFile"
            type="file"
            onChange={handleSelectUserFile}
            multiple={false}
          />
        </>
      )}
    </div>
  );
}
export default UploadUserProfilePhoto;
