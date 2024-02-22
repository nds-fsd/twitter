import styles from "./Navbar.module.css";
import { useContext } from "react";
import { context } from "../../App";
import { getUserSession } from "../../functions/localStorage";
import { useNavigate } from "react-router-dom";
import { Home, UserRound, Mail, BellRing, Bookmark } from "lucide-react";
import { logo } from "../../assets/defaultAssets";

function Navbar() {
  const navigate = useNavigate();
  const loggedUser = getUserSession();
  const loggedUsername = loggedUser.username;
  const reload = useContext(context);

  return (
    <div className={styles.container}>
      <img
        className={styles.logo}
        src={logo}
        alt="logo"
        onClick={() => navigate("/home")}
      />
      <nav className={styles.navbar}>
        <div className={styles.navigator}>
          <div className={styles.options} onClick={() => navigate("/home")}>
            <Home />
            <p>Home</p>
          </div>
          <div
            onClick={() => {
              navigate("/notification/" + loggedUsername);
              reload.setReload(!reload.reload);
            }}
            className={styles.options}
          >
            <BellRing />
            <p>Notifications</p>
          </div>
          {/* <div className={styles.options}> <Mail /> <p>Messages</p> </div> */}
          <div
            onClick={() => {
              navigate("/bookmark/" + loggedUsername);
              reload.setReload(!reload.reload);
            }}
            className={styles.options}
          >
            <Bookmark />
            <p>Bookmark</p>
          </div>
          <div
            onClick={() => {
              navigate("/user/" + loggedUsername);
              reload.setReload(!reload.reload);
            }}
            className={styles.options}
          >
            <UserRound />
            <p>Profile</p>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
