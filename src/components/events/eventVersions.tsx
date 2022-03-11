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

const STATIONS = [2, 'L1', 'L2', 'L3', 5, 'R1', 'R2', 'R3', 8];
const WEAPONS = ['ללא', 'AA', 'BB', 'CC', 'DD', 'SS', 'PP'];
const COMPUTERS = ['AAAA', 'BBBB', 'CCCC', 'DDDD'];

const EventVersions = () => (
  <div className="eventVersions">
    <Typography variant="h5">תצורה</Typography>
    <div className="versionTables">
      <div className="weapons">
        <Typography variant="h6">חימושים</Typography>
        <Table>
          <TableRow sx={{ background: 'whitesmoke' }}>
            <TableCell align="center">תחנה</TableCell>
            {STATIONS.reverse().map((sta) => (
              <TableCell align="center">{sta}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell sx={{ background: 'whitesmoke' }} align="center">
              חימוש
            </TableCell>
            {
              STATIONS.reverse().map((sta) => (
                <TableCell>
                  <FormControl sx={{ width: '100%' }}>
                    <Select
                      variant="outlined"
                      input={<Input />}
                    >
                      {WEAPONS.map((wpn) => (
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
            {COMPUTERS.map((com) => (
              <TableCell align="center">{com}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell sx={{ background: 'whitesmoke' }} align="center">
              גרסה
            </TableCell>
            {COMPUTERS.map((com) => (
              <TableCell align="center">
                <TextField variant="standard" sx={{ width: '50%' }} />
              </TableCell>
            ))}
          </TableRow>
        </Table>
      </div>
    </div>
  </div>
);

export default EventVersions;
