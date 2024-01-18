import MeowsFilter from "../components/MeowsFilter";
import PostMeow from "./PostMeow";
import Meows from "./Meows";

const HomePage = () => {
  return (
    <div>
      <MeowsFilter />
      <PostMeow />
      <Meows />
    </div>
  );
};

export default HomePage;
