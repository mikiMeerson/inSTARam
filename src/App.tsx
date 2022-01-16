import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import StarFeed from "./Layouts/stars/feed/starFeed";
import StarsPage from "./Layouts/stars/starsPage/starsPage";
import Navbar from "./Layouts/navbar/navbar";
import { useState } from "react";
import { starList, starType } from "./assets/star";

function App() {
  const [feedToDisplay, setFeedToDisplay] = useState(starList[0]);
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

  const changePriority = (star: starType, priority: number) => {
    star.priority = priority;
    let newStars = stars.map((s: starType) => {
      return s === star ? star : s;
    });
    if (priority > 1) {
      newStars.forEach((s) => {
        if (s.priority >= star.priority) s.priority += 1;
      });
    } else if (priority === 1) {
      newStars.forEach(s => {
        if (s !== star && s.priority !== 0) s.priority += 1;
      })
    }
    setStars(newStars);
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
                setFeed={setFeedToDisplay}
                changePriority={changePriority}
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
                setFeed={setFeedToDisplay}
                changePriority={changePriority}
              />
            }
          />
          <Route path="/starfeed" element={<StarFeed star={feedToDisplay} />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
