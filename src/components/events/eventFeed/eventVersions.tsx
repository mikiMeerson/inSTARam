import _ from 'lodash';
import {
  TextField,
  Typography,
  Table,
  TableRow,
  TableCell,
} from '@mui/material';
import { IEvent } from '../../../types/interfaces';
import { COMPUTERS, STATIONS } from '../../../types/enums';

interface EventProps {
    event: IEvent;
}

const EventVersions = ({ event }: EventProps) => (
  <div className="eventVersions">
    <Typography variant="h5">תצורה</Typography>
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
          {_.map((STATIONS), (sta) => (
            <TableCell>
              <TextField
                disabled
                value={event.configuration.weapons
                  .find((w) => w.sta === sta)?.weapon}
              />
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
          {_.map(COMPUTERS, (computer) => (
            <TableCell align="center">{computer}</TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCell sx={{ background: 'whitesmoke' }} align="center">
            גרסה
          </TableCell>
          {_.map(COMPUTERS, (computer) => (
            <TableCell align="center">
              <TextField
                disabled
                variant="standard"
                value={event.configuration.versions
                  .find((v) => v.comp === computer)?.version}
                sx={{ width: '50%' }}
              />
            </TableCell>
          ))}
        </TableRow>
      </Table>
    </div>
  </div>
);

export default EventVersions;
