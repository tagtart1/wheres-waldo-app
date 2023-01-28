import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import "./styles/Game.css";
import GameHeader from "./GameHeader";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { collection, getDocs, query, doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import distance from "./Distance";
import GameOver from "./GameOver";
import { useParams } from "react-router-dom";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Store } from "react-notifications-component";

const Game = () => {
  let levelName = useParams();

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

  const [isGameOver, setIsGameOver] = useState<boolean>(false);

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

    console.log(xPercent);
    console.log(yPercent);

    setShowDropdown(!showDropdown);
  };

  const handleTargetSuccess = (targetId: string) => {
    const targetsCopy = [...targets];

    let targetsFound = 0;
    targetsCopy.forEach((target) => {
      if (target.isFound) targetsFound += 1;
      if (target.id === targetId) {
        target.isFound = true;
        targetsFound += 1;
        Store.addNotification({
          title: "Wonderful!",
          message: `You found ${target.name}!`,
          type: "success",
          insert: "bottom",
          container: "bottom-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
      }
    });

    setTargets(targetsCopy);
    setShowDropdown(!showDropdown);

    // Check to see if all targets are found
    if (targetsFound === targetsCopy.length) {
      setIsGameOver(true);
    }
  };

  const handleTargetMiss = (targetId: string) => {
    const targetsCopy = [...targets];
    targetsCopy.forEach((target) => {
      if (target.id === targetId) {
        Store.addNotification({
          title: "Oops!",
          message: `That's not ${target.name}!`,
          type: "danger",
          insert: "bottom",
          container: "bottom-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
      }
    });
  };

  const validateTargetSelection = async (targetId: string) => {
    try {
      console.log(clickCoords);
      if (!levelName.id) return;
      const docRef = doc(db, levelName.id, targetId);
      const characterDoc = await getDoc(docRef);

      // Get distance between the click and the actual target's position
      const clickDistance = distance(
        clickCoords,
        characterDoc?.data()?.coordinates
      );
      console.log(clickDistance);
      // Verifies that the user click is within the vicinity of the target's position
      if (clickDistance < characterDoc?.data()?.coordinateBuffer) {
        handleTargetSuccess(targetId);
      } else handleTargetMiss(targetId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getLevelImg = async () => {
      try {
        if (!levelName.id) return;
        const filePath = `${levelName.id}/${levelName.id}.jpg`;
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
        if (!levelName.id) return;
        const levelRef = collection(db, levelName.id);
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
    <div className="game ">
      <ReactNotifications />
      <GameOver isVisible={isGameOver} levelName={levelName.id} />
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
  );
};

export default Game;
