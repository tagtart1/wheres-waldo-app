import "./styles/GameHeader.css";
import Timer from "./Timer";
import { Link } from "react-router-dom";

interface Props {
  characterIcons: Array<string>;
}

const GameHeader = ({ characterIcons }: Props) => {
  return (
    <div className="game-header">
      <Link to={"/"}>
        <h1 className="logo">
          <span style={{ color: "white" }}>Spot</span>
          <span style={{ color: "#f53d3d" }}>Em</span>
        </h1>
      </Link>
      <span className="timer">
        <Timer />
      </span>
      <div className="target-icons">
        <img
          className="target-icon"
          src={characterIcons[0]}
          alt="Character Icon"
        ></img>

        <div className="square"></div>
        <div className="square"></div>
      </div>
    </div>
  );
};

export default GameHeader;
