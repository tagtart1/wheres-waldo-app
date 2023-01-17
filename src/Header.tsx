// @ts-ignore
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div className="home-header-container">
      <h1>
        <span style={{ color: "white" }}>Spot</span>
        <span style={{ color: "#f53d3d" }}>Em</span>
      </h1>
      <Link to={"/credits"}>
        <div style={{ color: "white" }}>Credits</div>
      </Link>
    </div>
  );
};

export default Header;
