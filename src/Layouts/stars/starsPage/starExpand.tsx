import { TextField, Button, Fab } from '@mui/material';
import '../styles/expand.css';
import { NavLink } from 'react-router-dom';
import { DeleteOutline } from '@material-ui/icons';

interface starProps {
  star: IStar;
  setFeed: (id: string) => void;
  removeStar: (star: IStar) => void;
}

interface fieldType {
  row: number,
  label: string,
  defaultValue: string,
  isMultiline: boolean,
  width: string,
  variant: 'standard' | 'outlined' | 'filled';
}

const starExpand = ({ star, setFeed, removeStar }: starProps) => {
  const fields: fieldType[] = [
    {
      row: 1,
      label: 'הועלה על ידי',
      defaultValue: star.publisher,
      isMultiline: false,
      width: '45%',
      variant: 'standard',
    },
    {
      row: 1,
      label: 'אירוע',
      defaultValue: star.event,
      isMultiline: false,
      width: '45%',
      variant: 'standard',
    },
    {
      row: 2,
      label: 'תיאור',
      defaultValue: star.desc,
      isMultiline: true,
      width: '100%',
      variant: 'outlined',
    },
    {
      row: 3,
      label: 'מחשב',
      defaultValue: star.computer ? star.computer : '',
      isMultiline: false,
      width: '30%',
      variant: 'standard',
    },
  ];
  return (
    <div className="starExpand">
      {Array.from(new Set(fields.map((f) => f.row)))
        .map((row) => (
          <div key={row} className="dataRow" style={{ width: '100%' }}>
            {fields
              .filter((f) => f.row === row)
              .map((field) => (
                <TextField
                  key={field.label}
                  disabled
                  sx={{ width: field.width, margin: '7px' }}
                  label={field.label}
                  defaultValue={field.defaultValue}
                  multiline={field.isMultiline}
                  variant={field.variant}
                />
              ))}
          </div>
        ))}
      <div className="starActions">
        <NavLink to={`/star/${star._id}`} onClick={() => setFeed(star._id)}>
          <Button variant="contained" sx={{ background: 'goldenrod' }}>
            עבור לעמוד הסטאר
          </Button>
        </NavLink>
        <div className="actionButtons">
          <Fab size="small" id="delete" onClick={() => removeStar(star)}>
            <DeleteOutline />
          </Fab>
        </div>
      </div>
    </div>
  );
};

export default starExpand;
