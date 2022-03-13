import { Typography, Button } from '@mui/material';
import EventDetails from './eventDetails';
import EventVersions from './eventVersions';
import ListGenerator from '../../general/listGenerator';
import EventSummary from './eventSummary';

const CreateEvent = () => (
  <div className="createEvent">
    <Typography variant="h3" sx={{ margin: '20px' }}>הוספת אירוע</Typography>
    <EventDetails />
    <EventVersions />
    <ListGenerator header="מהלך הניסוי" />
    <ListGenerator header="ממצאים" />
    <EventSummary />
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Button
        variant="contained"
        size="large"
        sx={{
          fontSize: '150%',
          margin: '15px',
        }}
      >
        פרסם אירוע
      </Button>
    </div>
  </div>
);

export default CreateEvent;
