import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
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
import {
  Link,
  Route,
  Routes,
  Navigate,
  Outlet,
  redirect,
} from "react-router-dom";
import { useState, createContext, useEffect } from "react";
export const context = createContext();

function App() {
  const [isLogged, setIsLogged] = useState(!!getUserToken());

  return (
    <>
      {!isLogged && <Navigate to="/" />}
      <context.Provider value={{ setIsLogged }}>
        <Routes>
          <Route
            path="/"
            element={isLogged ? <Navigate to="/home" /> : <PublicHome />}
          ></Route>

          <Route path="/home" element={<HomePage />}>
            <Route
              path="/home"
              element={
                <>
                  <PostForm></PostForm>
                  <Meows />
                </>
              }
            />
            <Route path="user/:username" element={<Profile />} />
            <Route path="meow/:id" element={<VistaUnMeow />} />
          </Route>
        </Routes>
      </context.Provider>
    </>
  );
}

export default App;
