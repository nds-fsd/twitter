import styles from "./LoginForm.module.css";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { userApi } from "../apis/apiWrapper";
import { setUserSession } from "../local-storage";
import Loading from "../effects/Loading";

import { context } from "../App";
import { useContext } from "react";

const LoginForm = ({ close, change, load }) => {
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [emailNotFound, setEmailNotFound] = useState(false);
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

        const res = await userApi.post("/login", data);
        setLoading(false);

        setUserSession(res.data);
        success.setIsLogged(true);
        success.setPreLoader(true);
      } catch (err) {
        setLoading(false);
        if (err.code === "ERR_NETWORK") setServerError(true);
        console.log(err);
        if (err.response.status !== 201 && err.response.status !== 400) {
          setServerError(true);
        }

        if (err.response.data.error.email) {
          setEmailNotFound(true);
          setInvalidPassword(false);
          return;
        } else if (err.response.data.error.password) {
          setInvalidPassword(true);
          setEmailNotFound(false);
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
        <div>
          <input
            onFocus={() => setEmailNotFound(false)}
            className={styles.inputFields}
            maxLength={80}
            type="text"
            name=""
            placeholder="Email"
            {...register("mail", { required: true })}
          />
          {/* {emailNotFound && (
            <p className={styles.footerText}>User email not found.</p>
          )} */}
          {emailNotFound && (
            <p className={styles.footerText}>
              User email not found. Want to
              <span onClick={change}> create a new account?</span>
            </p>
          )}
        </div>

        <div>
          <input
            onFocus={() => setInvalidPassword(false)}
            className={styles.inputFields}
            maxLength={30}
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          {invalidPassword && (
            <p>The password is incorrect. Please try again.</p>
          )}
        </div>
        <div>
          <input
            onMouseOut={() => setDisabled(false)}
            onMouseOver={mouseOverSubmit}
            disabled={isValid ? false : true}
            className={!disabled ? styles.submit : styles.notValid}
            type="submit"
            value={"Log in"}
          ></input>
        </div>
        <footer>
          <p className={styles.footerText}>
            If you don't have an account,{" "}
            <span onClick={change}> register here</span>
          </p>
        </footer>
      </form>
    </div>
  );
};

export default LoginForm;
