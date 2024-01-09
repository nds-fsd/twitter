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
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";

function App() {
  const isLogged = !!getUserToken();
  console.log(isLogged);
  return (
    <div>
      {!isLogged && <PublicHome />}
      {isLogged && (
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
                    {/* <Profile />
                    {/* <VistaUnMeow /> */}
                    {/* <RegisterForm /> */}
                  </div>
                  <div className={styles.right}>
                    {/* <Buscador />
            <WhoToFollow />
            <Hashtag /> */}
                  </div>
                </div>
              </div>
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
