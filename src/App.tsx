import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import StarFeed from "./Layouts/stars/feed/starFeed";
import StarsPage from "./Layouts/stars/starsPage/starsPage";
import Navbar from "./Layouts/navbar/navbar";
import { useState } from "react";
import { starList, starType } from "./assets/star";

function App() {
  const [starToDisplay, setStarToDisplay] = useState(starList[0]);
  const [stars, setStars] = useState(starList);

  const removeStar = (star: starType) => {
    setStars(
      stars
        .filter((s: starType) => s !== star)
        .map((s: starType) => {
          if (s.priority > star.priority && star.priority > 0) s.priority -= 1;
          return s;
        })
    );
  };

  const addStar = (star: starType) => {
    setStars([...stars, star]);
  };
  
  return (
    <HashRouter>
      <div className="App" dir="rtl">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <StarsPage
                stars={stars}
                addStar={addStar}
                removeStar={removeStar}
                setStar={setStarToDisplay}
              />
            }
          />
          <Route
            path="/stars"
            element={
              <StarsPage
                stars={stars}
                addStar={addStar}
                removeStar={removeStar}
                setStar={setStarToDisplay}
              />
            }
          />
          <Route path="/starfeed" element={<StarFeed star={starToDisplay} />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
