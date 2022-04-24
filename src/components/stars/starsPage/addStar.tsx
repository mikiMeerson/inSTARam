import { useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { StatusCodes } from 'http-status-codes';
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
  SelectChangeEvent,
} from '@mui/material';
import '../styles/stars.css';
import InputField from '../../general/inputField';
import SelectField from '../../general/selectField';
import { IEvent } from '../../../types/interfaces';
import { getEvents, getEventById } from '../../../services/event-service';
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
  platformToShow: PlatformType;
  setPlatformToShow?: (platform: PlatformType) => void;
  defaultName?: string;
  defaultBlock?: string;
  defaultEventId?: string;
}

const AddStar = ({
  isOpen,
  toggleModal,
  addStar,
  platformToShow,
  setPlatformToShow,
  defaultName,
  defaultBlock,
  defaultEventId,
}: Props) => {
  const [computers, setComputers] = useState<
    RaamComputerType[] | BazComputerType[]
  >(RAAM_COMPUTERS);
  const [chosenBlock, setChosenBlock] = useState<BlockType>(defaultBlock || '');
  const [events, setEvents] = useState<IEvent[]>([]);
  const [eventsOptions, setEventsOptions] = useState<IEvent[]>([]);
  const [chosenEvent, setChosenEvent] = useState<string>();
  const [createAnother, setCreateAnother] = useState<boolean>(false);
  const [defaultValues, setDefaultValues] = useState({
    name: '',
    block: '',
    eventId: '',
  });

  const fetchEvents = useCallback(async (): Promise<void> => {
    const { data } = await getEvents(platformToShow);
    setEvents(data.events);
  }, [platformToShow]);

  useEffect(() => {
    const getEventsOptions = () => {
      chosenBlock
        ? setEventsOptions(events
          .filter((event) => event.block === chosenBlock))
        : setEventsOptions(events);
    };

    fetchEvents();
    getEventsOptions();

    setDefaultValues({
      name: defaultName || '',
      block: defaultBlock || '',
      eventId: defaultEventId || '',
    });
    if (!chosenEvent) setChosenEvent(defaultEventId);
  }, [chosenBlock, defaultEventId, defaultName, defaultBlock, chosenEvent, fetchEvents]);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('נא למלא את שם הסטאר')
      .max(40, 'שם הסטאר לא יעלה על 40 תווים'),
    severity: Yup.string().required('נא למלא חומרה'),
    assignee: Yup.string().required('נא למלא אחראי'),
    contact: Yup.string().required('נא למלא איש קשר'),
    phase: Yup.string().required('נא למלא שלב בבלוק'),
    block: Yup.string().required('נא למלא בלוק'),
    desc: Yup.string()
      .required('נא למלא תיאור')
      .max(100, 'תיאור הסטאר לא יכול לעלות על 100 תווים'),
  });

  const {
    register,
    handleSubmit,
    setValue,
    resetField,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
      desc: '',
      severity: '',
      block: '',
    },
  });

  const handleAddStar = (data: any) => {
    data.event = chosenEvent;
    data.platform = platformToShow;
    addStar(data);
    if (!createAnother) {
      toggleModal(false);
      //! not working
      reset({});
    } else {
      //! not working
      resetField('name');
      resetField('desc');
      resetField('severity');
    }
  };

  const handlePlatformChange = (e: SelectChangeEvent) => {
    if (setPlatformToShow) {
      setPlatformToShow(e.target.value as PlatformType);
      localStorage.setItem('platformToShow', e.target.value);
      if (e.target.value === 'רעם') {
        setComputers(RAAM_COMPUTERS);
      } else {
        setComputers(BAZ_COMPUTERS);
      }
    }
  };

  const handleEventChange = async (e: SelectChangeEvent) => {
    setChosenEvent(e.target.value);
    const { status, data } = await getEventById(e.target.value);
    if (status === StatusCodes.OK && data.event) {
      setChosenBlock(data.event.block);
      setValue('block', data.event.block);
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
            value={platformToShow}
            disabled={!setPlatformToShow}
            onChange={handlePlatformChange}
          >
            {PLATFORMS.map((platform) => (
              <MenuItem key={platform} value={platform}>
                {platform}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Divider />
      <DialogContent>
        <DialogContentText>
          <Grid container spacing={2} sx={{ marginTop: '5px' }}>
            <Grid item xs={12} sm={12}>
              <InputField
                fullWidth
                field="name"
                defaultValue={defaultValues.name}
                {... { register, errors }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ marginTop: '5px' }}>
            <Grid item xs={12} sm={4}>
              <SelectField
                field="severity"
                fieldValues={SEVERITIES}
                {... { register, errors }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <SelectField
                field="phase"
                fieldValues={PHASES}
                {... { register, errors }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel>בלוק</InputLabel>
                <Select
                  variant="standard"
                  value={chosenBlock}
                  input={<Input />}
                  {...register('block')}
                  onChange={(e) => setChosenBlock(e.target.value)}
                  error={!!errors.block}
                >
                  {BLOCKS.map((block) => (
                    <MenuItem key={block} value={block}>
                      {block}
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
                  value={chosenEvent}
                  input={<Input />}
                  onChange={handleEventChange}
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
              defaultValue=""
              field="desc"
              {... { register, errors }}
            />
          </Grid>
          <Grid container spacing={2} sx={{ marginTop: '5px' }}>
            <Grid item xs={12} sm={4}>
              <InputField
                field="contact"
                defaultValue={localStorage.getItem('userDisplay') || ''}
                {... { register, errors }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <SelectField
                field="assignee"
                fieldValues={ASSIGNEES}
                {... { register, errors }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <SelectField
                field="computer"
                fieldValues={computers}
                {... { register, errors }}
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

AddStar.whyDidYouRender = true;

export default AddStar;

AddStar.defaultProps = {
  setPlatformToShow: undefined,
  defaultName: '',
  defaultBlock: '',
  defaultEventId: '',
};
