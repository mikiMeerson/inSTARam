import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Grid,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  Divider,
} from '@mui/material';
import {
  ASSIGNEES,
  SEVERITIES,
  BLOCKS,
  COMPUTERS,
  PLATFORMS,
} from '../../../assets';
import '../styles/stars.css';
import InputField from '../../general/inputField';
import SelectField from '../../general/selectField';

interface starProps {
  isOpen: boolean;
  toggleModal: (param: boolean) => void;
  addStar: (star: unknown) => void;
}

const AddStar = ({ isOpen, toggleModal, addStar }: starProps) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('נא למלא את שם הסטאר')
      .max(40, 'שם הסטאר לא יעלה על 40 תווים'),
    severity: Yup.string().required('נא למלא חומרה'),
    assignee: Yup.string().required('נא למלא אחראי'),
    block: Yup.string().required('נא למלא בלוק'),
    event: Yup.string().required('נא למלא שם אירוע/גיחה'),
    desc: Yup.string()
      .required('נא למלא תיאור')
      .max(100, 'תיאור הסטאר לא יכול לעלות על 100 תווים'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const fields = [
    {
      field: 'name',
      type: 'input',
    },
    {
      field: 'severity',
      type: 'select',
    },
    {
      field: 'event',
      type: 'input',
    },
    {
      field: 'block',
      type: 'select',
    },
    {
      field: 'desc',
      type: 'input',
    },
    {
      field: 'assignee',
      type: 'select',
    },
    {
      field: 'computer',
      type: 'select',
    },
  ];

  const handleAddStar = (data: any) => {
    toggleModal(false);
    data.severity = Object.values(SEVERITIES).indexOf(data.severity);
    addStar(data);
    fields.map((f) => resetField(f.field));
  };

  return (
    <Dialog
      className="addStar"
      sx={{ textAlign: 'right' }}
      open={isOpen}
      onClose={() => toggleModal(false)}
    >
      <DialogTitle>הוסף סטאר חדש</DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText>
          <Grid container spacing={2} sx={{ marginTop: '5px' }}>
            <Grid item xs={12} sm={8}>
              <InputField
                fullWidth
                field="name"
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <SelectField
                field="severity"
                fieldValues={SEVERITIES}
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ marginTop: '5px' }}>
            <Grid item xs={12} sm={4}>
              <InputField
                fullWidth
                field="event"
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <SelectField
                field="platform"
                fieldValues={PLATFORMS}
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <SelectField
                field="block"
                fieldValues={BLOCKS}
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>
          <Grid container sx={{ marginTop: '15px' }}>
            <InputField
              fullWidth
              field="desc"
              register={register}
              errors={errors}
            />
          </Grid>
          <Grid container spacing={2} sx={{ marginTop: '5px' }}>
            <Grid item xs={12} sm={6}>
              <SelectField
                field="assignee"
                fieldValues={ASSIGNEES}
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectField
                field="computer"
                fieldValues={COMPUTERS}
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => toggleModal(false)}
        >
          בטל
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSubmit(handleAddStar)}
        >
          הוסף
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddStar;
