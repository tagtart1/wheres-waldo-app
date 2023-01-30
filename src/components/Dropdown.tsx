import "./styles/Dropdown.css";
import { useEffect } from "react";

interface Props {
  targets: Array<{
    name: string;
    iconUrl: string;
    id: string;
    isFound: boolean;
  }>;
  clickCoords: { x: number; y: number };
  isVisible: boolean;
  validateTargetSelection: Function;
}

const Dropdown = ({
  targets,
  clickCoords,
  isVisible,
  validateTargetSelection,
}: Props) => {
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

  if (!isVisible) return null;

  return (
    <div className="dropdown-container" id="dropdown">
      <ul className="dropdown-list">
        {targets.map((target) =>
          !target.isFound ? (
            <li
              key={target.id}
              onClick={() => {
                validateTargetSelection(target.id);
              }}
            >
              <img
                className="dropdown-target-icon"
                src={target.iconUrl}
                alt={"Target"}
              />
              {target.name}
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
};

export default Dropdown;
