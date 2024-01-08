import styles from "./Hashtags.module.css";

function Hashtag() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Spain trends</h1>
      <div className={styles.containerTrend}>
        <div className={styles.trendBox}>
          <p className={styles.trendText}>1. Category</p>
          <h3 className={styles.hashtag}>#Hashtag</h3>
          <p className={styles.trendText}>Number of posts</p>
        </div>
        <button className={styles.trendsButton}>...</button>
      </div>
      <div className={styles.containerTrend}>
        <div className={styles.trendBox}>
          <p className={styles.trendText}>1. Category</p>
          <h3 className={styles.hashtag}>#Hashtag</h3>
          <p className={styles.trendText}>Number of posts</p>
        </div>
        <button className={styles.trendsButton}>...</button>
      </div>
      <button className={styles.showMore}>Show more</button>
    </div>
  );
}

export default Hashtag;
