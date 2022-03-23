import { useState } from 'react';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { StatusCodes } from 'http-status-codes';
import { Typography, Button } from '@mui/material';
import EventDetails from './eventDetails';
import EventVersions from './eventVersions';
import ListGenerator from '../../general/listGenerator';
import { defaultEvent } from '../../../assets';
import { addEvent } from '../../../services/event-service';
import '../styles/createEvent.css';

const CreateEvent = () => {
  const [newEvent, setNewEvent] = useState<IEvent>(defaultEvent);
  const [currDates, setCurrDates] = useState<Date[]>([]);

  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('נא למלא את שם האירוע'),
    type: Yup.string().required('נא למלא סוג אירוע'),
    platform: Yup.string().required('נא למלא פלטפורמה'),
    block: Yup.string().required('נא למלא בלוק'),
    assignee: Yup.string().required('נא למלא גוף מבצע'),
    dates: Yup.string().required('נא למלא תאריכים'),
    configuration: Yup.string().required('נא למלא תצורה'),
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
    console.log(newEvent[attr]);
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

  return (
    <div className="eventsContainer">
      <div className="createEvent">
        <Typography
          variant="h3"
          sx={{ margin: '20px' }}
        >
          הוספת אירוע
        </Typography>
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
  );
};

export default CreateEvent;
