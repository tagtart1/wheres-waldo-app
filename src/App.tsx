import React from "react";
import logo from "./logo.svg";
import "./styles/App.css";
import Game from "./Game";

import Home from "./Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
