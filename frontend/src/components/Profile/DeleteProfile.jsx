import React, { useState, useContext } from "react";
import { context } from "../../App";
import { userApi } from "../../functions/apiWrapper";
import { removeSession } from "../../functions/localStorage";
import styles from "./DeleteProfile.module.css";

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
    <>
      {confirmDelete ? (
        <div className={styles.button}>
          <p style={{ fontSize: "12px", marginBottom: "5px" }}>
            Are you sure you want to delete your profile?
          </p>
          <button
            className={styles.delete}
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
          className={styles.delete}
          onClick={() => setConfirmDelete(true)}
        >
          Delete profile
        </button>
      )}
    </>
  );
};

export default DeleteProfile;
