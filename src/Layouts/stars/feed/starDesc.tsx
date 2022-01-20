import { useState } from 'react';
import {
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  Chip,
  MenuItem,
  Input,
} from '@mui/material';
import { starType, resources, severityColors } from '../../../assets/star';

interface starProps {
  star: starType;
}

const StarDesc = ({ star }: starProps) => {
  const [resourceList, setResourceList] = useState(star.resources);

  return (
    <div className="starDesc">
      <div className="header">
        <h1>
          <span
            id="priority"
            style={{
              color: severityColors[star.severity - 1],
            }}
          >
            {star.priority > 0 ? star.priority : ''}{' '}
          </span>
          {star.name}
        </h1>
        <span>{star.version}</span>
      </div>
      <div className="starData">
        <div className="dataCol">
          <div className="dataRow">
            <Typography variant="caption" sx={{ padding: '7px 7px 7px 0' }}>
              הועלה ע"י {star.publisher} מתוך {star.event} {star.date}
            </Typography>
          </div>
          <div className="dataRow">
            <TextField
              sx={{ margin: '7px', flexGrow: 1 }}
              label="גורם מטפל"
              defaultValue={star.assignee}
              variant="outlined"
            />
            <TextField
              sx={{ margin: '7px', flexGrow: 1 }}
              label="סטטוס"
              defaultValue={star.status}
              variant="outlined"
            />
          </div>
          <div className="dataRow">
            <FormControl sx={{ width: '90%' }}>
              <InputLabel id="resources">משאבים נדרשים</InputLabel>
              <Select
                labelId="resources"
                multiple
                value={resourceList}
                onChange={(e: any) => setResourceList(e.target.value)}
                input={<Input />}
                renderValue={(selected: string[]) => (
                  <div>
                    {selected.map((value: string) => (
                      <Chip key={value} label={value} />
                    ))}
                  </div>
                )}
              >
                {resources.map((resource: string) => (
                  <MenuItem key={resource} value={resource}>
                    {resource}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="dataCol">
          <TextField
            sx={{ display: 'grid', height: '123px', marginTop: '42px' }}
            label="תיאור"
            defaultValue={star.desc}
            variant="outlined"
            multiline
          />
        </div>
      </div>
    </div>
  );
};

export default StarDesc;
