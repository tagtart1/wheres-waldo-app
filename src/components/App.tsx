import "../styles/App.css";
import Game from "./Game";

import Home from "./Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Credits from "./Credits";
import Leaderboard from "./Leaderboard";

function App() {
  return (
    <BrowserRouter basename="/wheres-waldo-app">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/play/:id" element={<Game />} />
        <Route path="/credits" element={<Credits />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
