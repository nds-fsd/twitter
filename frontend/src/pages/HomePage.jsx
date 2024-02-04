import MeowsFiltered from "../pages/MeowsFiltered";
import PostForm from "./PostMeow";
import Meows from "./Meows";

const HomePage = () => {
  return (
    <div>
      <MeowsFiltered />
      <PostForm />
      <Meows />
    </div>
  );
};

export default HomePage;
