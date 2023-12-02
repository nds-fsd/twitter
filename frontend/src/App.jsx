import Navbar from "./components/Navbar"
import Hashtag from "./Component-hashtags/Hashtags"
import WhoToFollow from "./Component-who_to_follow/Who-to-follow"
import styles from "./App.module.css";


function App() {
    return (
    <div className={styles.mainContainer}>
        <Navbar />
        <div>List of meows</div>
        <div>
          <WhoToFollow />
          <Hashtag />
        </div>
    </div>

  )
}

export default App
