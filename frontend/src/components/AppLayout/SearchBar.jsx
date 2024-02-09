import styles from "./SearchBar.module.css";

function SearchBar() {
  return (
    <div className={styles.search}>
      <input
        className={styles.buscador}
        placeholder="Search"
        type="text"
      ></input>
    </div>
  );
}

export default SearchBar;
