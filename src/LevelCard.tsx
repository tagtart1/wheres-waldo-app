import TEST_LEVEL_CROPPED from "./LocNar-cropped.jpg";
import "./styles/LevelCard.css";

interface Props {
  levelName: string;
}

const LevelCard = ({ levelName }: Props) => {
  const fetchImg = (levelName: string) => {
    if (levelName === "TEST_LEVEL") return TEST_LEVEL_CROPPED;
  };

  return (
    <div className="level-display-card">
      <h1 className="level-name">{levelName}</h1>

      <img
        className="display-img"
        alt="Level Preview"
        src={fetchImg(levelName)}
      ></img>
    </div>
  );
};

export default LevelCard;
