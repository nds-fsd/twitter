import { useState } from "react";
import MeowsFilter from "../components/MeowsFilter";
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
      <PostForm />
      <Meows />
    </div>
  );
};

export default HomePage;
