import React, { useState, useContext } from "react";
import { context } from "../../App";
import { userApi } from "../../functions/apiWrapper";
import { removeSession } from "../../functions/localStorage";
import styles from "./DeleteProfile.module.css";

const DeleteProfile = ({ username, hide, show }) => {
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
          <p>Are you sure you want to delete your profile?</p>
          <div className={styles.deleteCancelButton}>
            <button
              className={styles.delete}
              onClick={() => {
                handleDelete();
                removeSession();
                reloadPage.setIsLogged(false);
              }}
            >
              Yes, delete account
            </button>
            <button
              className={styles.upload}
              onClick={() => {
                setConfirmDelete(false);
                show();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          className={styles.delete}
          onClick={() => {
            setConfirmDelete(true);
            hide();
          }}
        >
          Delete account
        </button>
      )}
    </>
  );
};

export default DeleteProfile;
