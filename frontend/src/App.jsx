import Navbar from "./components/Navbar";
import RegisterForm from "./pages/RegisterForm";
import Hashtag from "./components/Hashtags";
import WhoToFollow from "./components/WhoToFollow";
import VistaUnMeow from "./pages/VistaUnMeow";
import Meows from "./pages/Meows";
import PostForm from "./pages/PostForm";
import styles from "./App.module.css";
import Buscador from "./components/Buscador";
import Profile from "./pages/Profile";
import MeowsFilter from "./components/MeowsFilter";
import PublicHome from "./pages/PublicHome";

function App() {
  return (
    <div>
      <PublicHome></PublicHome>
      <div className={styles.centerContainer}>
        <div className={styles.mainContainer}>
          <div className={styles.navbar}>{/* <Navbar /> */}</div>
          <div>
            {/* <MeowsFilter />
            {/* <PostForm />
            <Meows /> */}
            {/* <Profile /> */}
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
    </div>
  );
}

export default App;
