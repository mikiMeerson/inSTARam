import { EditOutlined, SaveOutlined } from '@mui/icons-material';
import { Fab, Typography } from '@mui/material';
import { IEvent } from '../../../types/interfaces';
import { userRole } from '../../../types/string-types';
import SaveEditButton from '../../general/saveEditButton';

interface Props {
    userRole: userRole;
    event: IEvent;
    isEdit: boolean;
    setIsEdit: (param: boolean) => void;
    handleUpdateEvent: () => void;
}

const EventHeader = ({
  userRole,
  event,
  isEdit,
  setIsEdit,
  handleUpdateEvent,
}: Props) => {
  const getDisplayDate = (date: Date) => {
    date = new Date(date);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const handleSave = () => {
    setIsEdit(false);
    handleUpdateEvent();
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
      <SaveEditButton
        userRole={userRole}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        onSave={handleSave}
      />
    </div>
  );
};

export default EventHeader;
