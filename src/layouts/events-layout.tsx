import { useState } from 'react';
import { Route, Routes, Outlet } from 'react-router';
import { Alert } from '@mui/material';
import EventsMain from '../components/events/eventsPage/eventsMain';
import CreateEvent from '../components/events/createEvent/createEvent';
import Event from '../components/events/eventFeed/eventFeed';
import { PlatformType, UserRole } from '../types/string-types';
import { IAlert } from '../types/interfaces';

interface Props {
  userRole: UserRole;
  platformToShow: PlatformType;
}

const Events = ({ userRole, platformToShow }: Props) => {
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
        <Route path="events/*">
          <Route
            index
            element={(
              <EventsMain
                userRole={userRole}
                handleAlert={handleAlert}
                platformToShow={platformToShow}
              />
            )}
          />
          <Route
            path=":id"
            element={(
              <>
                <Event userRole={userRole} handleAlert={handleAlert} />
                <Outlet />
              </>
            )}
          />
          <Route
            path="create"
            element={(
              <>
                <CreateEvent handleAlert={handleAlert} />
                <Outlet />
              </>
          )}
          />
        </Route>
      </Routes>
    </>
  );
};

export default Events;
