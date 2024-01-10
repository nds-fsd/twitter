import Navbar from "./components/Navbar";
import RegisterForm from "./pages/RegisterForm";
import Hashtag from "./components/Hashtags";
import WhoToFollow from "./components/Who-to-follow";
import VistaUnMeow from "./pages/VistaUnMeow";
import Meows from "./pages/Meows";
import PostForm from "./pages/Post-form";
import styles from "./App.module.css";
import Buscador from "./components/Buscador";
import Profile from "./pages/Profile";
import MeowsFilter from "./components/MeowsFilter";
import PublicHome from "./pages/Public-home";
import { getUserToken } from "./local-storage";
import { Link, Route, Routes, Navigate } from "react-router-dom";
import { useState, createContext } from "react";
export const context = createContext();

function App() {
  const [isLogged, setIsLogged] = useState(!!getUserToken());

  if (!isLogged) {
    return (
      <context.Provider value={{ setIsLogged }}>
        <PublicHome />;
      </context.Provider>
    );
  }

  return (
    <>
      <context.Provider value={{ setIsLogged }}>
        <Routes>
          <Route
            path="/"
            element={
              <div className={styles.centerContainer}>
                <div className={styles.mainContainer}>
                  <div className={styles.navbar}>
                    <Navbar />
                  </div>
                  <div>
                    <MeowsFilter />
                    <PostForm />
                    <Meows />
                  </div>
                  <div className={styles.right}>
                    <Buscador />
                    <WhoToFollow />
                    <Hashtag />
                  </div>
                </div>
              </div>
            }
          />
        </Routes>
      </context.Provider>
    </>
  );
}

export default App;
