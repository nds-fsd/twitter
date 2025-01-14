import styles from "./LoginForm.module.css";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { userApi } from "../../functions/apiWrapper";
import { setUserSession } from "../../functions/localStorage";
import Loading from "../../effects/Loading";
import { context } from "../../App";
import { useContext } from "react";

const LoginForm = ({ close, change, load }) => {
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [mailNotFound, setMailNotFound] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const success = useContext(context);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: "all" });

  const mouseOverSubmit = () => {
    if (!isValid) {
      setDisabled(true);
    }
  };

  const onSubmit = (data) => {
    const login = async () => {
      try {
        setLoading(true);

        const res = await userApi().post("/login", data);
        setLoading(false);

        setUserSession(res.data);
        success.setIsLogged(true);
        success.setPreLoader(true);
      } catch (err) {
        setLoading(false);

        if (err.response.data.error.mail) {
          setMailNotFound(true);
          setInvalidPassword(false);
          return;
        } else if (err.response.data.error.password) {
          setInvalidPassword(true);
          setMailNotFound(false);
          return;
        }
        setServerError(true);
      }
    };

    login();
  };

  if (serverError) {
    Swal.fire({
      text: "Oops, something went wrong!",
      icon: "error",
      confirmButtonColor: "#00A9A5",
      timer: "3000",
    });
    setServerError(false);
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <header>
          <span onClick={close} className={styles.x}>
            x
          </span>
          {loading && <Loading />}
        </header>
        <h2 className={styles.tittle}>Access to your account</h2>
        <div className={styles.inputContainer}>
          <input
            onFocus={() => setMailNotFound(false)}
            className={styles.inputFields}
            maxLength={80}
            type="text"
            name=""
            placeholder="Mail"
            {...register("mail", { required: true })}
          />
          {mailNotFound && (
            <p className={styles.textsInForm}>
              Mail not found. Want to{" "}
              <span onClick={change}>create a new account?</span>
            </p>
          )}
        </div>

        <div className={styles.inputContainer}>
          <input
            onFocus={() => setInvalidPassword(false)}
            className={styles.inputFields}
            maxLength={30}
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          {invalidPassword && (
            <p className={styles.textsInForm}>
              The password is incorrect. Please try again.
            </p>
          )}
        </div>
        <div className={styles.inputContainer}>
          <button
            onMouseOut={() => setDisabled(false)}
            onMouseOver={mouseOverSubmit}
            disabled={isValid ? false : true}
            className={!disabled ? styles.submit : styles.notValid}
          >
            Log in
          </button>
        </div>
        <footer className={styles.footerInForm}>
          <p className={styles.textsInForm}>
            If you don't have an account,{" "}
            <span onClick={change}> register here</span>
          </p>
        </footer>
      </form>
    </div>
  );
};

export default LoginForm;
