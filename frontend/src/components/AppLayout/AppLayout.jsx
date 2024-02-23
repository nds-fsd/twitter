import Navbar from "./Navbar";
import WhoToFollow from "./WhoToFollow";
import styles from "./AppLayout.module.css";
import SearchBar from "./SearchBar";
import LogOut from "./LogOut";
import Chat from "../Chat/Chat";

function AppLayout({ children }) {
  return (
    <>
      <div className={styles.centerContainer}>
        <div className={styles.mainContainer}>
          <div className={styles.navbar}>
            <Navbar />
            <LogOut />
          </div>
          <div>{children}</div>
          <div className={styles.right}>
            <SearchBar />
            <WhoToFollow />
            <Chat />
          </div>
        </div>
      </div>
    </>
  );
}

export default AppLayout;
