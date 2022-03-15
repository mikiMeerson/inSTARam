import { useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Typography, Button } from '@mui/material';
import EventDetails from './eventDetails';
import EventVersions from './eventVersions';
import ListGenerator from '../../general/listGenerator';
import { defaultEvent } from '../../../assets';

const CreateEvent = () => {
  const [newEvent, setNewEvent] = useState<IEvent>(defaultEvent);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('נא למלא את שם האירוע'),
    type: Yup.string().required('נא למלא סוג אירוע'),
    platform: Yup.string().required('נא למלא פלטפורמה'),
    block: Yup.string().required('נא למלא בלוק'),
    assignee: Yup.string().required('נא למלא גוף מבצע'),
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
    setNewEvent(Object.assign(newEvent, { [attr]: value }));
  };

  const handleAddEvent = (data: any) => {
    setAttr('name', data.name);
    setAttr('type', data.type);
    setAttr('platform', data.platform);
    setAttr('block', data.block);
    setAttr('assignee', data.assignee);
    setAttr('dates', data.dates);
    console.log(newEvent);
    console.log(newEvent.dates);
  };

  return (
    <div className="createEvent">
      <Typography variant="h3" sx={{ margin: '20px' }}>הוספת אירוע</Typography>
      <EventDetails
        register={register}
        errors={errors}
        event={newEvent}
        setAttr={setAttr}
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
        currList={newEvent.description ? newEvent.description : []}
        setCurrList={setAttr}
      />
      <ListGenerator
        header="ממצאים"
        attr="findings"
        currList={newEvent.findings ? newEvent.findings : []}
        setCurrList={setAttr}
      />
      <ListGenerator
        header="הערות"
        attr="notes"
        currList={newEvent.notes ? newEvent.notes : []}
        setCurrList={setAttr}
      />
      <ListGenerator
        header="מסקנות, המלצות ומטלות"
        attr="conclusions"
        currList={newEvent.conclusions ? newEvent.conclusions : []}
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
  );
};

export default CreateEvent;
