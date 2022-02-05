import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Alert } from '@mui/material';
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
  const [alert, setAlert] = useState<IAlert>({
    isAlert: false,
    content: '',
    severity: 'info',
  });

  const handleAlert = (
    currStatus: number,
    successStatus: number,
    successContent: string,
    errorContent: string,
  ) => {
    setAlert({
      isAlert: true,
      content:
        currStatus === successStatus
          ? successContent
          : errorContent,
      severity: currStatus === successStatus ? 'success' : 'error',
    });
    setTimeout(() => {
      setAlert(Object.assign(alert, { isAlert: false }));
    }, 5000);
  };

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
    const currUser = localStorage.getItem('userDisplay');
    formData.publisher = currUser || 'אנונימי';
    addStar(formData)
      .then(({ status }) => {
        handleAlert(
          status,
          201,
          'הסטאר נוצר בהצלחה!',
          'שגיאה! לא הצלחנו ליצור את הסטאר',
        );
        fetchStars();
      })
      .catch((err: string) => handleAlert(500, 201, err, err));
  };

  const handleDeleteStar = (_id: string): void => {
    try {
      deleteSingleStar(_id).then(({ status }) => {
        handleAlert(
          status,
          200,
          'הסטאר נמחק בהצלחה!',
          'שגיאה! לא הצלחנו למחוק את הסטאר',
        );
      });
      getNotes(_id)
        .then((res) => {
          res.data.notes.forEach((n) => {
            deleteNotes(n._id, res.data.notes);
          });
        })
        .catch((err) => handleAlert(500, 201, err as string, err as string));
      getActivities(_id)
        .then((res) => {
          res.data.activities.forEach((a) => {
            deleteActivity(a._id);
          });
        })
        .catch((err: string) => handleAlert(500, 201, err, err));
      fetchStars();
    } catch (error) {
      handleAlert(500, 201, error as string, error as string);
    }
  };

  const changePriority = (draggedStar: IStar, newPri: number) => {
    updatePriorities(draggedStar, newPri, stars)
      .then(({ status }) => {
        handleAlert(
          status,
          200,
          'הסטאר עודכן בהצלחה!',
          'שגיאה! לא הצלחנו לעדכן את הסטאר',
        );
        fetchStars();
      })
      .catch((err) => handleAlert(
        500,
        200,
        err,
        err,
      ));
  };

  const handleUpdateStar = (starId: string, formData: IStar) => {
    updateStar(starId, formData).then(({ status, data }) => {
      handleAlert(
        status,
        200,
        'הסטאר עודכן בהצלחה!',
        'שגיאה! לא הצלחנו לעדכן את הסטאר',
      );
      setStars(data.stars);
    });
  };

  return (
    <>
      {alert.isAlert && (
        <Alert
          color={alert.severity}
          sx={{ position: 'absolute', bottom: '5%', zIndex: 1 }}
        >
          {alert.content}
        </Alert>
      )}
      <Routes>
        {['/', '/stars'].map((path) => (
          <Route
            key={path}
            path={path}
            element={
              stars && (
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
        ))}
        <Route
          path={feedToDisplay ? `/star/${feedToDisplay}` : '/'}
          element={
            feedToDisplay ? (
              <StarFeed starId={feedToDisplay} updateStar={handleUpdateStar} />
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
    </>
  );
};

export default Stars;
