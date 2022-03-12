import { Typography } from '@mui/material';
import EventDetails from './eventDetails';
import EventVersions from './eventVersions';
import AddFindings from './addFindings';

const CreateEvent = () => (
  <div className="createEvent">
    <Typography variant="h3" sx={{ margin: '20px' }}>הוספת אירוע</Typography>
    <EventDetails />
    <EventVersions />
    <AddFindings />
  </div>
);

export default CreateEvent;
