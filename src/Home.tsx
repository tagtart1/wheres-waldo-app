import Header from "./Header";
import LevelCard from "./LevelCard";
import "./styles/Home.css";
import "animate.css";

const Home = () => {
  return (
    <div className="home ">
      <Header />
      <div className="level-container">
        <LevelCard levelName="THE LOC NAR" />
        <LevelCard levelName="THE LOC NAR" />
      </div>
    </div>
  );
};

export default Home;
