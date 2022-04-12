import {
  Table,
  TableRow,
  TableCell,
  FormControl,
  Select,
  Input,
  TextField,
  MenuItem,
} from '@mui/material';
import { IEvent } from '../../../types/interfaces';
import { WEAPONS, WeaponType } from '../../../types/string-types';

interface Props {
    isEditable: boolean;
    stations: string[];
    event: IEvent;
    handleConfigSelection: (
      element: 'version' | 'weapon',
      configItem: string,
      selectedValue: string,
    ) => void;
}

const WeaponsTable = ({
  isEditable,
  stations,
  event,
  handleConfigSelection,
}: Props) => (
  <Table>
    <TableRow sx={{ background: 'whitesmoke' }}>
      <TableCell align="center">תחנה</TableCell>
      {stations.map((station) => (
        <TableCell key={station} align="center">{station}</TableCell>
      ))}
    </TableRow>
    <TableRow>
      <TableCell sx={{ background: 'whitesmoke' }} align="center">
        חימוש
      </TableCell>
      {isEditable ? (
        stations.map((station) => (
          <TableCell key={station}>
            <FormControl sx={{ width: '100%' }}>
              <Select
                variant="outlined"
                input={<Input />}
                defaultValue="ללא"
                onChange={
                  (e) => handleConfigSelection(
                    'weapon',
                    station,
                    e.target.value as WeaponType,
                  )
                }
              >
                {WEAPONS.map((weapon) => (
                  <MenuItem key={weapon} value={weapon}>
                    {weapon}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </TableCell>
        )))
        : (event && (
          stations.map((station) => (
            <TableCell key={station}>
              <TextField
                disabled
                value={event.configuration.weapons
                  .find(
                    (weaponConfig) => weaponConfig.station === station,
                  )?.weapon}
              />
            </TableCell>
          ))
        ))}
    </TableRow>
  </Table>
);

export default WeaponsTable;
