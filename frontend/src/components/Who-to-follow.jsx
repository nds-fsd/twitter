import styles from "./Who-to-follow.module.css";
import image from "../assets/Elon-Musk.jpg";

function WhoToFollow() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Who to follow</h1>
      <div>
        <div className={styles.containerFollow}>
          <img className={styles.accountImage} src={image} alt="" />
          <div>
            <p className={styles.name}>Name Surname</p>
            <p className={styles.accountName}>@Account_Name</p>
          </div>
          <button className={styles.buttonFollow}>Follow</button>
        </div>
        <div className={styles.containerFollow}>
          <img className={styles.accountImage} src={image} alt="" />
          <div>
            <p className={styles.name}>Name Surname</p>
            <p className={styles.accountName}>@Account_Name</p>
          </div>
          <button className={styles.buttonFollow}>Follow</button>
        </div>
      </div>
      <button className={styles.showMore}>Show more</button>
    </div>
  );
}

export default WhoToFollow;
