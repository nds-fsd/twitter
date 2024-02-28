import Navbar from "./Navbar";
import WhoToFollow from "./WhoToFollow";
import styles from "./AppLayout.module.css";
import SearchBar from "./SearchBar";
import LogOut from "./LogOut";

// import Toast from "../Notifications/Toast";
// import io from "socket.io-client";

// const socket = io('ws://localhost:3001');

function AppLayout({ children }) {
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.navbar}>
          {/* <Toast socket={socket} /> */}
          <Navbar />
          <LogOut />
        </div>
        <div>{children}</div>
        <div className={styles.right}>
          <SearchBar />
          <WhoToFollow />
        </div>
      </div>
    </>
  );
}

export default AppLayout;
