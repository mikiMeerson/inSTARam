import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import StarFeed from './Layouts/stars/feed/starFeed';
import StarsPage from './Layouts/stars/starsPage/starsPage';
import Navbar from './Layouts/navbar/navbar';
import { noteType, starList, starType } from './assets/star';

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
        }),
    );
  };

  const addStar = (star: starType) => {
    const s = JSON.parse(JSON.stringify(star));
    s.id = Math.random();
    setStars([...stars, s]);
  };

  const changePriority = (star: starType, priority: number) => {
    star.priority = priority;
    const newStars = stars.map((s: starType) => (s === star ? star : s));

    if (priority === 1) {
      let index = 2;
      newStars
        .sort((a: starType, b: starType) => a.priority - b.priority)
        .forEach((s) => {
          if (s.priority > 0 && s !== star) {
            s.priority = index;
            index += 1;
          }
        });
    } else {
      let index = 1;
      newStars
        .sort((a: starType, b: starType) => a.priority - b.priority)
        .forEach((s) => {
          if (s.priority > 0) {
            s.priority = index;
            index += 1;
          }
        });
    }
    setStars(newStars);
  };

  const setNotes = (star: starType, notes: noteType[]) => {
    star.notes = notes;
    const newStars = stars.map((s: starType) => (s === star ? star : s));
    setStars(newStars);
  };

  return (
    <HashRouter>
      <div className="App" dir="rtl">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={(
              <StarsPage
                stars={stars}
                addStar={addStar}
                removeStar={removeStar}
                setFeed={setFeedToDisplay}
                changePriority={changePriority}
              />
            )}
          />
          <Route
            path="/stars"
            element={(
              <StarsPage
                stars={stars}
                addStar={addStar}
                removeStar={removeStar}
                setFeed={setFeedToDisplay}
                changePriority={changePriority}
              />
            )}
          />
          <Route
            path="/starfeed"
            element={<StarFeed star={feedToDisplay} setNotes={setNotes} />}
          />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
