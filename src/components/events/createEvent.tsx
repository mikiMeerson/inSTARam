import { Typography } from '@mui/material';
import EventVersions from './eventVersions';
import AddFindings from './addFindings';

const CreateEvent = () => (
  <div className="createEvent">
    <Typography variant="h3" sx={{ margin: '15px' }}>הוספת אירוע</Typography>
    <EventVersions />
    <AddFindings />
  </div>
);

export default CreateEvent;
