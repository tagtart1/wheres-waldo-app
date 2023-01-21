import "./styles/Dropdown.css";
import { useEffect } from "react";

interface Props {
  targets: Array<{ name: string; iconUrl: string }>;
  clickCoords: { x: number; y: number };
  isVisible: boolean;
}

const Dropdown = ({ targets, clickCoords, isVisible }: Props) => {
  useEffect(() => {
    const dropdown = document.getElementById("dropdown");
    if (!dropdown) return;

    // Make sures drop down doesnt go off screen
    if (clickCoords.x > 90) {
      dropdown.style.removeProperty("left");
      dropdown.style.right = `${100 - clickCoords.x}%`;
    } else {
      dropdown.style.removeProperty("right");
      dropdown.style.left = `${clickCoords.x}%`;
    }

    dropdown.style.top = `${clickCoords.y}%`;
  });

  return (
    <div className="dropdown-container" id="dropdown">
      {isVisible && (
        <ul className="dropdown-list">
          <li>
            <img
              className="dropdown-target-icon"
              src={targets[0].iconUrl}
              alt={"Target"}
            />
            {targets[0].name}
          </li>
          <li>
            <img
              className="dropdown-target-icon"
              src={targets[1].iconUrl}
              alt={"Target"}
            />
            {targets[1].name}
          </li>
          <li>
            <img
              className="dropdown-target-icon"
              src={targets[2].iconUrl}
              alt={"Target"}
            />
            {targets[2].name}
          </li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
