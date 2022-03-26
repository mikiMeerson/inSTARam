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
import {
  COMPUTERS,
  WEAPONS,
} from '../../../types/enums';

interface VersionsProps {
  register: UseFormRegister<any>;
  errors: {[x: string]: any};
  event: IEvent;
  setAttr: (attr: keyof IEvent, value: any) => void;
  stations: string[];
}

const EventVersions = ({
  register,
  errors,
  event,
  setAttr,
  stations,
}: VersionsProps) => {
  const handleWeaponSelect = (sta: string, wpn: WEAPONS) => {
    const tempConfig = event.configuration;
    tempConfig.weapons.find((w) => w.sta === sta)!.weapon = wpn;
    setAttr('configuration', tempConfig);
  };

  const handleVersionInput = (comp: COMPUTERS, version: string) => {
    const tempConfig = event.configuration;
    tempConfig.versions.find((v) => v.comp === comp)!.version = version;
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
              {stations.map((sta) => (
                <TableCell key={sta} align="center">{sta}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell sx={{ background: 'whitesmoke' }} align="center">
                חימוש
              </TableCell>
              {stations.map((sta) => (
                <TableCell key={sta}>
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
              ))}
            </TableRow>
          </Table>
        </div>
        <div className="versions">
          <Typography variant="h6">גרסאות</Typography>
          <Table>
            <TableRow sx={{ background: 'whitesmoke' }}>
              <TableCell align="center">מחשבים</TableCell>
              {_.map(COMPUTERS, (com) => (
                <TableCell key={com} align="center">{com}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell sx={{ background: 'whitesmoke' }} align="center">
                גרסה
              </TableCell>
              {_.map(COMPUTERS, (com) => (
                <TableCell key={com} align="center">
                  <TextField
                    variant="standard"
                    sx={{ width: '50%' }}
                    {...register(com)}
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
