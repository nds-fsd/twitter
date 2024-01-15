import HomePage from "./pages/HomePage";
import VistaUnMeow from "./pages/VistaUnMeow";
import Profile from "./pages/Profile";
import PreLoader from "./components/PreLoader";

import PublicHome from "./pages/Public-home";
import { getUserToken } from "./local-storage";
import { Route, Routes, Navigate } from "react-router-dom";
import { useState, createContext } from "react";
import AppLayout from "./components/AppLayout";
export const context = createContext();

function App() {
  const [isLogged, setIsLogged] = useState(!!getUserToken());
  const [preLoader, setPreLoader] = useState(false);

  if (!isLogged) {
    return (
      <context.Provider value={{ setIsLogged, setPreLoader }}>
        <Navigate to="/" />
        <PublicHome />
      </context.Provider>
    );
    S;
  }

  return (
    <>
      <context.Provider value={{ setIsLogged, setPreLoader }}>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />

            <Route
              path="/home"
              element={
                <>
                  {preLoader && <PreLoader />}
                  <HomePage />
                </>
              }
            />
            <Route path="/meow/:id" element={<VistaUnMeow />} />
            <Route path="user/:username" element={<Profile />} />
          </Routes>
        </AppLayout>
      </context.Provider>
    </>
  );
}

export default App;
