import { Typography } from '@mui/material';
import { IEvent } from '../../../types/interfaces';
import VersionsTable from './versionsTable';
import WeaponsTable from './weaponsTable';

interface VersionsProps {
    isEditable: boolean;
    stations: string[];
    computers: string[];
    event: IEvent;
    setAttr?: (attr: keyof IEvent, value: any) => void;
}

const EventVersions = ({
  isEditable,
  stations,
  computers,
  event,
  setAttr,
}: VersionsProps) => (
  <div className="eventVersions">
    <Typography variant="h5">תצורה</Typography>
    <div className="versionTables">
      <div className="weapons">
        <Typography variant="h6">חימושים</Typography>
        <WeaponsTable
          isEditable={isEditable}
          stations={stations}
          event={event}
          setAttr={setAttr}
        />
      </div>
      <div className="versions">
        <Typography variant="h6">גרסאות</Typography>
        <VersionsTable
          isEditable={isEditable}
          computers={computers}
          event={event}
          setAttr={setAttr}
        />
      </div>
    </div>
  </div>
);

export default EventVersions;

EventVersions.defaultProps = {
  setAttr: undefined,
};
