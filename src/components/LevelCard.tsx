import "../styles/LevelCard.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getLinkFriendlyString } from "./HelperFns";

interface Props {
  levelName: string;
}

const LevelCard = ({ levelName }: Props) => {
  const [croppedImg, setCroppedImg] = useState<string>("");

  const levelNameFormatted = getLinkFriendlyString(levelName);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchImg = async (levelName: string) => {
      try {
        setIsLoading(true);
        const filePath = `${levelName}/${levelName}-cropped.jpg`;
        const imageRef = ref(getStorage(), filePath);
        const imageUrl = await getDownloadURL(imageRef);
        setIsLoading(false);
        setCroppedImg(imageUrl);
      } catch (error) {
        console.error("Error getting the level preview", error);
      }
    };

    fetchImg(levelNameFormatted);
  }, [levelNameFormatted]);

  return (
    <Link to={`/play/${levelNameFormatted}`}>
      <div className="level-display-card">
        <h1 className="level-name">{levelName}</h1>
        {isLoading ? (
          <div></div>
        ) : (
          <img
            className="display-img"
            alt="Level Preview"
            src={croppedImg}
          ></img>
        )}
      </div>
    </Link>
  );
};

export default LevelCard;
