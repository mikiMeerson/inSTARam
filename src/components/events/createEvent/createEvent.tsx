import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { StatusCodes } from 'http-status-codes';
import _ from 'lodash';
import {
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
} from '@mui/material';
import EventDetails from './eventDetails';
import EventVersions from './eventVersions';
import ListGenerator from '../../general/listGenerator';
import { addEvent } from '../../../services/event-service';
import '../styles/createEvent.css';
import {
  defaultBAZEvent,
  defaultRAAMEvent,
  IEvent,
} from '../../../types/interfaces';
import { BAZ_STATIONS, PLATFORMS, RAAM_STATIONS } from '../../../types/enums';

const CreateEvent = () => {
  const [newEvent, setNewEvent] = useState<IEvent>(defaultRAAMEvent);
  const [currDates, setCurrDates] = useState<Date[]>([]);
  const [stations, setStations] = useState<RAAM_STATIONS[] | BAZ_STATIONS[]>(
    Object.values(RAAM_STATIONS),
  );

  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('נא למלא את שם האירוע'),
    type: Yup.string().required('נא למלא סוג אירוע'),
    platform: Yup.string().required('נא למלא פלטפורמה'),
    block: Yup.string().required('נא למלא בלוק'),
    assignee: Yup.string().required('נא למלא גוף מבצע'),
    dates: Yup.string().required('נא למלא תאריכים'),
    AAA: Yup.string().required('נא למלא תצורה'),
    BBB: Yup.string().required('נא למלא תצורה'),
    CCC: Yup.string().required('נא למלא תצורה'),
    DDD: Yup.string().required('נא למלא תצורה'),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const setAttr = (attr: keyof IEvent, value: any) => {
    setNewEvent(Object.assign(newEvent, { [attr]: value }));
  };

  const handleAddEvent = async (data: any) => {
    setAttr('name', data.name);
    setAttr('type', data.type);
    setAttr('platform', data.platform);
    setAttr('block', data.block);
    setAttr('assignee', data.assignee);
    setAttr('dates', currDates);
    setAttr('publisher', localStorage.getItem('userDisplay') || 'אנונימי');
    const { status } = await addEvent(newEvent);
    if (status !== StatusCodes.CREATED) {
      console.log('Error! Could not create event');
    }
    navigate('/events');
  };

  const handlePlatformChange = (e: any) => {
    if (e.target.value === PLATFORMS.RAAM) {
      setStations(Object.values(RAAM_STATIONS));
      setNewEvent(defaultRAAMEvent);
      console.log(newEvent);
    } else {
      setStations(Object.values(BAZ_STATIONS));
      setNewEvent(defaultBAZEvent);
      console.log(newEvent);
    }
  };

  return (
    <div className="eventsContainer">
      <div style={{ background: 'whitesmoke' }}>
        <div className="createEvent">
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%' }}
          >
            <Typography
              variant="h3"
              sx={{ margin: '20px', flexGrow: 1 }}
            >
              הוספת אירוע
            </Typography>
            <FormControl sx={{ width: '10%', margin: '20px' }}>
              <InputLabel>פלטפורמה</InputLabel>
              <Select
                variant="outlined"
                input={<OutlinedInput />}
                defaultValue={defaultRAAMEvent.platform}
                {...register('platform')}
                onChange={handlePlatformChange}
                error={errors.platform?.message}
              >
                {_.map(PLATFORMS, (value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography variant="inherit" color="textSecondary">
              {errors.platform?.message}
            </Typography>
          </div>
          <EventDetails
            register={register}
            errors={errors}
            event={newEvent}
            setAttr={setAttr}
            currDates={currDates}
            setCurrDates={setCurrDates}
          />
          <EventVersions
            register={register}
            errors={errors}
            event={newEvent}
            setAttr={setAttr}
            stations={stations}
          />
          <ListGenerator
            header="מהלך הניסוי"
            attr="description"
            event={newEvent}
            setCurrList={setAttr}
          />
          <ListGenerator
            header="ממצאים"
            attr="findings"
            event={newEvent}
            setCurrList={setAttr}
          />
          <ListGenerator
            header="הערות"
            attr="notes"
            event={newEvent}
            setCurrList={setAttr}
          />
          <ListGenerator
            header="מסקנות, המלצות ומטלות"
            attr="conclusions"
            event={newEvent}
            setCurrList={setAttr}
          />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                fontSize: '150%',
                margin: '15px',
              }}
              onClick={handleSubmit(handleAddEvent)}
            >
              פרסם אירוע
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
