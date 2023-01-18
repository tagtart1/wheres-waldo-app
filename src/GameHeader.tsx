import "./styles/GameHeader.css";
import Timer from "./Timer";
import { Link } from "react-router-dom";

const GameHeader = () => {
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
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
      </div>
    </div>
  );
};

export default GameHeader;
