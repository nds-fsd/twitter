import styles from "./Public-home.module.css";
import Cat from "../assets/Cat.png";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import PreLoader from "../components/PreLoader";
import { useState, useContext } from "react";

const PublicHome = ({ reloadPage }) => {
  const [popUpRegister, setpopUpRegister] = useState(false);
  const [popUpLogin, setpopUpLogin] = useState(false);

  const handlePopUpRegisterClick = () => {
    setpopUpRegister(!popUpRegister);
    setpopUpLogin(false);
  };

  const handlePopUpLoginClick = () => {
    setpopUpLogin(!popUpLogin);
    setpopUpRegister(false);
  };

  const changeToLoginForm = () => {
    setpopUpRegister(false);
    setpopUpLogin(true);
  };

  const changeToRegisterForm = () => {
    setpopUpLogin(false);
    setpopUpRegister(true);
  };

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      setpopUpRegister(false);
      setpopUpLogin(false);
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
              disabled={popUpRegister || popUpLogin}
              style={{ backgroundColor: "#00A9A5" }}
              onClick={handlePopUpRegisterClick}
            >
              Create account
            </button>
            <p>Or</p>
            <button
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
          close={() => setpopUpRegister(!popUpRegister)}
          change={changeToLoginForm}
        />
      )}
      {popUpLogin && (
        <LoginForm
          reloadPage={reloadPage}
          close={() => setpopUpLogin(!popUpLogin)}
          change={changeToRegisterForm}
        />
      )}
    </>
  );
};

export default PublicHome;
