import styles from "./HomePage.module.css";
import PostForm from "./PostMeow";
import Meows from "../Meows/ListOfMeows";

const HomePage = () => {
  return (
    <div className={styles.mainContainer}>
      <div>
        <PostForm />
        <Meows />
      </div>
    </div>
  );
};

export default HomePage;
