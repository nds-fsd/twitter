import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./EditProfileForm.module.css";
import Loading from "../effects/Loading";

function EditProfileForm({ onClose, onSave, initialValues }) {
  const { register, handleSubmit } = useForm({ defaultValues: initialValues });

  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const onSubmit = (data) => {
    if (data.password !== data.passwordConfirm) {
      setPasswordError(true);
      return;
    } else {
      setPasswordError(false);
    }
    let date = new Date().toDateString();

    // const createUser = async () => {
    //   try {
    //     setLoading(true);
    //     const res = await userApi.post("/register", {
    //       ...data,
    //       dateOfRegister: date,
    //     });
    //     setLoading(false);

    //     if (res.status === 201) {
    //       setError(false);

    //       setUserSession(res.data);
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

    // createUser();
  };

  // if (loading) return <Loading />;
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <header>
          {/* <span>Step 1 of 2</span>{" "} */}
          <span onClick={close} className={styles.x}>
            x
          </span>
        </header>
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputContainer}>
            <input
              className={styles.inputFields}
              maxLength={30}
              type="text"
              name=""
              placeholder="Name"
              {...register("name", { required: true })}
            />
            {errors.name?.type === "required" && (
              <p className={styles.error}>Name is required</p>
            )}
          </div>

          <div className={styles.inputContainer}>
            <input
              className={styles.inputFields}
              maxLength={30}
              type="text"
              name=""
              placeholder="Surname"
              {...register("surname", { required: true })}
            />
            {errors.surname?.type === "required" && (
              <p className={styles.error}>Surname is required</p>
            )}
          </div>

          <div className={styles.inputContainer}>
            <div className={styles.dateContainer}>
              <label className={styles.dateLabel} htmlFor="">
                Date of birth
              </label>
              <input
                className={styles.dateFields}
                type="date"
                {...register("birthday", { required: true })}
              />
            </div>

            {errors.birthday?.type === "required" && (
              <p className={styles.error}>Date of birth is required</p>
            )}
          </div>

          <div className={styles.inputContainer}>
            <input
              className={styles.inputFields}
              maxLength={20}
              type="text"
              placeholder="Username"
              {...register("username", { required: true })}
            />
            {errors.username?.type === "required" && (
              <p className={styles.error}>Username is required</p>
            )}
            {usernameAlreadyRegistered && (
              <p className={styles.error}>Username not available</p>
            )}
          </div>

          <label htmlFor="description">Description:</label>
          <textarea {...register("description")} id="description" />

          <label htmlFor="town">Town:</label>
          <input {...register("town")} id="town" />

          <div className={styles.inputContainer}>
            <input
              className={styles.inputFields}
              maxLength={30}
              type="password"
              placeholder="Password"
              {...register("password", {
                required: true,
                minLength: 8,
                pattern:
                  /^(?=.*\d)(?=.*[a-z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,30}$/,
              })}
            />
            {errors.password?.type === "required" && (
              <p className={styles.error}>Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className={styles.error}>
                Password must be 8 to 30 characters long
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p style={{ fontSize: "0.8rem" }} className={styles.error}>
                Password must contain one lower case, one upper
                <br /> case, one number and one special character.
              </p>
            )}
          </div>

          <div className={styles.inputContainer}>
            <input
              className={styles.inputFields}
              onFocus={() => setPasswordError(false)}
              maxLength={30}
              type="password"
              placeholder="Confirm your password"
              {...register("passwordConfirm", { required: true })}
            />
            {errors.passwordConfirm?.type === "required" && (
              <p className={styles.error}>Please, confirm your password</p>
            )}
            {passwordError && (
              <p className={styles.error}>Passwords do not match</p>
            )}
          </div>

          <div className={styles.buttons}>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button
              onMouseOut={() => setDisabled(false)}
              onMouseOver={mouseOverSubmit}
              disabled={isValid ? false : true}
              className={!disabled ? styles.submit : styles.notValid}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfileForm;
