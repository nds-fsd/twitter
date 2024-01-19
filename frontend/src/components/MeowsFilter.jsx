import styles from "./MeowsFilter.module.css";

function MeowsFilter() {
  return (
    <div className={styles.container}>
      <div className={styles.options}>
        <p>Here are your Meows!</p>
      </div>
    </div>
  );
}

export default MeowsFilter;
