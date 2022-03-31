import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { StatusCodes } from 'http-status-codes';
import {
  FormControl,
  InputLabel,
  Select,
  Chip,
  MenuItem,
  Input,
  SelectChangeEvent,
  Grid,
} from '@mui/material';
import {
  ErrorOutline,
  WarningAmber,
  ArrowDownward,
  PriorityHigh,
} from '@mui/icons-material';
import DialogAlert from '../../general/dialogAlert';
import InputField from '../../general/inputField';
import SelectField from '../../general/selectField';
import { addActivity } from '../../../services/star-service';
import { IEvent, IStar } from '../../../types/interfaces';
import {
  ASSIGNEES,
  BAZ_COMPUTERS,
  BLOCKS,
  RAAM_COMPUTERS,
  RESOURCES,
  SEVERITIES,
  STATUSES,
  UserRole,
} from '../../../types/string-types';
import { ACTIVITY_INFO } from '../../../types/configurations';
import { getEventById } from '../../../services/event-service';
import StarDescLine from '../starDescLine';
import SaveEditButton from '../../general/saveEditButton';

interface Props {
  userRole: UserRole;
  inputStar: IStar;
  updateStar: (starId: string, formData: IStar) => void;
}

const StarDesc = ({ userRole, inputStar, updateStar }: Props) => {
  const [star, setStar] = useState<IStar>(inputStar);
  const [closeAlert, setCloseAlert] = useState<boolean>(false);
  const [resourceList, setResourceList] = useState<string[]>(star.resources);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [event, setEvent] = useState<IEvent>();

  useEffect(() => {
    const fetchEvent = async () => {
      if (star.event) {
        const { data } = await getEventById(star.event);
        setEvent(data.event);
      }
    };

    fetchEvent();
  }, [star]);

  const severityIcons = [
    {
      severity: 'חמור מאוד (1)',
      icon: <PriorityHigh fontSize="large" color="error" />,
    },
    {
      severity: 'חמור (2)',
      icon: <ErrorOutline fontSize="large" color="warning" />,
    },
    {
      severity: 'בינוני (3)',
      icon: <WarningAmber fontSize="large" htmlColor="yellow" />,
    },
    {
      severity: 'קל (99)',
      icon: <ArrowDownward fontSize="large" color="disabled" />,
    },
  ];

  const activityAttrs = [
    'status',
    'assignee',
    'resources',
    'computer',
  ];

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(0, 'נא למלא את שם הסטאר')
      .max(40, 'שם הסטאר לא יעלה על 40 תווים'),
    desc: Yup.string()
      .min(0, 'נא למלא תיאור')
      .max(100, 'תיאור הסטאר לא יכול לעלות על 100 תווים'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: star,
  });

  const handleSave = async (formData: IStar) => {
    // if the star is closing, remove its priority and alert the user
    if (formData.status === 'סגור'
      && star.status !== formData.status) {
      formData.priority = 0;
      setCloseAlert(true);
    }
    // for each attribute that has been edited and should generate an activity
    await activityAttrs.filter(
      (attr) => !(attr === 'resources'
        && formData[attr].every((item) => star[attr].includes(item))
        && star[attr].every((item) => formData[attr].includes(item))
      ) && formData[attr as keyof IStar] !== star[attr as keyof IStar],
    ).forEach(async (attr) => {
      // get the attribute's activity info and use it to generate a new one
      const info = ACTIVITY_INFO
        .find((i) => i.name === attr);
      if (info) {
        const { status, data } = await addActivity(star._id, {
          _id: '0',
          publisher: localStorage.getItem('userDisplay') || 'אנונימי',
          action: info.action,
          value: info.isValue
            ? formData[attr as keyof IStar] as string
            : undefined,
        });
        if (status !== StatusCodes.CREATED) {
          console.log('Could not add activity');
        }
        setStar(data.stars.find((s) => s._id === star._id)!);
      }
    });

    setIsEdit(false);
    updateStar(star._id, formData);
  };

  return (
    <div className="starDesc">
      <div className="starHeader">
        <h1>
          {severityIcons.find((i) => i.severity === star.severity)?.icon}
          <InputField
            field="name"
            disabled={!isEdit}
            defaultValue={star.name}
            register={register}
            errors={errors}
          />
        </h1>
        <SaveEditButton
          userRole={userRole}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          onSave={handleSubmit(handleSave)}
        />
      </div>
      <div className="starData">
        <Grid item xs={12} sx={{ marginLeft: '3%' }}>
          <Grid container>
            <StarDescLine star={star} event={event} />
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <SelectField
                field="assignee"
                defaultValue={star.assignee}
                disabled={!isEdit}
                register={register}
                fieldValues={ASSIGNEES}
                errors={errors}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectField
                field="status"
                defaultValue={star.status}
                disabled={!isEdit}
                register={register}
                fieldValues={STATUSES}
                errors={errors}
              />
            </Grid>
            <Grid item sm={3}>
              <SelectField
                field="severity"
                defaultValue={star.severity}
                disabled={!isEdit}
                fieldValues={SEVERITIES}
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectField
                field="block"
                defaultValue={star.block}
                disabled={!isEdit}
                register={register}
                fieldValues={BLOCKS}
                errors={errors}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ marginTop: '3%' }}>
            <Grid item xs={8}>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel id="resources">משאבים נדרשים</InputLabel>
                <Select
                  labelId="resources"
                  disabled={!isEdit}
                  multiple
                  value={resourceList}
                  {...register('resources')}
                  onChange={(
                    e: SelectChangeEvent<string[]>,
                  ) => {
                    let newResources: string[] = [];
                    if (typeof e.target.value.length === 'string') {
                      newResources.push(e.target.value as string);
                    } else newResources = e.target.value as string[];
                    setResourceList(newResources);
                  }}
                  input={<Input />}
                  renderValue={(selected: string[]) => (
                    <div>
                      {selected.map((value: string) => (
                        <Chip key={value} label={value} />
                      ))}
                    </div>
                  )}
                >
                  {RESOURCES.map((resource) => (
                    <MenuItem key={resource} value={resource}>
                      {resource}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <SelectField
                field="computer"
                defaultValue={star.computer}
                disabled={!isEdit}
                register={register}
                fieldValues={star.platform === 'רעם'
                  ? RAAM_COMPUTERS
                  : BAZ_COMPUTERS}
                errors={errors}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <InputField
            disabled={!isEdit}
            field="desc"
            defaultValue={star.desc}
            register={register}
            errors={errors}
            multiline
            variant="outlined"
            sx={{
              display: 'grid',
              height: '123px',
              maxHeight: '123px',
              marginTop: '42px',
            }}
          />
        </Grid>
      </div>
      <DialogAlert
        header="שים לב!"
        content="לאחר סגירת הסטאר הוא ייעלם מדף הניהול.
         ניתן למצוא אותו בדף ההיסטוריה"
        isOpen={closeAlert}
        setIsOpen={setCloseAlert}
      />
    </div>
  );
};

export default StarDesc;
