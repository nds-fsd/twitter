import PostForm from "./PostMeow";
import ListOFMeows from "../Meows/ListOfMeows";
import { useState, createContext } from "react";
export const meowContext = createContext();

const HomePage = () => {
  const [newMeow, setNewMeow] = useState("");
  return (
    <meowContext.Provider value={{ newMeow, setNewMeow }}>
      <div style={{ width: "100%" }}>
        <div>
          <PostForm />
          <ListOFMeows />
        </div>
      </div>
    </meowContext.Provider>
  );
};

export default HomePage;
