import { Route, Routes } from 'react-router';
import EventsPage from '../components/events/eventsPage';

const Events = () => (
  <Routes>
    <Route path="/events">
      <Route index element={<EventsPage />} />
    </Route>
  </Routes>
);

export default Events;
