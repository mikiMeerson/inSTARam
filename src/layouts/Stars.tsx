import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import StarFeed from '../components/stars/feed/starFeed';
import StarsPage from '../components/stars/starsPage/starsPage';
import {
  addStar,
  deleteSingleStar,
  getStars,
  updatePriorities,
  updateStar,
} from '../services/star-service';
import { deleteNotes, getNotes } from '../services/note-service';
import { deleteActivity, getActivities } from '../services/activity-service';

const Stars = () => {
  const [feedToDisplay, setFeedToDisplay] = useState<string>();
  const [stars, setStars] = useState<IStar[]>([]);

  const fetchStars = (): void => {
    getStars()
      .then((res) => {
        console.log(res.data.stars[0]._id);
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
      .then(({ status }) => {
        if (status !== 201) {
          throw new Error('Error! star not saved');
        }
        fetchStars();
      })
      .catch((err: string) => console.log(err));
  };

  const handleDeleteStar = (_id: string): void => {
    try {
      deleteSingleStar(_id);
      getNotes(_id)
        .then((res) => {
          res.data.notes.forEach((n) => {
            deleteNotes(n._id, res.data.notes);
          });
        }).catch((err: Error) => console.log(err));
      getActivities(_id)
        .then((res) => {
          res.data.activities.forEach((a) => {
            deleteActivity(a._id);
          });
        }).catch((err: Error) => console.log(err));
    } catch (error) {
      throw new Error(error as string);
    }
  };

  const changePriority = (draggedStar: IStar, newPri: number) => {
    updatePriorities(draggedStar, newPri, stars)
      .then(({ status }) => {
        if (status !== 200) {
          throw new Error('Error! star not deleted');
        }
        fetchStars();
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

  return (

    <Routes>
      {['/', '/stars'].map(
        (path) => (
          <Route
            key={path}
            path={path}
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
        ),
      )}
      <Route
        path={feedToDisplay ? `/star/${feedToDisplay}` : '/'}
        element={
          feedToDisplay ? (
            <StarFeed
              starId={feedToDisplay}
              updateStar={handleUpdateStar}
            />
          ) : (
            // todo should be star not found page
            <StarsPage
              stars={stars}
              addStar={handleAddStar}
              removeStar={handleDeleteStar}
              setFeed={setFeedToDisplay}
              changePriority={changePriority}
            />
          )
        }
      />
    </Routes>
  );
};

export default Stars;
