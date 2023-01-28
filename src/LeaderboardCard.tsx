import { useEffect, useState } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getLinkFriendlyString } from "./HelperFns";
import "./styles/LeaderboardCard.css";

interface LeaderboardProps {
  handleLeaderboardChange: Function;
  levelName: string;
}

const LeaderboardCard = ({
  handleLeaderboardChange,
  levelName,
}: LeaderboardProps) => {
  const [levelImg, setLevelImg] = useState<string>("");

  useEffect(() => {
    const fetchImg = async (levelName: string) => {
      try {
        const filePath = `${levelName}/${levelName}-cropped.jpg`;
        const imageRef = ref(getStorage(), filePath);
        const imageUrl = await getDownloadURL(imageRef);
        setLevelImg(imageUrl);
      } catch (error) {
        console.error("Error getting the level preview", error);
      }
    };

    fetchImg(getLinkFriendlyString(levelName));
  }, [levelName]);

  return (
    <button
      onClick={(e) =>
        handleLeaderboardChange(e, getLinkFriendlyString(levelName))
      }
      className="leaderboard-level"
    >
      <h1 className="level-name">{levelName}</h1>

      <img className="leaderboard-img" alt="Level Preview" src={levelImg}></img>
    </button>
  );
};

export default LeaderboardCard;
