import { useState } from "react";
import MeowsFiltered from "../pages/MeowsFiltered";
import PostForm from "./PostMeow";
import Meows from "./Meows";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const [color, setColor] = useState(false);
  const changeColor = () => {
    if (window.scrollY >= 70) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  window.addEventListener("scroll", changeColor);

  return (
    <div className={styles.mainContainer}>
      <div>
        <MeowsFiltered />
        <PostForm />
        <Meows />
      </div>
    </div>
  );
};

export default HomePage;
