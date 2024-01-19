import MeowsFilter from "../components/MeowsFilter";
import PostForm from "./PostMeow";
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
