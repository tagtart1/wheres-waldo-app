import { collection, orderBy, query, limit, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./firebaseConfig";
import { getLinkFriendlyString } from "./HelperFns";

import LeaderboardCard from "./LeaderboardCard";
import LeaderboardHeader from "./LeaderboardHeader";

import "../styles/Leaderboard.css";

interface leaderboardProps {
  name: string;
  time: string;
  date: string;
  timeInSeconds: number;
}

const Leaderboard = () => {
  const [currentLeaderboard, setCurrentLeaderboard] = useState<
    Array<leaderboardProps>
  >([]);

  const [selectedCardElement, setSelectedCardElement] = useState<any>(
    document.querySelector(".leaderboard-level")
  );

  const loadLeaderboard = async (levelName: string) => {
    const topLeaderboardQuery = query(
      collection(db, `leaderboard-${levelName}`),
      orderBy("timeInSeconds", "asc"),
      limit(50)
    );

    const leaderboardSnapshot = await getDocs(topLeaderboardQuery);
    const leaderboardArray: Array<any> = [];

    leaderboardSnapshot.forEach((item) => {
      leaderboardArray.push(item.data());
    });
    setCurrentLeaderboard(leaderboardArray);
  };

  const handleLeaderboardChange = (e: any, levelName: string) => {
    if (selectedCardElement === e.currentTarget) return;

    console.log(e.currentTarget);
    selectedCardElement.classList.remove("selected");
    e.currentTarget.classList.add("selected");
    setSelectedCardElement(e.currentTarget);

    loadLeaderboard(levelName);

    const leaderboardTitle = document.querySelector(".selected-name");
    if (leaderboardTitle) {
      leaderboardTitle.textContent = e.currentTarget.textContent + " Top 50";
    }
    //Set selected element and whatever selected elemeent make sure it shrinks down a bit to symbolize that
  };

  useEffect(() => {
    const initialLevelElement = document.querySelector(".leaderboard-level");
    if (!initialLevelElement) return;
    initialLevelElement.classList.add("selected");
    const leaderboardTitle = document.querySelector(".selected-name");
    setSelectedCardElement(initialLevelElement);
    if (!initialLevelElement.textContent) return;
    if (leaderboardTitle) {
      leaderboardTitle.textContent =
        initialLevelElement.textContent + " Top 50";
    }

    loadLeaderboard(getLinkFriendlyString(initialLevelElement.textContent));
  }, []);

  return (
    <div className="leaderboard-wrapper">
      <LeaderboardHeader />
      <div className="main">
        <div className="leaderboard-cards">
          <LeaderboardCard
            handleLeaderboardChange={handleLeaderboardChange}
            levelName={"The Loc Nar"}
          />
          <LeaderboardCard
            handleLeaderboardChange={handleLeaderboardChange}
            levelName={"Universe 113"}
          />
        </div>
        <h2 className="selected-name">Hi Top 50</h2>
        <table className="leaderboard">
          <thead>
            <tr>
              <th>POSITION</th>
              <th>NAME</th>
              <th>TIME</th>
              <th>DATE</th>
            </tr>
          </thead>
          <tbody>
            {currentLeaderboard.map((leaderboardItem: any, index: number) => {
              return (
                <tr className="leaderboard-row" key={index}>
                  <td>{index + 1}</td>
                  <td>{leaderboardItem.name}</td>
                  <td>{leaderboardItem.time}</td>
                  <td>{leaderboardItem.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
