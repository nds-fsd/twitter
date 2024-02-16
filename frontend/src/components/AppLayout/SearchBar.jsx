import { useState } from "react";
import styles from "./SearchBar.module.css";

function SearchBar() {
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
    <div className={color ? styles.searchScroll : styles.search}>
      <input
        className={styles.buscador}
        placeholder="Search"
        type="text"
      ></input>
    </div>
  );
}

export default SearchBar;
