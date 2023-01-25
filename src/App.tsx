import "./styles/App.css";
import Game from "./Game";

import Home from "./Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { db } from "./firebaseConfig";
import { collection } from "firebase/firestore";
import Credits from "./Credits";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/play/:id" element={<Game />} />
        <Route path="/credits" element={<Credits />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
