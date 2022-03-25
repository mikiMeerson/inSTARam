import _ from 'lodash';
import { UseFormRegister } from 'react-hook-form';
import {
  Typography,
  Table,
  TableRow,
  TableCell,
  MenuItem,
  FormControl,
  Select,
  Input,
  TextField,
} from '@mui/material';
import { IEvent } from '../../../types/interfaces';
import { COMPUTERS, STATIONS, WEAPONS } from '../../../types/enums';

interface VersionsProps {
  register: UseFormRegister<any>;
  errors: {[x: string]: any};
  event: IEvent;
  setAttr: (attr: keyof IEvent, value: any) => void;
}

const EventVersions = ({
  register,
  errors,
  event,
  setAttr,
}: VersionsProps) => {
  const handleWeaponSelect = (sta: STATIONS, wpn: WEAPONS) => {
    const tempConfig = event.configuration;
    tempConfig.weapons.find((w) => w.sta === sta)!.weapon = wpn;
    setAttr('configuration', tempConfig);
  };

  const handleVersionInput = (comp: COMPUTERS, version: string) => {
    const tempConfig = event.configuration;
    tempConfig.versions[comp] = version;
    setAttr('configuration', tempConfig);
  };

  return (
    <div className="eventVersions">
      <Typography variant="h5">תצורה</Typography>
      <div className="versionTables">
        <div className="weapons">
          <Typography variant="h6">חימושים</Typography>
          <Table>
            <TableRow sx={{ background: 'whitesmoke' }}>
              <TableCell align="center">תחנה</TableCell>
              {_.map((STATIONS), (sta) => (
                <TableCell align="center">{sta}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell sx={{ background: 'whitesmoke' }} align="center">
                חימוש
              </TableCell>
              {
              _.map((STATIONS), (sta) => (
                <TableCell>
                  <FormControl sx={{ width: '100%' }}>
                    <Select
                      variant="outlined"
                      input={<Input />}
                      defaultValue="ללא"
                      onChange={(e) => handleWeaponSelect(
                        sta,
                        e.target.value as WEAPONS,
                      )}
                    >
                      {_.map(WEAPONS, (wpn) => (
                        <MenuItem key={wpn} value={wpn}>
                          {wpn}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
              ))
            }
            </TableRow>
          </Table>
        </div>
        <div className="versions">
          <Typography variant="h6">גרסאות</Typography>
          <Table>
            <TableRow sx={{ background: 'whitesmoke' }}>
              <TableCell align="center">מחשבים</TableCell>
              {_.map(COMPUTERS, (com) => (
                <TableCell align="center">{com}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell sx={{ background: 'whitesmoke' }} align="center">
                גרסה
              </TableCell>
              {_.map(COMPUTERS, (com) => (
                <TableCell align="center">
                  <TextField
                    variant="standard"
                    sx={{ width: '50%' }}
                    {...register('configuration')}
                    onChange={(e) => handleVersionInput(
                      com,
                      e.target.value,
                    )}
                  />
                  <Typography variant="inherit" color="error">
                    {errors.configuration?.message}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default EventVersions;
