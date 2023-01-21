import "./styles/GameHeader.css";
import Timer from "./Timer";
import { Link } from "react-router-dom";

interface Props {
  targets: Array<{ name: string; iconUrl: string }>;
}

const GameHeader = ({ targets }: Props) => {
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
          src={targets[0].iconUrl}
          alt="Character Icon"
        ></img>

        <img
          className="target-icon"
          src={targets[1].iconUrl}
          alt="Character Icon"
        ></img>
        <img
          className="target-icon"
          src={targets[2].iconUrl}
          alt="Character Icon"
        ></img>
      </div>
    </div>
  );
};

export default GameHeader;
