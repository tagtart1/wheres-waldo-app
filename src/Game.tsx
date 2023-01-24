import React, { Suspense } from "react";
import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import "./styles/Game.css";
import GameHeader from "./GameHeader";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "./firebaseConfig";
import distance from "./Distance";

interface GameProps {
  levelName: string;
}

const Game = ({ levelName }: GameProps) => {
  const [levelImg, setLevelImg] = useState<string>("");

  const [targets, setTargets] = useState<
    Array<{ name: string; iconUrl: string; id: string; isFound: boolean }>
  >([
    { name: "", iconUrl: "", id: "", isFound: false },
    { name: "", iconUrl: "", id: "", isFound: false },
    { name: "", iconUrl: "", id: "", isFound: false },
  ]);

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

  const handleTargetSuccess = (targetId: string) => {
    const targetsCopy = [...targets];
    targetsCopy.forEach((target) => {
      if (target.id === targetId) {
        target.isFound = true;
      }
    });
    setTargets(targetsCopy);
    setShowDropdown(!showDropdown);
  };

  const validateTargetSelection = async (targetId: string) => {
    try {
      console.log(clickCoords);

      const docRef = doc(db, levelName, targetId);
      const characterDoc = await getDoc(docRef);

      // Get distance between the click and the actual target's position
      const clickDistance = distance(
        clickCoords,
        characterDoc?.data()?.coordinates
      );
      // Verifies that the user click is within the vicinity of the target's position
      if (clickDistance < characterDoc?.data()?.coordinateBuffer) {
        handleTargetSuccess(targetId);
      } else console.log(false);
    } catch (error) {
      console.log(error);
    }
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
          const target = { name: null, iconUrl: null, id: "", isFound: false };
          target.id = doc.id;
          target.name = doc.data().name;
          target.iconUrl = doc.data().iconUrl;
          target.isFound = false;
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
            validateTargetSelection={validateTargetSelection}
          />
        </div>
      </div>
    </Suspense>
  );
};

export default Game;
