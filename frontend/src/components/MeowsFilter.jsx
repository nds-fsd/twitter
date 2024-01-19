import { useState } from "react";
import styles from "./MeowsFilter.module.css";

function MeowsFilter() {
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
    <div className={color ? styles.header : styles.container}>
      <div className={styles.options}>
        <p>Here are your Meows!</p>
      </div>
    </div>
  );
}

export default MeowsFilter;
