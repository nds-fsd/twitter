import Navbar from "./Navbar";
import Hashtag from "./Hashtags";
import WhoToFollow from "./Who-to-follow";
import styles from "./App.module.css";
import Buscador from "./Buscador";

export const context = createContext();

function AppLayout({ children }) {
  return (
    <>
      <div className={styles.centerContainer}>
        <div className={styles.mainContainer}>
          <div className={styles.navbar}>
            <Navbar />
          </div>
          <div>{children}</div>
          <div className={styles.right}>
            <Buscador />
            <WhoToFollow />
            <Hashtag />
          </div>
        </div>
      </div>
    </>
  );
}

export default AppLayout;
