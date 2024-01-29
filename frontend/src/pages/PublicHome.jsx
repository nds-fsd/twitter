import styles from "./PublicHome.module.css";
import Cat from "../assets/Cat.png";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { useState } from "react";

const PublicHome = ({ reloadPage }) => {
  const [popUpRegister, setPopUpRegister] = useState(false);
  const [popUpLogin, setPopUpLogin] = useState(false);

  const handlePopUpRegisterClick = () => {
    setPopUpRegister(!popUpRegister);
    setPopUpLogin(false);
  };

  const handlePopUpLoginClick = () => {
    setPopUpLogin(!popUpLogin);
    setPopUpRegister(false);
  };

  const changeToLoginForm = () => {
    setPopUpRegister(false);
    setPopUpLogin(true);
  };

  const changeToRegisterForm = () => {
    setPopUpLogin(false);
    setPopUpRegister(true);
  };

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      setPopUpRegister(false);
      setPopUpLogin(false);
    }
  });

  return (
    <>
      <div
        className={styles.container}
        style={{
          opacity: popUpRegister || popUpLogin ? "0.8" : "1",
          backgroundColor: popUpRegister || popUpLogin ? "grey" : "black",
        }}
      >
        <img className={styles.logo} src={Cat} />

        <div className={styles.right}>
          <h1>Happening now</h1>
          <div className={styles.buttons}>
            <button
              className={styles.createButton}
              disabled={popUpRegister || popUpLogin}
              onClick={handlePopUpRegisterClick}
            >
              Create account
            </button>
            <p>or</p>
            <button
              className={styles.loginButton}
              disabled={popUpRegister || popUpLogin}
              onClick={handlePopUpLoginClick}
            >
              Login
            </button>
          </div>
        </div>
      </div>
      {popUpRegister && (
        <RegisterForm
          reloadPage={reloadPage}
          close={() => setPopUpRegister(!popUpRegister)}
          change={changeToLoginForm}
        />
      )}
      {popUpLogin && (
        <LoginForm
          reloadPage={reloadPage}
          close={() => setPopUpLogin(!popUpLogin)}
          change={changeToRegisterForm}
        />
      )}
    </>
  );
};

export default PublicHome;
