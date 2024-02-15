import styles from "./HomePage.module.css";
import PostForm from "./PostMeow";
import ListOFMeows from "../Meows/ListOfMeows";
import { useState, createContext } from "react";
export const meowContext = createContext();

const HomePage = () => {
  const [newMeow, setNewMeow] = useState("");
  return (
    <meowContext.Provider value={{ newMeow, setNewMeow }}>
      <div className={styles.mainContainer}>
        <div>
          <PostForm />
          <ListOFMeows />
        </div>
      </div>
    </meowContext.Provider>
  );
};

export default HomePage;
