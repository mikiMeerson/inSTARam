import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  Chip,
  SelectChangeEvent,
  Input,
  MenuItem,
} from '@mui/material';
import StarsTable from './starsTable';
import '../styles/stars.css';
import AddStar from './addStar';
import NoPriority from './noPriority';
import { IEvent, IStar } from '../../../types/interfaces';
import { PLATFORMS, PlatformType, UserRole } from '../../../types/string-types';
import { getEvents } from '../../../services/event-service';

interface Props {
  userRole: UserRole;
  stars: IStar[];
  addStar: (formData: any) => void;
  removeStar: (starId: string) => void;
  changePriority: (star: IStar, newPri: number) => void;
}
const StarsMain = ({
  userRole,
  stars,
  addStar,
  removeStar,
  changePriority,
}: Props) => {
  const [openAddStar, toggleOpenAddStar] = useState(false);
  const [dragged, setDragged] = useState<IStar | undefined>(undefined);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [platformsToShow, setPlatformsToShow] = useState<PlatformType[]>(
    PLATFORMS,
  );

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await getEvents();
      setEvents(data.events);
    };

    fetchEvents();
  }, []);

  return (
    <div className="Page">
      <div className="starsHeader">
        <div>
          <h1>ניהול סטארים</h1>
          <FormControl sx={{ width: '20%', marginTop: '25px' }}>
            <Select
              labelId="platforms"
              multiple
              value={platformsToShow}
              onChange={(
                e: SelectChangeEvent<string[]>,
              ) => {
                let selectedPlatforms: string[] = [];
                if (typeof e.target.value.length === 'string') {
                  selectedPlatforms.push(e.target.value as string);
                } else selectedPlatforms = e.target.value as string[];
                setPlatformsToShow(selectedPlatforms);
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
              {PLATFORMS.map((platform) => (
                <MenuItem key={platform} value={platform}>
                  {platform}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <Link to="history">
          <Button>לטבלת הסטארים המלאה</Button>
        </Link>
      </div>
      <div className="stars">
        <StarsTable
          userRole={userRole}
          unprioritized={false}
          stars={stars.filter((star) => star.priority > 0
            && platformsToShow.includes(star.platform))}
          removeStar={removeStar}
          changePriority={changePriority}
          dragged={dragged}
          setDragged={setDragged}
          events={events}
        />
        <NoPriority
          userRole={userRole}
          stars={stars.filter((star) => star.priority === 0
            && platformsToShow.includes(star.platform))}
          toggleAddStar={toggleOpenAddStar}
          removeStar={removeStar}
          changePriority={changePriority}
          dragged={dragged}
          setDragged={setDragged}
          events={events}
        />
      </div>
      <AddStar
        isOpen={openAddStar}
        toggleModal={toggleOpenAddStar}
        addStar={addStar}
      />
    </div>
  );
};

export default StarsMain;
