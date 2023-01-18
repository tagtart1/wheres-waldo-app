import Header from "./Header";
import LevelCard from "./LevelCard";
import "./styles/Home.css";

interface Props {
  setSelectedLevelName: Function;
}

const Home = ({ setSelectedLevelName }: Props) => {
  return (
    <div className="home">
      <Header />
      <div className="level-container">
        <LevelCard
          levelName="TEST_LEVEL"
          setSelectedLevelName={setSelectedLevelName}
        />
        <LevelCard
          levelName="TEST_LEVEL3001"
          setSelectedLevelName={setSelectedLevelName}
        />
      </div>
    </div>
  );
};

export default Home;
