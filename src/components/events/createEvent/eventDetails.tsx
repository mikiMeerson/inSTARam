import { useState } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Grid,
  TextField,
  OutlinedInput,
} from '@mui/material';
import { ChevronLeft, ExpandMore, MoreHoriz } from '@mui/icons-material';
import _ from 'lodash';
import DateRangePicker from './dateRangePicker';
import { BLOCKS, PLATFORMS } from '../../../assets';
import ListGenerator from '../../general/listGenerator';

const EVENTS = ['גיחת טייסת', 'גיחת מנט', 'בדיקת אינטגרציה', 'בדיקת פיתוח'];
const ASSIGNEES = [
  'טייסת 106',
  'טייסת 33',
  'טייסת 69',
  'יחידת אינטגרציה',
  'יחידת מאב',
];

const EventDetails = () => {
  const [isDatePick, setIsDatePick] = useState<boolean>(false);
  const [currDates, setCurrDates] = useState<Date[]>([]);
  const [displayMore, setDisplayMore] = useState<boolean>(false);

  const getDisplayDate = (date: Date) => `
  ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}
  `;

  return (
    <div className="eventDetails">
      <Typography variant="h5">פרטי האירוע</Typography>
      <Grid container>
        <Grid item xs={12}>
          <TextField variant="standard" fullWidth label="שם האירוע" />
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={3}>
          <FormControl sx={{ width: '100%' }}>
            <InputLabel>פלטפורמה</InputLabel>
            <Select input={<OutlinedInput />}>
              {_.map(PLATFORMS, (platform) => (
                <MenuItem key={platform} value={platform}>
                  {platform}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl sx={{ width: '100%' }}>
            <InputLabel>בלוק</InputLabel>
            <Select input={<OutlinedInput />}>
              {_.map(BLOCKS, (block) => (
                <MenuItem key={block} value={block}>
                  {block}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl sx={{ width: '100%' }}>
            <InputLabel>סוג האירוע</InputLabel>
            <Select input={<OutlinedInput />}>
              {EVENTS.map((event) => (
                <MenuItem key={event} value={event}>
                  {event}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <TextField fullWidth variant="outlined" label="מטס" />
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <FormControl variant="filled" sx={{ width: '100%' }}>
            <InputLabel>גוף מבצע</InputLabel>
            <Select input={<OutlinedInput />}>
              {ASSIGNEES.map((assignee) => (
                <MenuItem key={assignee} value={assignee}>
                  {assignee}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <TextField fullWidth label="צוות" />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="תאריכים"
            sx={{ width: '100%' }}
            onClick={() => setIsDatePick(!isDatePick)}
            value={
              currDates.length > 0
                ? `
                ${getDisplayDate(currDates[1])}-${getDisplayDate(currDates[0])
                }`
                : ''
              }
          />
        </Grid>
      </Grid>
      <div className="moreDetails">
        <Button color="info" onClick={() => setDisplayMore(!displayMore)}>
          { displayMore ? <ExpandMore /> : <ChevronLeft /> }
        </Button>
        {displayMore && (
          <Grid container spacing={4}>
            <Grid item xs={4}>
              <TextField fullWidth label="אוק" />
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth label="אזורים" />
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth label="משך" />
            </Grid>
          </Grid>
        )}
      </div>
      <ListGenerator header="כללי" />
      <ListGenerator header="מטרות" />
      <ListGenerator header="אמצעי איסוף נתונים" />
      <DateRangePicker
        isDatePick={isDatePick}
        setIsDatePick={setIsDatePick}
        currDates={currDates}
        setCurrDates={setCurrDates}
      />
    </div>
  );
};

export default EventDetails;
