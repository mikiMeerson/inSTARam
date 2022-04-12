import {
  Table,
  TableRow,
  TableCell,
  TextField,
} from '@mui/material';
import { IEvent } from '../../../types/interfaces';

interface Props {
    isEditable: boolean;
    computers: string[];
    event: IEvent;
    handleConfigSelection: (
      element: 'version' | 'weapon',
      configItem: string,
      selectedValue: string,
    ) => void;
}

const VersionsTable = ({
  isEditable,
  computers,
  event,
  handleConfigSelection,
}: Props) => (
  <Table>
    <TableRow sx={{ background: 'whitesmoke' }}>
      <TableCell align="center">מחשבים</TableCell>
      {computers.map((computer) => (
        <TableCell key={computer} align="center">{computer}</TableCell>
      ))}
    </TableRow>
    <TableRow>
      <TableCell sx={{ background: 'whitesmoke' }} align="center">
        גרסה
      </TableCell>
      {isEditable ? (
        computers.map((computer) => (
          <TableCell key={computer} align="center">
            <TextField
              variant="standard"
              sx={{ width: '50%' }}
              defaultValue="ללא"
              onChange={(e) => handleConfigSelection(
                'version',
                computer,
                e.target.value,
              )}
            />
          </TableCell>
        )))
        : (event && (
          computers.map((computer) => (
            <TableCell key={computer} align="center">
              <TextField
                disabled
                variant="standard"
                value={event.configuration.versions
                  .find(
                    (versionConfig) => versionConfig.computer === computer,
                  )?.version}
                sx={{ width: '50%' }}
              />
            </TableCell>
          ))))}
    </TableRow>
  </Table>
);

export default VersionsTable;
