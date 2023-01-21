import { useState, Suspense } from "react";
import logo from "./logo.svg";
import "./styles/App.css";
import Game from "./Game";

import Home from "./Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [selectedLevelName, setSelectedLevelName] = useState<string>("");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home setSelectedLevelName={setSelectedLevelName} />}
        />

        <Route path="/play" element={<Game levelName={selectedLevelName} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
