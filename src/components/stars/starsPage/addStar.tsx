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
  assignees,
  severities,
  versions,
  computers,
} from '../../../assets/utils';
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
    version: Yup.string().required('נא למלא בלוק'),
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
      field: 'version',
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

  const handleAddStar = (data: unknown) => {
    toggleModal(false);
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
                field="name"
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <SelectField
                field="severity"
                fieldValues={severities}
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ marginTop: '5px' }}>
            <Grid item xs={12} sm={6}>
              <InputField
                field="event"
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectField
                field="version"
                fieldValues={versions}
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>
          <Grid container sx={{ marginTop: '15px' }}>
            <InputField
              field="desc"
              register={register}
              errors={errors}
            />
          </Grid>
          <Grid container spacing={2} sx={{ marginTop: '5px' }}>
            <Grid item xs={12} sm={6}>
              <SelectField
                field="assignee"
                fieldValues={assignees}
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectField
                field="computer"
                fieldValues={computers}
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
