import styles from "./HomePage.module.css";
import PostForm from "./PostMeow";
import Meows from "../Meows/ListOfMeows";

const HomePage = () => {
  return (
    <div>
      <PostForm />
      <Meows />
    </div>
  );
};

export default HomePage;
