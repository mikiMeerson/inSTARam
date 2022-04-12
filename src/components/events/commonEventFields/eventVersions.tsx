import { Typography } from '@mui/material';
import { IEvent } from '../../../types/interfaces';
import VersionsTable from './versionsTable';
import WeaponsTable from './weaponsTable';

interface Props {
    isEditable: boolean;
    stations: string[];
    computers: string[];
    event: IEvent;
    setAttr: (attr: keyof IEvent, value: IEvent[keyof IEvent]) => void;
}

const EventVersions = ({
  isEditable,
  stations,
  computers,
  event,
  setAttr,
}: Props) => {
  const handleConfigSelection = (
    element: 'weapon' | 'version',
    selectedItem: string,
    selectedValue: string,
  ) => {
    const { configuration } = event;
    if (element === 'weapon') {
      configuration.weapons
        .find((weaponConfig) => weaponConfig.station === selectedItem)!
        .weapon = selectedValue;
    } else {
      configuration.versions
        .find((versionConfig) => versionConfig.computer === selectedItem)!
        .version = selectedValue;
    }
    setAttr('configuration', configuration);
  };

  return (
    <div className="eventVersions">
      <Typography variant="h5">תצורה</Typography>
      <div className="versionTables">
        <div className="weapons">
          <Typography variant="h6">חימושים</Typography>
          <WeaponsTable
            {... { isEditable, stations, event, handleConfigSelection }}
          />
        </div>
        <div className="versions">
          <Typography variant="h6">גרסאות</Typography>
          <VersionsTable
            {... { isEditable, computers, event, handleConfigSelection }}
          />
        </div>
      </div>
    </div>
  );
};

export default EventVersions;
