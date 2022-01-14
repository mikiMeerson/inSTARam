import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import StarFeed from "./Layouts/stars/feed/starFeed";
import StarsPage from "./Layouts/stars/starsPage/starsPage";
import Navbar from "./Layouts/navbar/navbar";
import { useState } from "react";
import { starExample } from "./assets/star";

function App() {
  const [starToDisplay, setStarToDisplay] = useState(starExample);
  return (
    <HashRouter>
      <div className="App" dir="rtl">
        <Navbar />
        <Routes>
          <Route path="/" element={<StarsPage setStar={setStarToDisplay}/>} />
          <Route path="/stars" element={<StarsPage setStar={setStarToDisplay} />} />
          <Route path="/starfeed" element={<StarFeed star={starToDisplay} />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
