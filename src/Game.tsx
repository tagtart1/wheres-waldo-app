import React from "react";
import { useEffect, useState } from "react";
import TEST_IMG from "./LocNar.jpg";
import "./styles/Game.css";
import GameHeader from "./GameHeader";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

interface GameProps {
  levelName: string;
}

const Game = ({ levelName }: GameProps) => {
  const [levelImg, setLevelImg] = useState<string>("");
  const [characterIcons, setCharacterIcons] = useState<Array<string>>([""]);

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
      const icons: Array<string> = [];
      const levelRef = collection(db, levelName);
      const q = query(levelRef);
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        icons.push(doc.data().iconUrl);
      });
      setCharacterIcons(icons);
    } catch (error) {
      console.error("Error occurred when fetching characters", error);
    }
  };

  useEffect(() => {
    getLevelImg();
    getLevelCharacters();
  }, []);

  const handleDropDown = (event: any) => {
    const dropdown = document.getElementById("dropdown");
    if (!dropdown) return;
    if (getComputedStyle(dropdown).display === "none") {
      dropdown.style.display = "block";
    } else {
      dropdown.style.display = "none";
      return;
    }
    let pos = event.target.getBoundingClientRect();

    let y = event.pageY;
    let x = event.pageX;
    let xPercent = (x / pos.width) * 100;
    let yPercent = (y / pos.height) * 100;

    // Make sures drop down doesnt go off screen
    if (xPercent > 90) {
      dropdown.style.removeProperty("left");
      dropdown.style.right = `${100 - xPercent}%`;
    } else {
      dropdown.style.removeProperty("right");
      dropdown.style.left = `${xPercent}%`;
    }

    dropdown.style.top = `${yPercent}%`;
  };

  return (
    <div>
      <GameHeader characterIcons={characterIcons} />
      <div className="relative">
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
