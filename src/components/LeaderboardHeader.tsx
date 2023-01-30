import { Link } from "react-router-dom";
import "../styles/Header.css";

const LeaderboardHeader = () => {
  return (
    <div className="home-header-container">
      <Link to={"/"}>
        <h1 className="header-logo">
          <span style={{ color: "white" }}>Spot</span>
          <span style={{ color: "#f53d3d" }}>Em</span>
        </h1>
      </Link>
      <h2 style={{ color: "white" }}>Leaderboard</h2>
      <Link to={"/credits"}>
        <div style={{ color: "white" }}>Credits</div>
      </Link>
    </div>
  );
};

export default LeaderboardHeader;
