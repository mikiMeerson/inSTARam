import { Route, Routes, Outlet } from 'react-router';
import { useState } from 'react';
import EventsMain from '../components/events/eventsMain';
import CreateEvent from '../components/events/createEvent/createEvent';
import Event from '../components/events/eventFeed/eventFeed';

interface eventProps {
  userRole: userRole;
}

const Events = ({ userRole }: eventProps) => {
  const [eventToDisplay, setEventToDisplay] = useState<string>();
  return (
    <Routes>
      <Route path="events/*">
        <Route
          index
          element={(
            <EventsMain
              userRole={userRole}
              setEventToDisplay={setEventToDisplay}
            />
          )}
        />
        <Route
          path="event"
          element={(
            <>
              <Event eventId={eventToDisplay} />
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
};

export default Events;
