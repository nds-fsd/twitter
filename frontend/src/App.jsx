import Navbar from "./components/Navbar";
import RegisterForm from "./pages/RegisterForm";
import Hashtag from "./components/Hashtags";
import WhoToFollow from "./components/Who-to-follow";
import VistaUnMeow from "./pages/VistaUnMeow";
import Meows from "./pages/Meows";
import PostForm from "./pages/Post-form";
import Buscador from "./components/Buscador";
import UserProfile from "./pages/UserProfile";
import MeowsFilter from "./components/MeowsFilter";
import PublicHome from "./pages/Public-home";
import styles from "./App.module.css";

function App() {
  return (
    <div>
      {/* <PublicHome></PublicHome> */}
      <div className={styles.centerContainer}>
        <div className={styles.mainContainer}>
          <div className={styles.navbar}>
            <Navbar />
          </div>
          <div>
            {/* <MeowsFilter /> */}
            {/* <PostForm /> */}
            {/* <Meows /> */}
            <UserProfile />
            {/* <VistaUnMeow /> */}
            {/* <RegisterForm /> */}
          </div>
          <div className={styles.right}>
            <Buscador />
            <WhoToFollow />
            <Hashtag />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
