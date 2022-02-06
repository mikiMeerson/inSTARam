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
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  Input,
  MenuItem,
  Divider,
  Typography,
} from '@mui/material';
import {
  assignees,
  severities,
  versions,
  computers,
} from '../../../assets/star';
import '../styles/stars.css';

interface starProps {
  isOpen: boolean;
  toggleModal: (param: boolean) => void;
  addStar: (star: any) => void;
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
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleAddStar = (data: any) => {
    toggleModal(false);
    addStar(data);
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
              <TextField
                autoFocus
                fullWidth
                label="שם הסטאר"
                variant="standard"
                {...register('name')}
                error={errors.name}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.name?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel>חומרה</InputLabel>
                <Select
                  variant="outlined"
                  input={<Input />}
                  {...register('severity')}
                  error={errors.severity}
                >
                  {severities.map((sever: string, index: number) => (
                    <MenuItem key={index} value={index + 1}>
                      {sever}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography variant="inherit" color="textSecondary">
                {errors.severity?.message}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ marginTop: '5px' }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="אירוע"
                variant="standard"
                {...register('event')}
                error={errors.event}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.event?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel>בלוק</InputLabel>
                <Select
                  variant="outlined"
                  input={<Input />}
                  {...register('version')}
                  error={errors.version}
                >
                  {versions.map((version: string) => (
                    <MenuItem key={version} value={version}>
                      {version}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography variant="inherit" color="textSecondary">
                {errors.version?.message}
              </Typography>
            </Grid>
          </Grid>
          <Grid container sx={{ marginTop: '15px' }}>
            <TextField
              fullWidth
              multiline
              label="תיאור"
              {...register('desc')}
              error={errors.desc}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.desc?.message}
            </Typography>
          </Grid>
          <Grid container spacing={2} sx={{ marginTop: '5px' }}>
            <Grid item xs={12} sm={6}>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel>אחראי</InputLabel>
                <Select
                  variant="outlined"
                  input={<Input />}
                  {...register('assignee')}
                  error={errors.assignee}
                >
                  {assignees.map((assignee: string) => (
                    <MenuItem key={assignee} value={assignee}>
                      {assignee}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography variant="inherit" color="textSecondary">
                {errors.assignee?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel>מחשב</InputLabel>
                <Select
                  variant="outlined"
                  input={<Input />}
                  {...register('computer')}
                  error={errors.computer}
                >
                  {computers.map((computer: string) => (
                    <MenuItem key={computer} value={computer}>
                      {computer}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
