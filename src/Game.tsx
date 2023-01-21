import React, { Suspense } from "react";
import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import "./styles/Game.css";
import GameHeader from "./GameHeader";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, getDocs, query } from "firebase/firestore";
import { db } from "./firebaseConfig";

interface GameProps {
  levelName: string;
}

const Game = ({ levelName }: GameProps) => {
  const [levelImg, setLevelImg] = useState<string>("");

  const [targets, setTargets] = useState<
    Array<{ name: string; iconUrl: string }>
  >([
    { name: "", iconUrl: "" },
    { name: "", iconUrl: "" },
    { name: "", iconUrl: "" },
  ]);

  // ADD ID TO STRING
  const [clickCoords, setClickCoords] = useState({ x: 0, y: 0 });

  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const calculateClickCoordinate = (event: any) => {
    let pos = event.target.getBoundingClientRect();

    let y = event.pageY;
    let x = event.pageX;
    let xPercent = (x / pos.width) * 100;
    let yPercent = (y / pos.height) * 100;

    setClickCoords({
      x: xPercent,
      y: yPercent,
    });

    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const getLevelImg = async () => {
      try {
        const filePath = `${levelName}/LocNar.jpg`;
        const imageRef = ref(getStorage(), filePath);
        const imageURL = await getDownloadURL(imageRef);
        setLevelImg(imageURL);
      } catch (error) {
        console.error("There was an error getting the level image", error);
      }
    };

    const getLevelCharacters = async () => {
      try {
        const targetInit: any = [];

        const levelRef = collection(db, levelName);
        const q = query(levelRef);
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          //ADD DOC ID TO A PROPERTY FOR SUNDAY
          const target = { name: null, iconUrl: null };
          target.name = doc.data().name;
          target.iconUrl = doc.data().iconUrl;

          targetInit.push(target);
        });

        setTargets(targetInit);
      } catch (error) {
        console.error("Error occurred when fetching characters", error);
      }
    };

    getLevelImg();
    getLevelCharacters();
  }, [levelName]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <GameHeader targets={targets} />
        <div className="relative">
          <img
            className="game-image"
            src={levelImg}
            alt="Playable Level"
            onClick={calculateClickCoordinate}
          ></img>
          <Dropdown
            targets={targets}
            clickCoords={clickCoords}
            isVisible={showDropdown}
          />
        </div>
      </div>
    </Suspense>
  );
};

export default Game;
