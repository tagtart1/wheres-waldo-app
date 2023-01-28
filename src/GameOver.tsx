import "./styles/GameOver.css";

import { useEffect, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { db } from "./firebaseConfig";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { format } from "date-fns";
import { getSecondsFromTime } from "./HelperFns";

interface Props {
  isVisible: boolean;
  levelName?: string;
}

const GameOver = ({ isVisible, levelName }: Props) => {
  const [gameTime, setGameTime] = useState(" ");

  const inGameTime = document.querySelector(".timer")?.textContent;

  useEffect(() => {
    const time = document.querySelector(".timer")?.textContent;
    if (!time) return;
    setGameTime(time);
  }, [inGameTime]);

  const navigate = useNavigate();

  const handleLeaderboardSubmit = async (e: any) => {
    const input: any = document.querySelector("#leaderboard-input");

    if (!input) return;
    if (!e.target.checkValidity()) {
      e.preventDefault();
    } else {
      e.preventDefault();
      //Submit score to DB
      if (!levelName) return;
      const date = new Date();

      await addDoc(collection(db, `leaderboard-${levelName}`), {
        name: input.value,
        time: gameTime,
        date: format(
          new Date(date.getFullYear(), date.getMonth(), date.getDate()),
          "MMM do, yyyy"
        ),
        timeInSeconds: getSecondsFromTime(gameTime),
      });
      // Go to leaderboards
      navigate("/leaderboard");
    }
  };

  const handleValidity = (element: any) => {
    const errorBox = document.querySelector(".error");
    if (!errorBox) return;
    if (element.validity.valueMissing) {
      errorBox.textContent = `*Name cannot be empty!`;
    } else if (element.validity.tooShort) {
      errorBox.textContent = `*Name must have ${element.minLength} characters!`;
    } else if (element.validity.tooLong) {
      errorBox.classList.add("animate__pulse");
      errorBox.textContent = `*Name must have less than ${element.maxLength} characters!`;
    } else {
      errorBox.textContent = ``;
    }
  };

  if (!isVisible) return null;

  return (
    <div className="game-over-container">
      <div className="game-over-modal">
        <div className="congrats">Congrats!</div>
        <div>
          You finished in {document.querySelector(".timer")?.textContent}
        </div>
        <div>Submit your score!</div>
        <form
          noValidate
          className="input-group"
          onSubmit={handleLeaderboardSubmit}
        >
          <input
            type={"text"}
            minLength={3}
            id="leaderboard-input"
            maxLength={10}
            placeholder={"Name"}
            onInput={(e) => handleValidity(e.target)}
            required
            onFocus={(e) => handleValidity(e.target)}
          ></input>
          <span className="error animate__animated"></span>
          <button type="submit" className="submit-button">
            SUBMIT
          </button>
        </form>
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
