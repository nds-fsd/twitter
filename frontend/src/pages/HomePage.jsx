import styles from "../App.module.css";
import Navbar from "../components/Navbar";

import MeowsFilter from "../components/MeowsFilter";
import PostForm from "./Post-form";
import Meows from "./Meows";
import Buscador from "../components/Buscador";
import WhoToFollow from "../components/Who-to-follow";
import Hashtag from "../components/Hashtags";
import VistaUnMeow from "./VistaUnMeow";
import { useParams, Outlet } from "react-router-dom";

const HomePage = () => {
  return (
    <div className={styles.centerContainer}>
      <div className={styles.mainContainer}>
        <div className={styles.navbar}>
          <Navbar />
        </div>
        <div>
          <MeowsFilter />
          <PostForm />
          <Meows />
        </div>
        <div className={styles.right}>
          <Buscador />
          <WhoToFollow />
          <Hashtag />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
