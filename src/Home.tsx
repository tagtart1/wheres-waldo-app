import Header from "./Header";
import LevelCard from "./LevelCard";
import "./styles/Home.css";

const Home = () => {
  return (
    <div className="home">
      <Header />
      <div className="level-container">
        <LevelCard levelName="TEST_LEVEL" />
        <LevelCard levelName="TEST_LEVEL" />
      </div>
    </div>
  );
};

export default Home;
