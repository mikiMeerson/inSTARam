import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import StarFeed from './Layouts/stars/feed/starFeed';
import StarsPage from './Layouts/stars/starsPage/starsPage';
import Navbar from './Layouts/navbar/navbar';
import {
  addStar, deleteStar, getStars, updateStar, updateStars,
} from './API';

function App() {
  const [feedToDisplay, setFeedToDisplay] = useState<IStar>();
  const [stars, setStars] = useState<IStar[]>([]);

  const fetchStars = (): void => {
    getStars()
      .then((res) => {
        setStars(res.data.stars);
      })
      .catch((err: Error) => console.log(err));
  };

  useEffect(() => {
    fetchStars();
  }, []);

  const handleAddStar = (e: React.FormEvent, formData: IStar): void => {
    e.preventDefault();
    addStar(formData)
      .then(({ status, data }) => {
        if (status !== 201) {
          throw new Error('Error! Todo not saved');
        }
        setStars(data.stars);
      })
      .catch((err: string) => console.log(err));
  };

  const handleDeleteStar = (_id: string): void => {
    deleteStar(_id)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error('Error! Todo not deleted');
        }
        setStars(data.stars);
      })
      .catch((err) => console.log(err));
  };

  const changePriority = (draggedStar: IStar, newPri: number) => {
    console.log(newPri);
    updateStars(draggedStar, newPri, stars)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error('Error! star not deleted');
        }
        setStars(data.stars);
      })
      .catch((err) => console.log(err));
  };

  // const setNotes = (star: starType, notes: noteType[]) => {
  //   star.notes = notes;
  //   const newStars = stars.map((s: starType) => (s === star ? star : s));
  //   setStars(newStars);
  // };

  return (
    <HashRouter>
      <div className="App" dir="rtl">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={(
              stars && (
                <StarsPage
                  stars={stars}
                  addStar={handleAddStar}
                  removeStar={handleDeleteStar}
                  setFeed={setFeedToDisplay}
                  changePriority={changePriority}
                />
              )
            )}
          />
          <Route
            path="/stars"
            element={(
              stars && (
                <StarsPage
                  stars={stars}
                  addStar={handleAddStar}
                  removeStar={handleDeleteStar}
                  setFeed={setFeedToDisplay}
                  changePriority={changePriority}
                />
              )
            )}
          />
          {/* <Route
            path="/starfeed"
            element={feedToDisplay && (
            <StarFeed
              star={feedToDisplay}
              setNotes={setNotes}
            />
            )}
          /> */}
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
