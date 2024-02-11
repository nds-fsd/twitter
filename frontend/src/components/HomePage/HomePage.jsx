import styles from "./HomePage.module.css";
import PostForm from "./PostMeow";
import Meows from "../Meows/ListOfMeows";
import { useState, createContext } from "react";
export const meowContext = createContext();

const HomePage = () => {
  const [newMeow, setNewMeow] = useState("");
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
