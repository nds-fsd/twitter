import styles from "./RegisterForm.module.css";
import { useForm } from "react-hook-form";
import React, { useState, useContext } from "react";
import { userApi } from "../apis/apiWrapper";
import Swal from "sweetalert2";
import { setUserSession } from "../local-storage";
import { context } from "../App";
import Loading from "../effects/Loading";
import { ArrowLeftCircle } from "lucide-react";

const RegisterForm = ({ close, change }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [emailAlreadyRegistered, setEmailAlreadyRegistered] = useState(false);
  const [usernameAlreadyRegistered, setUsernameAlreadyRegistered] =
    useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [formStep, setFormStep] = useState(0);
  const reloadPage = useContext(context);
  const [disabled, setDisabled] = useState(false);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: "onBlur", reValidateMode: "onBlur" });

  const handleNext = () => {
    if (isValid) {
      setFormStep(1);
    }
  };

  const mouseOverSubmit = () => {
    if (!isValid) {
      setDisabled(true);
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
        setLoading(true);
        const res = await userApi.post("/register", {
          ...data,
          dateOfRegister: date,
        });
        setLoading(false);

        console.log(res);
        console.log(res.data);
        if (res.status === 201) {
          setError(false);

          reloadPage.setPreLoader(true);

          reloadPage.setIsLogged(true);

          setUserSession(res.data);
        }
      } catch (error) {
        setLoading(false);
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

  if (error) {
    Swal.fire({
      text: "Oops, something went wrong!",
      icon: "error",
      confirmButtonColor: "#00A9A5",
      timer: "3000",
    });
    setError(false);
  }
  if (loading) return <Loading />;
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
            <h2 className={styles.tittle}>Create your account</h2>
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
              <button
                onMouseOut={() => setDisabled(false)}
                onMouseOver={mouseOverSubmit}
                disabled={isValid ? false : true}
                className={!disabled ? styles.submit : styles.notValid}
                onClick={handleNext}
              >
                Next
              </button>
            </div>

            <footer className={styles.footerInForm}>
              <p className={styles.textsInForm}>
                If you already have an account,{" "}
                <span onClick={change}>log in here</span>
              </p>
            </footer>
          </section>
        )}

        {formStep === 1 && (
          <section>
            {loading && <Loading />}
            <header>
              <div className={styles.backContainer}>
                <ArrowLeftCircle onClick={() => setFormStep(0)} />
                <span>Step 2 of 2</span>{" "}
              </div>
              <p onClick={close} className={styles.x}>
                x
              </p>
            </header>
            {/* <div className={styles.goBack}>
              <img onClick={() => setFormStep(0)} src={goBack} alt="" />
            </div> */}

            <h2 className={styles.tittle}>Create your account</h2>
            <div className={styles.inputContainer}>
              <input
                className={styles.inputFields}
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
                <p className={styles.error}>Email is required</p>
              )}
              {errors.mail?.type === "pattern" && (
                <p className={styles.error}>Please, enter a valid email</p>
              )}
              {emailAlreadyRegistered && (
                <p className={styles.error}>Email already registered</p>
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

            <div className={styles.inputContainer}>
              <button
                onMouseOut={() => setDisabled(false)}
                onMouseOver={mouseOverSubmit}
                disabled={isValid ? false : true}
                className={!disabled ? styles.submit : styles.notValid}
              >
                Submit
              </button>
            </div>
            <footer className={styles.footerInForm}>
              <p className={styles.textsInForm}>
                If you already have an account,{" "}
                <span onClick={change}>log in here</span>
              </p>
            </footer>
          </section>
        )}
      </form>
    </div>
  );
};

export default RegisterForm;
