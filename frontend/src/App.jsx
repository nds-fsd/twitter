
import Navbar from "./components/Navbar";
import RegisterForm from "./pages/RegisterForm";
import Hashtag from "./components/Hashtags";
import WhoToFollow from "./components/Who-to-follow";
import VistaUnMeow from "./pages/VistaUnMeow";
import Meows from "./pages/Meows";
import PostForm from "./pages/Post-form";
import styles from "./App.module.css";
import Buscador from "./components/Buscador";

function App() {
  return (
      <div className={styles.mainContainer}>
          <div></div>
          <div>
          <Navbar /> 
          </div>
          <div>
            <PostForm />
            <Meows />
          </div>
          <div>
            <Buscador />
            <WhoToFollow />
            <Hashtag />
          </div>
          <div></div>
          

          {/* <VistaUnMeow /> */}
          {/* <RegisterForm /> */}
       
      </div>
    
  );
}

export default App;
