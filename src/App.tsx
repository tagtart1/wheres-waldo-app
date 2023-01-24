import "./styles/App.css";
import Game from "./Game";

import Home from "./Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { db } from "./firebaseConfig";
import { collection } from "firebase/firestore";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/play/:id" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
