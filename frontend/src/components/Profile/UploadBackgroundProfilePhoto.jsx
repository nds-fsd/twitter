import styles from "./UploadPhoto.module.css";
import { useState } from "react";
import { cloudinaryApi } from "../../functions/apiWrapper";

function UploadBackgroundProfilePhoto({ username }) {
  const [backgroundFile, setBackgroundFile] = useState(null);

  const handleSelectBackgroundFile = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile || !selectedFile.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }
    setBackgroundFile(selectedFile);
  };

  const handleUploadBackground = async () => {
    try {
      const data = new FormData();
      data.append("backgroundFile", backgroundFile);
      data.append("username", username);

      await cloudinaryApi().post("/background/", data);
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className={styles.button}>
      {backgroundFile ? (
        <>
          <button onClick={handleUploadBackground} className={styles.upload}>
            Upload
          </button>
        </>
      ) : (
        <>
          <label htmlFor="backgroundFile" className={styles.upload}>
            Select Background Photo
          </label>
          <input
            id="backgroundFile"
            type="file"
            onChange={handleSelectBackgroundFile}
            multiple={false}
          />
        </>
      )}
    </div>
  );
}
export default UploadBackgroundProfilePhoto;
