import { EditOutlined, SaveOutlined } from '@mui/icons-material';
import { Fab, TextField, Typography } from '@mui/material';
import { IEvent } from '../../../types/interfaces';
import { userRole } from '../../../types/string-types';

interface EventProps {
    userRole: userRole;
    event: IEvent;
    isEdit: boolean;
    setIsEdit: (param: boolean) => void;
}

const EventHeader = ({ userRole, event, isEdit, setIsEdit }: EventProps) => {
  const getDisplayDate = (date: Date) => {
    date = new Date(date);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <div className="eventsHeader">
      <div>
        <Typography variant="h2">
          {event.name}
        </Typography>
        <Typography variant="subtitle1" sx={{ fontSize: '150%' }}>
          {event.platform}
          {' '}
          בלוק
          {' '}
          {event.block}
          {' - '}
          {event.type}
          {event.reason && (
          <span>
            {', '}
            {event.dates[1] === event.dates[0]
              ? getDisplayDate(event.dates[1])
              : `${
                getDisplayDate(event.dates[1])
              } - ${
                getDisplayDate(event.dates[0])
              }`}
          </span>
          )}
        </Typography>
      </div>
      {(userRole !== 'viewer')
            && (
              isEdit ? (
                <Fab
                  size="small"
                  color="primary"
                  sx={{
                    background: 'blue',
                    color: 'white',
                    width: '50px',
                    height: '50px',
                  }}
                  onClick={() => setIsEdit(false)}
                >
                  <SaveOutlined />
                </Fab>
              ) : (
                <Fab
                  size="small"
                  color="primary"
                  sx={{
                    background: 'goldenrod',
                    color: 'white',
                    width: '50px',
                    height: '50px',
                  }}
                  onClick={() => setIsEdit(true)}
                >
                  <EditOutlined />
                </Fab>
              )
            )}
    </div>
  );
};

export default EventHeader;
