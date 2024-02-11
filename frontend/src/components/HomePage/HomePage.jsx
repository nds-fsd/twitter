import PostForm from "./PostMeow";
import Meows from "../Meows/ListOfMeows";
import { useState, createContext } from "react";
export const meowContext = createContext();

const HomePage = () => {
  const [newMeow, setNewMeow] = useState("");
  return (
    <meowContext.Provider value={{ newMeow, setNewMeow }}>
      <div>
        <PostForm />
        <Meows />
      </div>
    </meowContext.Provider>
  );
};

export default HomePage;
