import { useState } from 'react';
import {
  FormControl,
  InputLabel,
  Input,
  MenuItem,
  Select,
  Typography,
  Grid,
  TextField,
} from '@mui/material';
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

  const getDisplayDate = (date: Date) => `
  ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}
  `;

  return (
    <div className="eventDetails">
      <Typography variant="h5">פרטי האירוע</Typography>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField variant="standard" fullWidth label="שם האירוע" />
        </Grid>
        <Grid item xs={3}>
          <FormControl sx={{ width: '100%' }}>
            <InputLabel>פלטפורמה</InputLabel>
            <Select
              variant="outlined"
              input={<Input />}
            >
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
            <Select
              variant="outlined"
              input={<Input />}
            >
              {_.map(BLOCKS, (block) => (
                <MenuItem key={block} value={block}>
                  {block}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <FormControl sx={{ width: '100%' }}>
            <InputLabel>גוף מבצע</InputLabel>
            <Select
              variant="outlined"
              input={<Input />}
            >
              {ASSIGNEES.map((assignee) => (
                <MenuItem key={assignee} value={assignee}>
                  {assignee}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl sx={{ width: '100%' }}>
            <InputLabel>סוג האירוע</InputLabel>
            <Select
              variant="outlined"
              input={<Input />}
            >
              {EVENTS.map((event) => (
                <MenuItem key={event} value={event}>
                  {event}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="תאריכים"
            variant="standard"
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
