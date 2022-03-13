import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Typography, Button } from '@mui/material';
import EventDetails from './eventDetails';
import EventVersions from './eventVersions';
import ListGenerator from '../../general/listGenerator';

const CreateEvent = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('נא למלא את שם האירוע'),
    type: Yup.string().required('נא למלא סוג אירוע'),
    platform: Yup.string().required('נא למלא פלטפורמה'),
    block: Yup.string().required('נא למלא בלוק'),
    assignee: Yup.string().required('נא למלא גוף מבצע'),
    dates: Yup.string().required('נא למלא תאריכים'),
    generalSummary: Yup.string().required('נא למלא תיאור כללי'),
    configuration: Yup.string().required('נא למלא תצורה'),
    description: Yup.string().required('נא למלא את מהלך הניסוי'),
    findings: Yup.string().required('נא למלא ממצאים'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleAddEvent = (data: any) => {
    console.log('hello');
  };

  return (
    <div className="createEvent">
      <Typography variant="h3" sx={{ margin: '20px' }}>הוספת אירוע</Typography>
      <EventDetails register={register} errors={errors} />
      <EventVersions />
      <ListGenerator header="מהלך הניסוי" />
      <ListGenerator header="ממצאים" />
      <ListGenerator header="הערות" />
      <ListGenerator header="מסקנות, המלצות ומטלות" />
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
