import { Routes, Route, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { StatusCodes } from 'http-status-codes';
import { Alert, CircularProgress, Box } from '@mui/material';
import StarFeed from '../components/stars/feed/starFeed';
import StarsMain from '../components/stars/starsPage/starsMain';
import {
  addStar,
  deleteStar,
  updateStar,
} from '../services/star-service';
import StarsHistory from '../components/stars/starsHistory/starsHistory';
import { UserRole } from '../types/string-types';
import { IAlert, IStar } from '../types/interfaces';

interface Props {
  userRole: UserRole;
}

const Stars = ({ userRole }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
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

  const handleUpdateStar = async (
    starId: string,
    formData: IStar,
  ): Promise<void> => {
    const { status } = await updateStar(starId, formData);
    handleAlert(
      status === StatusCodes.OK,
      status === StatusCodes.OK
        ? 'הסטאר עודכן בהצלחה!' : 'שגיאה! לא הצלחנו לעדכן את הסטאר',
    );
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
            element={(
              <StarsMain
                userRole={userRole}
                setLoading={setLoading}
                handleAlert={handleAlert}
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
