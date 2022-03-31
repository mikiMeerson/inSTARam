import { useState } from 'react';
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
import EventDetails from '../commonEventFields/eventDetails';
import EventVersions from '../commonEventFields/eventVersions';
import { addEvent } from '../../../services/event-service';
import '../styles/createEvent.css';
import {
  defaultBAZEvent,
  defaultRAAMEvent,
  IEvent,
} from '../../../types/interfaces';
import { PLATFORMS } from '../../../types/enums';
import {
  BazStations,
  RaamStations,
  BAZ_STATIONS,
  RAAM_STATIONS,
  RaamComputers,
  BazComputers,
  RAAM_COMPUTERS,
  BAZ_COMPUTERS,
} from '../../../types/string-types';
import EventLists from '../commonEventFields/eventLists';
import BasicDetails from './basicDetails';

interface Props {
  handleAlert: (isSuccess: boolean, content: string) => void;
}

const CreateEvent = ({ handleAlert }: Props) => {
  const [newEvent, setNewEvent] = useState<IEvent>(defaultRAAMEvent);
  const [currDates, setCurrDates] = useState<string[]>([]);
  const [stations, setStations] = useState<RaamStations[] | BazStations[]>(
    RAAM_STATIONS,
  );
  const [computers, setComputers] = useState<RaamComputers[] | BazComputers[]>(
    RAAM_COMPUTERS,
  );

  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('נא למלא את שם האירוע'),
    type: Yup.string().required('נא למלא סוג אירוע'),
    platform: Yup.string().required('נא למלא פלטפורמה'),
    block: Yup.string().required('נא למלא בלוק'),
    dates: Yup.string().required('נא למלא תאריכים'),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const setAttr = (attr: keyof IEvent, value: any) => {
    setNewEvent({ ...newEvent, [attr]: value });
  };

  const handleAddEvent = async (data: any) => {
    setAttr('name', data.name);
    setAttr('type', data.type);
    setAttr('platform', data.platform);
    setAttr('block', data.block);
    setAttr('dates', [new Date(currDates[0]), new Date(currDates[1])]);
    setAttr('publisher', localStorage.getItem('userDisplay') || 'אנונימי');
    const { status } = await addEvent(newEvent);
    if (status !== StatusCodes.CREATED) {
      handleAlert(false, 'לא הצלחנו ליצור את האירוע');
    } else {
      handleAlert(true, 'האירוע נוצר בהצלחה');
    }
    navigate('/events');
  };

  const handlePlatformChange = (e: any) => {
    if (e.target.value === PLATFORMS.RAAM) {
      setStations(RAAM_STATIONS);
      setComputers(RAAM_COMPUTERS);
      setNewEvent(defaultRAAMEvent);
    } else {
      setStations(BAZ_STATIONS);
      setNewEvent(defaultBAZEvent);
      setComputers(BAZ_COMPUTERS);
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
                defaultValue={newEvent.platform}
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
          <BasicDetails
            register={register}
            errors={errors}
            currDates={currDates}
            setCurrDates={setCurrDates}
          />
          <EventDetails
            isValue={false}
            disabled={false}
            setAttr={setAttr}
            event={newEvent}
          />
          <EventVersions
            isEditable
            stations={stations}
            computers={computers}
            event={newEvent}
            setAttr={setAttr}
          />
          <EventLists event={newEvent} setAttr={setAttr} editable />
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
