import { Route, Routes, Navigate } from "react-router-dom";
import { useState, createContext } from "react";
import { getUserToken } from "./functions/localStorage";
import HomePage from "./components/HomePage/HomePage";
import MeowView from "./components/Meows/MeowView";
import UserProfile from "./components/Profile/UserProfile";
import PreLoader from "./effects/PreLoader";
import PublicHome from "./components/PublicHome/PublicHome";
import AppLayout from "./components/AppLayout/AppLayout";

export const context = createContext();

function App() {
  const [isLogged, setIsLogged] = useState(!!getUserToken());
  const [preLoader, setPreLoader] = useState(false);
  const [reload, setReload] = useState(false);

  if (!isLogged) {
    return (
      <context.Provider value={{ setIsLogged, setPreLoader }}>
        <Navigate to="/" />
        <PublicHome />
      </context.Provider>
    );
  }

  return (
    <>
      <context.Provider
        value={{ setIsLogged, setPreLoader, setReload, reload }}
      >
        <AppLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route
              path="/home"
              element={
                <>
                  {/* {preLoader && <PreLoader />} */}
                  <HomePage />
                </>
              }
            />
            <Route path="/meow/:id" element={<MeowView />} />
            <Route path="/user/:username" element={<UserProfile />} />
          </Routes>
        </AppLayout>
      </context.Provider>
    </>
  );
}

export default App;
