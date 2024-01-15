import Navbar from "../components/Navbar";

import MeowsFilter from "../components/MeowsFilter";
import PostForm from "./Post-form";
import Meows from "./Meows";

const HomePage = () => {
  return (
    <div>
      <MeowsFilter />
      <PostForm />
      <Meows />
    </div>
  );
};

export default HomePage;
