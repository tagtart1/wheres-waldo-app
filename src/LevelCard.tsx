import TEST_LEVEL_CROPPED from "./LocNar-cropped.jpg";
import "./styles/LevelCard.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";

interface Props {
  levelName: string;
}

const LevelCard = ({ levelName }: Props) => {
  const fetchImg = (levelName: string) => {
    return TEST_LEVEL_CROPPED;
  };

  const levelNameFormatted = levelName.toLowerCase().replaceAll(" ", "-");

  useEffect(() => {
    // Get the img and cropped img
  }, []);

  return (
    <Link to={`/play/${levelNameFormatted}`}>
      <div className="level-display-card">
        <h1 className="level-name">{levelName}</h1>

        <img
          className="display-img"
          alt="Level Preview"
          src={fetchImg(levelName)}
        ></img>
      </div>
    </Link>
  );
};

export default LevelCard;
