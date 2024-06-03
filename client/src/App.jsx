import "./App.css";
import LeaderBoard from "./LeaderBoard";
import Navbar from "./Navbar";
import PokeFight from "./PokeFight";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<PokeFight />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
      </Routes>
    </>
  );
}

export default App;
