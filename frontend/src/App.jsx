import Navbar from "./components/Navbar"
import Hashtag from "./components/Hashtags"
import WhoToFollow from "./components/Who-to-follow"
import VistaUnMeow from "./components/VistaUnMeow";

import styles from "./App.module.css";


function App() {
    return (
      <div className={styles.mainContainer}>
        <Navbar />
        <div>
          <p>List of meows</p>          
        </div>
        <div>
          <WhoToFollow />
          <Hashtag />
        </div>
      </div>
  )
}

export default App
