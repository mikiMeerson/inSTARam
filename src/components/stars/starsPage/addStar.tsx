import { useEffect, useState } from 'react';
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Input,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import '../styles/stars.css';
import InputField from '../../general/inputField';
import SelectField from '../../general/selectField';
import { IEvent } from '../../../types/interfaces';
import { getEvents } from '../../../services/event-service';
import {
  BazComputerType,
  RaamComputerType,
  BAZ_COMPUTERS,
  RAAM_COMPUTERS,
  ASSIGNEES,
  PlatformType,
  BlockType,
  PLATFORMS,
  SEVERITIES,
  BLOCKS,
  PHASES,
} from '../../../types/string-types';

interface Props {
  isOpen: boolean;
  toggleModal: (param: boolean) => void;
  addStar: (star: unknown) => void;
  currPlatform: PlatformType;
  setCurrPlatform: (platform: PlatformType) => void;
}

const AddStar = ({
  isOpen,
  toggleModal,
  addStar,
  currPlatform,
  setCurrPlatform,
}: Props) => {
  const [computers, setComputers] = useState<
    RaamComputerType[] | BazComputerType[]
  >(RAAM_COMPUTERS);
  const [chosenBlock, setChosenBlock] = useState<BlockType>();
  const [events, setEvents] = useState<IEvent[]>([]);
  const [eventsOptions, setEventsOptions] = useState<IEvent[]>([]);
  const [chosenEvent, setChosenEvent] = useState<string>();
  const [createAnother, setCreateAnother] = useState<boolean>(false);

  useEffect(() => {
    const fetchEvents = async (): Promise<void> => {
      const { data } = await getEvents(currPlatform);
      setEvents(data.events);
    };
    const getEventsOptions = () => {
      chosenBlock
        ? setEventsOptions(events.filter((e) => e.platform === currPlatform
        && e.block === chosenBlock))
        : setEventsOptions(events.filter((e) => e.platform === currPlatform));
    };

    fetchEvents();
    getEventsOptions();
  }, [currPlatform, chosenBlock, events]);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('נא למלא את שם הסטאר')
      .max(40, 'שם הסטאר לא יעלה על 40 תווים'),
    severity: Yup.string().required('נא למלא חומרה'),
    assignee: Yup.string().required('נא למלא אחראי'),
    contact: Yup.string().required('נא למלא איש קשר'),
    phase: Yup.string().required('נא למלא שלב בבלוק'),
    block: Yup.string().required('נא למלא בלוק'),
    platform: Yup.string().required('נא למלא פלטפורמה'),
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
      isSaved: false,
    },
    {
      field: 'severity',
      type: 'select',
      isSaved: false,
    },
    {
      field: 'event',
      type: 'input',
      isSaved: true,
    },
    {
      field: 'block',
      type: 'select',
      isSaved: true,
    },
    {
      field: 'phase',
      type: 'select',
      isSaved: true,
    },
    {
      field: 'desc',
      type: 'input',
      isSaved: false,
    },
    {
      field: 'assignee',
      type: 'select',
      isSaved: true,
    },
    {
      field: 'contact',
      type: 'input',
      isSaved: true,
    },
    {
      field: 'computer',
      type: 'select',
      isSaved: true,
    },
  ];

  const handleAddStar = (data: any) => {
    data.event = chosenEvent;
    addStar(data);
    if (!createAnother) {
      toggleModal(false);
      fields.map((f) => resetField(f.field));
    } else {
      fields.filter((f) => !f.isSaved).map((f) => resetField(f.field));
    }
  };

  const handleBlockChange = (e: any) => {
    setChosenBlock(e.target.value);
  };

  const handlePlatformChange = (e: any) => {
    setCurrPlatform(e.target.value as PlatformType);
    localStorage.setItem('platformToShow', e.target.value);
    if (e.target.value === 'רעם') {
      setComputers(RAAM_COMPUTERS);
    } else {
      setComputers(BAZ_COMPUTERS);
    }
  };

  return (
    <Dialog
      className="addStar"
      sx={{ textAlign: 'right' }}
      open={isOpen}
      onClose={() => toggleModal(false)}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'row-reverse',
        width: '100%',
        justifyContent: 'space-between' }}
      >
        <DialogTitle sx={{ flexGrow: 1 }}>הוסף סטאר חדש</DialogTitle>
        <FormControl sx={{ width: '20%', margin: '10px' }}>
          <InputLabel>פלטפורמה</InputLabel>
          <Select
            variant="standard"
            input={<Input />}
            value={currPlatform}
            {...register('platform')}
            onChange={handlePlatformChange}
            error={errors.platform?.message}
          >
            {PLATFORMS.map((value) => (
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
      <Divider />
      <DialogContent>
        <DialogContentText>
          <Grid container spacing={2} sx={{ marginTop: '5px' }}>
            <Grid item xs={12} sm={12}>
              <InputField
                fullWidth
                field="name"
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ marginTop: '5px' }}>
            <Grid item xs={12} sm={4}>
              <SelectField
                field="severity"
                fieldValues={SEVERITIES}
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <SelectField
                field="phase"
                fieldValues={PHASES}
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel>בלוק</InputLabel>
                <Select
                  variant="standard"
                  input={<Input />}
                  {...register('block')}
                  onChange={handleBlockChange}
                  error={errors.block?.message}
                >
                  {BLOCKS.map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography variant="inherit" color="textSecondary">
                {errors.block?.message}
              </Typography>
            </Grid>
          </Grid>
          <Grid container sx={{ marginTop: '5px' }}>
            <Grid item xs={12} sm={12}>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel>שם האירוע</InputLabel>
                <Select
                  variant="outlined"
                  input={<Input />}
                  onChange={(e) => setChosenEvent(e.target.value as string)}
                >
                  {eventsOptions.map((event) => (
                    <MenuItem key={event._id} value={event._id}>
                      {event.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
            <Grid item xs={12} sm={4}>
              <InputField
                field="contact"
                defaultValue={localStorage.getItem('userDisplay') || ''}
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <SelectField
                field="assignee"
                fieldValues={ASSIGNEES}
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
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
      <DialogActions className="addStarActions">
        <FormControlLabel
          control={(
            <Checkbox
              checked={createAnother}
              onChange={(e) => setCreateAnother(e.target.checked)}
            />
        )}
          label="צור סטאר נוסף"
        />
        <div>
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
            sx={{ marginLeft: '10px' }}
          >
            הוסף
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default AddStar;
