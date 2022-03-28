import { Route, Routes, Outlet } from 'react-router';
import EventsMain from '../components/events/eventsMain';
import CreateEvent from '../components/events/createEvent/createEvent';
import Event from '../components/events/eventFeed/eventFeed';
import { userRole } from '../types/string-types';

interface eventProps {
  userRole: userRole;
}

const Events = ({ userRole }: eventProps) => (
  <Routes>
    <Route path="events/*">
      <Route
        index
        element={(
          <EventsMain userRole={userRole} />
          )}
      />
      <Route
        path=":id"
        element={(
          <>
            <Event userRole={userRole} />
            <Outlet />
          </>
        )}
      />
      <Route
        path="create"
        element={(
          <>
            <CreateEvent />
            <Outlet />
          </>
      )}
      />
    </Route>
  </Routes>
);

export default Events;
