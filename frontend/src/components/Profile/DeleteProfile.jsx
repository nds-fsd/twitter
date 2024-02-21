import React, { useState, useContext } from "react";
import { context } from "../../App";
import { userApi } from "../../functions/apiWrapper";
import { removeSession } from "../../functions/localStorage";
import styles from "./UploadPhoto.module.css";

const DeleteProfile = ({ username }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const reloadPage = useContext(context);

  const handleDelete = async () => {
    try {
      await userApi().delete(`/${username}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.button}>
      {confirmDelete ? (
        <div>
          <p>Are you sure you want to delete your profile?</p>
          <button
            className={styles.upload}
            onClick={() => {
              handleDelete();
              removeSession();
              reloadPage.setIsLogged(false);
            }}
          >
            Yes, delete profile
          </button>
          <button
            className={styles.upload}
            onClick={() => setConfirmDelete(false)}
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          className={styles.upload}
          onClick={() => setConfirmDelete(true)}
        >
          Delete profile
        </button>
      )}
    </div>
  );
};

export default DeleteProfile;
