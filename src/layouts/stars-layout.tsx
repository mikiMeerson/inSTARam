import { Routes, Route, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { StatusCodes } from 'http-status-codes';
import { Alert, CircularProgress, Box } from '@mui/material';
import StarFeed from '../components/stars/feed/starFeed';
import StarsMain from '../components/stars/starsPage/starsMain';
import {
  addStar,
  deleteStar,
  editStar,
  getStars,
  updatePriorities,
} from '../services/star-service';
import StarsHistory from '../components/stars/starsHistory/starsHistory';
import { userRole } from '../types/string-types';
import { IAlert, IStar } from '../types/interfaces';
import { STATUSES } from '../types/enums';

interface starProps {
  userRole: userRole;
}

const Stars = ({ userRole }: starProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [stars, setStars] = useState<IStar[]>([]);
  const [alert, setAlert] = useState<IAlert>({
    isAlert: false,
    content: '',
    severity: 'info',
  });

  const handleAlert = (
    isSuccess: boolean,
    content: string,
  ) => {
    setAlert({
      isAlert: true,
      content,
      severity: isSuccess ? 'success' : 'error',
    });
    setTimeout(() => {
      setAlert(Object.assign(alert, { isAlert: false }));
    }, 3000);
  };

  const fetchStars = async (): Promise<void> => {
    setLoading(true);
    const { data } = await getStars();
    setStars(data.stars);
    setLoading(false);
  };

  useEffect(() => {
    fetchStars();
  }, []);

  const handleAddStar = async (formData: any): Promise<void> => {
    formData.publisher = localStorage.getItem('userDisplay') || 'אנונימי';
    const { status } = await addStar(formData);
    handleAlert(
      status === StatusCodes.CREATED,
      status === StatusCodes.CREATED
        ? 'הסטאר נוצר בהצלחה!' : 'שגיאה! לא הצלחנו ליצור את הסטאר',
    );
    fetchStars();
  };

  const handleDeleteStar = async (_id: string): Promise<void> => {
    try {
      const { status } = await deleteStar(_id);
      handleAlert(
        status === StatusCodes.OK,
        status === StatusCodes.OK
          ? 'הסטאר נמחק בהצלחה!' : 'שגיאה! לא הצלחנו למחוק את הסטאר',
      );
      fetchStars();
    } catch (error) {
      handleAlert(false, error as string);
    }
  };

  const changePriority = async (
    draggedStar: IStar,
    newPri: number,
  ): Promise<void> => {
    const { status } = await updatePriorities(draggedStar, newPri, stars);
    handleAlert(
      status === StatusCodes.OK,
      status === StatusCodes.OK
        ? 'הסטאר עודכן בהצלחה!' : 'שגיאה! לא הצלחנו לעדכן את הסטאר',
    );
    fetchStars();
  };

  const handleUpdateStar = async (
    starId: string,
    formData: IStar,
  ): Promise<void> => {
    const { status, data } = await editStar(starId, formData);
    handleAlert(
      status === StatusCodes.OK,
      status === StatusCodes.OK
        ? 'הסטאר עודכן בהצלחה!' : 'שגיאה! לא הצלחנו לעדכן את הסטאר',
    );
    setStars(data.stars);
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
      {loading && (
        <Box sx={{
          position: 'absolute', top: '50%', right: '50%', zIndex: 1,
        }}
        >
          <CircularProgress size="100px" />
        </Box>
      )}
      <Routes>
        <Route path="stars/*">
          <Route
            index
            element={stars && (
              <StarsMain
                userRole={userRole}
                stars={stars.filter((s) => s.status !== STATUSES.CLOSED)}
                addStar={handleAddStar}
                removeStar={handleDeleteStar}
                changePriority={changePriority}
              />
            )}
          />
          <Route
            path=":id"
            element={(
              <>
                <StarFeed
                  userRole={userRole}
                  updateStar={handleUpdateStar}
                />
                <Outlet />
              </>
            )}
          />
          <Route
            path="history"
            element={(
              <>
                <StarsHistory
                  stars={stars}
                  userRole={userRole}
                  updateStar={handleUpdateStar}
                />
                <Outlet />
              </>
            )}
          />
        </Route>
      </Routes>
      <Outlet />
    </>
  );
};

export default Stars;
