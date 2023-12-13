
import Navbar from "./components/Navbar";
import RegisterForm from "./components/RegisterForm";
import Hashtag from "./components/Hashtags";
import WhoToFollow from "./components/Who-to-follow";
import VistaUnMeow from "./components/VistaUnMeow";
import Meows from "./components/Meows";
import PostForm from "./components/Post-form";
import styles from "./App.module.css";
import Buscador from "./components/Buscador";

function App() {
  return (
    <>
      <div className={styles.mainContainer}>
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
        
        
        {/* <VistaUnMeow /> */}
        {/* <RegisterForm /> */}
       
      </div>
    </>
  );
}

export default App;
