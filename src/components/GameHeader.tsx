import "../styles/GameHeader.css";
import Timer from "./Timer";
import { Link } from "react-router-dom";

interface Props {
  targets: Array<{
    name: string;
    iconUrl: string;
    isFound: boolean;
    id: string;
  }>;
  isLoading: boolean;
}

const GameHeader = ({ targets, isLoading }: Props) => {
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
        {isLoading ? (
          <div></div>
        ) : (
          targets.map((target, index) =>
            target.isFound ? (
              <img
                key={index}
                className="target-icon"
                src={target.iconUrl}
                alt="Character Icon"
                style={{ opacity: "40%" }}
              ></img>
            ) : (
              <img
                key={index}
                className="target-icon"
                src={target.iconUrl}
                alt="Character Icon"
              ></img>
            )
          )
        )}
      </div>
    </div>
  );
};

export default GameHeader;
