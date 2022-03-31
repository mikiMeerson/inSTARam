import _ from 'lodash';
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
import { WEAPONS } from '../../../types/enums';
import { IEvent } from '../../../types/interfaces';

interface Props {
    isEditable: boolean;
    stations: string[];
    event: IEvent;
    setAttr: (attr: keyof IEvent, value: any) => void;
}

const WeaponsTable = ({
  isEditable,
  stations,
  event,
  setAttr,
}: Props) => {
  const handleWeaponSelect = (sta: string, wpn: WEAPONS) => {
    if (setAttr) {
      const tempConfig = event.configuration;
            tempConfig.weapons.find((w) => w.sta === sta)!.weapon = wpn;
            setAttr('configuration', tempConfig);
    }
  };
  return (
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
                      (e) => handleWeaponSelect(sta, e.target.value as WEAPONS)
                  }
                >
                  {_.map(WEAPONS, (wpn) => (
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
};

export default WeaponsTable;
