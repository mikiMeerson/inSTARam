import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import StarFeed from './Layouts/stars/feed/starFeed';
import StarsPage from './Layouts/stars/starsPage/starsPage';
import Navbar from './Layouts/navbar/navbar';
import {
  addStar,
  deleteStar,
  getStarById,
  getStars,
  updatePriorities,
  updateStar,
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
          throw new Error('Error! star not saved');
        }
        setStars(data.stars);
      })
      .catch((err: string) => console.log(err));
  };

  const handleDeleteStar = (_id: string): void => {
    deleteStar(_id);
  };

  const changePriority = (draggedStar: IStar, newPri: number) => {
    updatePriorities(draggedStar, newPri, stars)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error('Error! star not deleted');
        }
        setStars(data.stars);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateStar = (
    starId: string,
    formData: IStar,
  ) => {
    updateStar(starId, formData)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error('Error! star not updated');
        }
        setStars(data.stars);
      });
  };

  const handleShowStar = (starId: string): void => {
    getStarById(starId)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error('Error! Todo not deleted');
        }
        setFeedToDisplay(data.star);
      })
      .catch((err) => console.log(err));
  };

  return (
    <HashRouter>
      <div className="App" dir="rtl">
        <Navbar />
        <Routes>
          {['/', '/stars'].map(
            (path) => (
              <Route
                path={path}
                element={(
                  stars && (
                    <StarsPage
                      stars={stars}
                      addStar={handleAddStar}
                      removeStar={handleDeleteStar}
                      setFeed={handleShowStar}
                      changePriority={changePriority}
                    />
                  )
                )}
              />
            ),
          )}
          <Route
            path={feedToDisplay ? `/star/${feedToDisplay._id}` : '/'}
            element={
              feedToDisplay ? (
                <StarFeed
                  star={feedToDisplay}
                  updateStar={handleUpdateStar}
                />
              ) : (
                // todo should be star not found page
                <StarsPage
                  stars={stars}
                  addStar={handleAddStar}
                  removeStar={handleDeleteStar}
                  setFeed={handleShowStar}
                  changePriority={changePriority}
                />
              )
            }
          />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
