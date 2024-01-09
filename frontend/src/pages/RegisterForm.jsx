import styles from "./RegisterForm.module.css";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { userApi } from "../apis/apiWrapper";
import Swal from "sweetalert2";
import { setUserSession } from "../local-storage";
import { Link } from "react-router-dom";

const RegisterForm = ({ close, change }) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [emailAlreadyRegistered, setEmailAlreadyRegistered] = useState(false);
  const [usernameAlreadyRegistered, setUsernameAlreadyRegistered] =
    useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [formStep, setFormStep] = useState(0);

  const {
    watch,
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: "onBlur", reValidateMode: "onBlur" });

  const handleNext = () => {
    if (isValid) {
      setFormStep(1);
    }
  };

  const onSubmit = (data) => {
    if (data.password !== data.passwordConfirm) {
      setPasswordError(true);
      return;
    } else {
      setPasswordError(false);
    }
    let date = new Date().toDateString();

    const createUser = async () => {
      try {
        const res = await userApi.post("/register", {
          ...data,
          dateOfRegister: date,
        });
        console.log(res);
        console.log(res.data);
        if (res.status === 201) {
          setError(false);
          setSuccess(true);
          setUserSession(res.data);
        }
      } catch (error) {
        console.log(error);
        if (error.response.status !== 201 && error.response.status !== 400)
          setError(true);

        if (error.response.data.error.mail) {
          setEmailAlreadyRegistered(true);
        } else {
          setEmailAlreadyRegistered(false);
        }

        if (error.response.data.error.username) {
          setUsernameAlreadyRegistered(true);
        } else {
          setUsernameAlreadyRegistered(false);
        }
      }
    };

    createUser();
  };

  if (success) {
    Swal.fire({
      title: "Welcome to Meower!",
      text: "User created successfully.",
      icon: "success",
      confirmButtonColor: "#00A9A5",
    });
  }

  if (error) {
    Swal.fire({
      text: "Ops, something went wrong!",
      icon: "error",
      confirmButtonColor: "#00A9A5",
      timer: "3000",
    });
    setError(false);
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {formStep === 0 && (
          <section>
            <header>
              <span>Step 1 of 2</span>{" "}
              <span onClick={close} className={styles.x}>
                x
              </span>
            </header>
            <h2>Create your account</h2>
            <div>
              <input
                maxLength={30}
                type="text"
                name=""
                placeholder="Name"
                {...register("name", { required: true })}
              />
              {errors.name?.type === "required" && (
                <p className={styles.error}>Name is required.</p>
              )}
            </div>

            <div>
              <input
                maxLength={30}
                type="text"
                name=""
                placeholder="Surname"
                {...register("surname", { required: true })}
              />
              {errors.surname?.type === "required" && (
                <p className={styles.error}>Surname is required.</p>
              )}
            </div>

            <div className={styles.date}>
              <label htmlFor="">Date of birth</label>
              <input
                type="date"
                {...register("birthday", { required: true })}
              />
              {errors.birthday?.type === "required" && (
                <p className={styles.error}>Date is required.</p>
              )}
            </div>
            <button
              className={styles.submit}
              style={{ userSelect: "none" }}
              onClick={handleNext}
            >
              Next
            </button>
            <footer>
              <p>
                If you already have an account,{" "}
                <span
                  onClick={change}
                  style={{
                    cursor: "pointer",
                    color: "green",
                    fontWeight: "bold",
                    textDecoration: "underline",
                  }}
                >
                  log in here
                </span>
              </p>
            </footer>
          </section>
        )}

        {formStep === 1 && (
          <section>
            <header>
              <span>Step 2 of 2</span>{" "}
              <span onClick={close} className={styles.x}>
                x
              </span>
            </header>
            <h2>Create your account</h2>
            <div>
              <input
                maxLength={80}
                type="text"
                name=""
                placeholder="Email"
                {...register("mail", {
                  required: true,
                  pattern:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                })}
              />
              {errors.mail?.type === "required" && (
                <p className={styles.error}>Mail is required.</p>
              )}
              {errors.mail?.type === "pattern" && (
                <p className={styles.error}>Please, enter a valid email.</p>
              )}
              {emailAlreadyRegistered && (
                <p className={styles.error}>Email already registered.</p>
              )}
            </div>

            <div>
              <input
                maxLength={20}
                type="text"
                placeholder="Username"
                {...register("username", { required: true })}
              />
              {errors.username?.type === "required" && (
                <p className={styles.error}>Username is required.</p>
              )}
              {usernameAlreadyRegistered && (
                <p className={styles.error}>This username is not available.</p>
              )}
            </div>

            <div>
              <input
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
                <p className={styles.error}>Password is required.</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className={styles.error}>
                  Password must be 8 to 30 character long.
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p style={{ fontSize: "0.8rem" }} className={styles.error}>
                  Passwrod must contain one lower case, one upper
                  <br /> case, one number and one special character.
                </p>
              )}
            </div>

            <div>
              <input
                onFocus={() => setPasswordError(false)}
                maxLength={30}
                type="password"
                placeholder="Confirm your password"
                {...register("passwordConfirm", { required: true })}
              />
              {errors.passwordConfirm?.type === "required" && (
                <p className={styles.error}>Please, confirm your password.</p>
              )}
              {passwordError && (
                <p className={styles.error}>Passwords do not match.</p>
              )}
            </div>

            <div>
              <input
                className={styles.submit}
                type="submit"
                value={"Sign up"}
              ></input>
            </div>
            <footer>
              <p>
                If you already have an account,{" "}
                <span
                  onClick={change}
                  style={{
                    cursor: "pointer",
                    color: "green",
                    fontWeight: "bold",
                    textDecoration: "underline",
                  }}
                >
                  log in here
                </span>
              </p>
            </footer>
          </section>
        )}
      </form>
    </div>
  );
};

export default RegisterForm;
