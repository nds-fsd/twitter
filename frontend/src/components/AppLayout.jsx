import Navbar from "./Navbar";

import Hashtag from "./Hashtags";
import WhoToFollow from "./WhoToFollow";
import styles from "./AppLayout.module.css";
import Buscador from "./Buscador";

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
