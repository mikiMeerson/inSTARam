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
    setAttr: (attr: keyof IEvent, value: any) => void;
}

const VersionsTable = ({
  isEditable,
  computers,
  event,
  setAttr,
}: Props) => {
  const handleVersionInput = (comp: string, version: string) => {
    const tempConfig = event.configuration;
    tempConfig.versions.find((v) => v.comp === comp)!.version = version;
    setAttr('configuration', tempConfig);
  };

  return (
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
          computers.map((com) => (
            <TableCell key={com} align="center">
              <TextField
                variant="standard"
                sx={{ width: '50%' }}
                defaultValue="ללא"
                onChange={(e) => handleVersionInput(
                  com,
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
                    .find((v) => v.comp === computer)?.version}
                  sx={{ width: '50%' }}
                />
              </TableCell>
            ))))}
      </TableRow>
    </Table>
  );
};

export default VersionsTable;
