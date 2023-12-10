import Navbar from "./components/Navbar";
import RegisterForm from "./components/RegisterForm";
import Hashtag from "./components/Hashtags";
import WhoToFollow from "./components/Who-to-follow";
import VistaUnMeow from "./components/VistaUnMeow";
import Meows from "./components/Meows";
import styles from "./App.module.css";

function App() {
  return (
    <>
      <div className={styles.mainContainer}>
        <WhoToFollow />
        <Hashtag />
        <Meows />
        <Navbar />
        <RegisterForm />
        <VistaUnMeow />
      </div>
    </>
  );
}

export default App;
