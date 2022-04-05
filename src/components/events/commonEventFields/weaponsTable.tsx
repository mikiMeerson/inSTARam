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
      {stations.map((sta) => (
        <TableCell key={sta} align="center">{sta}</TableCell>
      ))}
    </TableRow>
    <TableRow>
      <TableCell sx={{ background: 'whitesmoke' }} align="center">
        חימוש
      </TableCell>
      {isEditable ? (
        stations.map((sta) => (
          <TableCell key={sta}>
            <FormControl sx={{ width: '100%' }}>
              <Select
                variant="outlined"
                input={<Input />}
                defaultValue="ללא"
                onChange={
                  (e) => handleConfigSelection(
                    'weapon',
                    sta,
                    e.target.value as WeaponType,
                  )
                }
              >
                {WEAPONS.map((wpn) => (
                  <MenuItem key={wpn} value={wpn}>
                    {wpn}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </TableCell>
        )))
        : (event && (
          stations.map((sta) => (
            <TableCell key={sta}>
              <TextField
                disabled
                value={event.configuration.weapons
                  .find((w) => w.sta === sta)?.weapon}
              />
            </TableCell>
          ))
        ))}
    </TableRow>
  </Table>
);

export default WeaponsTable;
