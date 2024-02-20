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
      const res = await userApi().delete(`/${username}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.button}>
      {confirmDelete ? (
        <div>
          <p>¿Estás seguro de que quieres eliminar tu perfil?</p>
          <button
            className={styles.upload}
            onClick={() => {
              handleDelete();
              removeSession();
              reloadPage.setIsLogged(false);
            }}
          >
            Sí, eliminar perfil
          </button>
          <button
            className={styles.upload}
            onClick={() => setConfirmDelete(false)}
          >
            Cancelar
          </button>
        </div>
      ) : (
        <button
          className={styles.upload}
          onClick={() => setConfirmDelete(true)}
        >
          Eliminar perfil
        </button>
      )}
    </div>
  );
};

export default DeleteProfile;
