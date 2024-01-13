import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Hashtag from "./components/Hashtags";
import WhoToFollow from "./components/Who-to-follow";
import VistaUnMeow from "./pages/VistaUnMeow";
import Meows from "./pages/Meows";
import PostForm from "./pages/Post-form";

import Buscador from "./components/Buscador";
import Profile from "./pages/Profile";
import MeowsFilter from "./components/MeowsFilter";
import PublicHome from "./pages/Public-home";
import { getUserToken } from "./local-storage";
import { Route, Routes, Navigate } from "react-router-dom";
import { useState, createContext } from "react";
import AppLayout from "./components/AppLayout";
export const context = createContext();

function App() {
  const [isLogged, setIsLogged] = useState(!!getUserToken());

  if (!isLogged) {
    return (
      <context.Provider value={{ setIsLogged }}>
        <PublicHome />
      </context.Provider>
    );
  }

  return (
    <>
      <context.Provider value={{ setIsLogged }}>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/meow/:id" element={<VistaUnMeow />} />
            <Route path="user/:username" element={<Profile />} />
          </Routes>
        </AppLayout>
      </context.Provider>
    </>
  );
}

export default App;
