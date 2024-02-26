import { Route, Routes, Navigate } from "react-router-dom";
import { useState, createContext } from "react";
import { getUserToken } from "./functions/localStorage";
import HomePage from "./components/HomePage/HomePage";
import MeowView from "./components/Meows/MeowView";
import UserProfile from "./components/Profile/UserProfile";
import MeowsBookmarked from "./components/Meows/MeowsBookmarked";
import Notifications from "./components/Notifications/Notifications";
import PublicHome from "./components/PublicHome/PublicHome";
import AppLayout from "./components/AppLayout/AppLayout";
import Chat from "./components/Messages/Chat";
import io from "socket.io-client";

export const context = createContext();
const socket = io("ws://localhost:3001");
console.log(socket);

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
                  <HomePage />
                </>
              }
            />
            <Route path="/meow/:id" element={<MeowView />} />
            <Route path="/user/:username" element={<UserProfile />} />
            <Route path="/bookmark/:username" element={<MeowsBookmarked />} />
            <Route path="/notification/:username" element={<Notifications />} />
            <Route path="/messages/:username" element={<Chat socket={socket}/>} />
          </Routes>
        </AppLayout>
      </context.Provider>
    </>
  );
}

export default App;
