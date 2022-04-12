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
    const tempConfig = event.configuration;
    if (element === 'weapon') {
      tempConfig.weapons.find((w) => w.sta === selectedItem)!.weapon = selectedValue;
    } else {
      tempConfig.versions.find((v) => v.comp === selectedItem)!.version = selectedValue;
    }
    setAttr('configuration', tempConfig);
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
