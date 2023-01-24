import "./styles/GameOver.css";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  isVisible: boolean;
}

const GameOver = ({ isVisible }: Props) => {
  if (!isVisible) return null;

  return (
    <div className="game-over-container">
      <div className="game-over-modal">
        <div className="congrats">Congrats!</div>
        <div>
          You finished in {document.querySelector(".timer")?.textContent}
        </div>
        <div className="button-group">
          <button onClick={() => window.location.reload()}>RESTART</button>
          <Link to={"/"}>
            <button>BACK</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameOver;
