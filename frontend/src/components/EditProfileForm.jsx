import React from "react";
import { useForm } from "react-hook-form";
import styles from "./EditProfileForm.module.css";

function EditProfileForm({ onClose, onSave, initialValues }) {
  const { register, handleSubmit } = useForm({ defaultValues: initialValues });

  const onSubmit = (data) => {
    // Lógica para guardar los cambios
    onSave(data);
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name">Name:</label>
          <input {...register("name")} id="name" />

          <label htmlFor="surname">Surname:</label>
          <input {...register("surname")} id="surname" />

          <label htmlFor="username">Username:</label>
          <input {...register("username")} id="username" />

          <label htmlFor="description">Description:</label>
          <textarea {...register("description")} id="description" />

          <label htmlFor="town">Town:</label>
          <input {...register("town")} id="town" />

          <label htmlFor="dateOfRegister">Date of Birth:</label>
          <input {...register("dateOfRegister")} id="dateOfRegister" type="date" />

          <label htmlFor="password">Password:</label>
          <input {...register("password")} id="password" type="password" />

          {/* Agregar más campos según tus necesidades, como la contraseña y otros */}

          <div className={styles.buttons}>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfileForm;
