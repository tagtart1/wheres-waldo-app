import React from "react";
import { useEffect, useState } from "react";
import TEST_IMG from "./LocNar.jpg";
import "./styles/Game.css";
import GameHeader from "./GameHeader";

interface GameProps {
  levelName: string;
}

const Game = ({ levelName }: GameProps) => {
  const [levelImg, setLevelImg] = useState(TEST_IMG);

  const handleDropDown = (event: any) => {
    const dropdown = document.getElementById("dropdown");
    if (!dropdown) return;
    if (getComputedStyle(dropdown).display === "none") {
      dropdown.style.display = "block";
    } else {
      dropdown.style.display = "none";
      return;
    }

    let y = event.pageY;
    let x = event.pageX;
    dropdown.style.left = `${x}px`;
    dropdown.style.top = `${y}px`;
  };

  useEffect(() => {}, []);

  return (
    <div>
      <GameHeader />
      <div>
        <img
          className="game-image"
          src={levelImg}
          alt="Playable Level"
          onClick={handleDropDown}
        ></img>
        <div className="dropdown-select" id="dropdown"></div>
      </div>
    </div>
  );
};

export default Game;
