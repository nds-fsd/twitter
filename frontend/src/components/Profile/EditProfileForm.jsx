import styles from "./EditProfileForm.module.css";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { userApi } from "../../functions/apiWrapper";
import DeleteProfile from "./DeleteProfile";
import Swal from "sweetalert2";

const EditProfileForm = ({
  close,
  username,
  onSubmitSuccess,
  dataUserToEdit,
}) => {
  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [hideSubmit, setHideSubmit] = useState(false);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: "onBlur", reValidateMode: "onBlur" });

  const mouseOverSubmit = () => {
    if (!isValid) {
      setDisabled(true);
    }
  };

  const onClickHideSubmit = () => {
    setHideSubmit(true);
  };

  const onClickShowSubmit = () => {
    setHideSubmit(false);
  };

  const onSubmit = async (data) => {
    if (data.password !== data.passwordConfirm) {
      setPasswordError(true);
      return;
    } else {
      setPasswordError(false);
    }

    const updateUser = async () => {
      try {
        const res = await userApi().patch(`/${username}`, data);

        if (res.status === 201) {
          setError(false);
          onSubmitSuccess(data);
          close();
        }
      } catch (error) {
        if (error.response.status !== 201) setError(true);
      }
    };
    updateUser();
  };

  if (error) {
    Swal.fire({
      text: "Oops, something went wrong!",
      icon: "error",
      confirmButtonColor: "#00A9A5",
      timer: "3000",
    });
    setError(false);
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <header style={{ margin: 0 }}>
          <span onClick={close} className={styles.x}>
            x
          </span>
        </header>
        <h2 className={styles.tittle}>Edit Profile</h2>
        {hideSubmit === true ? (
          ""
        ) : (
          <div className={styles.flex}>
            <div className={styles.inputContainer}>
              <input
                className={styles.inputFields}
                maxLength={30}
                type="text"
                name=""
                placeholder={dataUserToEdit.name}
                {...register("name", { required: false })}
              />
            </div>

            <div className={styles.inputContainer}>
              <input
                className={styles.inputFields}
                maxLength={30}
                type="text"
                name=""
                placeholder={dataUserToEdit.surname}
                {...register("surname", { required: false })}
              />
            </div>

            <div className={styles.inputContainer}>
              <input
                className={styles.inputFields}
                maxLength={30}
                type="text"
                name=""
                placeholder={dataUserToEdit.town ? dataUserToEdit.town : "Town"}
                {...register("town", { required: false })}
              />
            </div>

            <div className={styles.inputContainer}>
              <textarea
                className={styles.inputFields}
                name="description"
                id="description"
                cols="1"
                rows="3"
                maxLength={100}
                placeholder="Description about you"
                {...register("description", { required: false })}
              ></textarea>
            </div>

            <div className={styles.inputContainer}>
              <input
                className={styles.inputFields}
                maxLength={15}
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: false,
                  minLength: 8,
                  pattern:
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
                })}
              />
              {errors.password?.type === "minLength" && (
                <p className={styles.error}>
                  Password must be 8 to 15 characters long
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
                {...register("passwordConfirm", { required: false })}
              />
              {errors.passwordConfirm?.type === "required" && (
                <p className={styles.error}>Please, confirm your password</p>
              )}
              {passwordError && (
                <p className={styles.error}>Passwords do not match</p>
              )}
            </div>
          </div>
        )}

        <div className={styles.buttons}>
          <DeleteProfile
            username={username}
            hide={onClickHideSubmit}
            show={onClickShowSubmit}
          />
          {hideSubmit === true ? (
            ""
          ) : (
            <button
              onMouseOut={() => setDisabled(false)}
              onMouseOver={mouseOverSubmit}
              disabled={isValid ? false : true}
              className={!disabled ? styles.submit : styles.notValid}
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;
