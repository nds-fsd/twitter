import styles from "./MeowsFilter.module.css";

function MeowsFilter() {
  return (
    <div className={styles.container}>
      <div className={styles.options}>
        <p>For you</p>
      </div>
      <div className={styles.options}>
        <p>Following</p>
      </div>
    </div>
  );
}

export default MeowsFilter;
