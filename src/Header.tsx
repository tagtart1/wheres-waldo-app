// @ts-ignore
import { Link } from "react-router-dom";
import "./styles/Header.css";

const Header = () => {
  return (
    <div className="home-header-container">
      <h1>
        <span style={{ color: "white" }}>Spot</span>
        <span style={{ color: "#f53d3d" }}>Em</span>
      </h1>
      <h2 style={{ color: "white" }}>Select A Level To Play!</h2>
      <Link to={"/credits"}>
        <div style={{ color: "white" }}>Credits</div>
      </Link>
    </div>
  );
};

export default Header;
