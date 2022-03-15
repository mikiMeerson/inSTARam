import { Route, Routes, Outlet } from 'react-router';
import EventsPage from '../components/events/eventsPage';
import CreateEvent from '../components/events/createEvent/createEvent';

const Events = () => (
  <Routes>
    <Route path="events/*">
      <Route index element={<EventsPage />} />
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
