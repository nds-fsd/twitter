import Navbar from "./Navbar";
import WhoToFollow from "./WhoToFollow";
import styles from "./AppLayout.module.css";
import SearchBar from "./SearchBar";

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
            <SearchBar />
            <WhoToFollow />
          </div>
        </div>
      </div>
    </>
  );
}

export default AppLayout;
