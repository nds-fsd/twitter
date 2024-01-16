import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const EditProfileButton = ({ onSubmit, onCancel, initialValues }) => {
  const { register, handleSubmit } = useForm({ defaultValues: initialValues });

  const submitForm = async (data) => {
    try {
      await onSubmit(data);
      Swal.fire({
        icon: "success",
        title: "Profile updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire({
        icon: "error",
        title: "Oops... Something went wrong!",
        text: "Unable to update profile. Please try again later.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <label>
        Name:
        <input {...register("name")} />
      </label>
      <label>
        Surname:
        <input {...register("Surname")} />
      </label>
      <label>
        Username:
        <input {...register("Username")} />
      </label>
      <label>
        Birthday:
        <input {...register("Birthday")} />
      </label>
      <label>
        Town:
        <input {...register("Town")} />
      </label>
      <label>
        Description:
        <input {...register("Description")} />
      </label>
      <div>
        <button type="submit">Save Changes</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditProfileButton;
