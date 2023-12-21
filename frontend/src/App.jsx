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
import PublicHome from "./pages/Public-home";


function App() {
  return (
    <PublicHome></PublicHome>
    // <div className={styles.centerContainer}>
    //   <div className={styles.mainContainer}>
    //     <div className={styles.navbar}>
    //       <Navbar />
    //     </div>
    //     <div>
    //       <PostForm />
    //       <Meows />
    //       {/* <Profile /> */}
    //       {/* <VistaUnMeow /> */}
    //       {/* <RegisterForm /> */}
    //     </div>
    //     <div className={styles.right}>
    //       <Buscador />
    //       <WhoToFollow />
    //       <Hashtag />
    //     </div>
    //   </div>
    // </div>
  );
}

export default App;
