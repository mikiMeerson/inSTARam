import { useEffect, useState } from 'react';
import { StatusCodes } from 'http-status-codes';
import { Link } from 'react-router-dom';
import {
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import StarsTable from './starsTable';
import '../styles/stars.css';
import AddStar from './addStar';
import NoPriority from './noPriority';
import { IEvent, IStar } from '../../../types/interfaces';
import { PLATFORMS, PlatformType, UserRole } from '../../../types/string-types';
import { getEvents } from '../../../services/event-service';
import {
  addStar,
  deleteStar,
  getStars,
  updatePriorities,
} from '../../../services/star-service';

interface Props {
  userRole: UserRole;
  setLoading: (param: boolean) => void;
  handleAlert: (isSuccess: boolean, content: string) => void;
  platformToShow: PlatformType;
  setPlatformToShow: (platform: PlatformType) => void;
}
const StarsMain = ({
  userRole,
  setLoading,
  handleAlert,
  platformToShow,
  setPlatformToShow,
}: Props) => {
  const [stars, setStars] = useState<IStar[]>([]);
  const [openAddStar, toggleOpenAddStar] = useState(false);
  const [dragged, setDragged] = useState<IStar | undefined>(undefined);
  const [events, setEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    const fetchStars = async (): Promise<void> => {
      setLoading(true);
      const { data } = await getStars(platformToShow);
      setStars(data.stars);
      setLoading(false);
    };

    const fetchEvents = async () => {
      const { data } = await getEvents();
      setEvents(data.events);
    };

    fetchStars();
    fetchEvents();
  }, [platformToShow, setLoading]);

  const handleAddStar = async (formData: any): Promise<void> => {
    formData.publisher = localStorage.getItem('userDisplay') || 'אנונימי';
    const { status, data } = await addStar(formData);
    handleAlert(
      status === StatusCodes.CREATED,
      status === StatusCodes.CREATED
        ? 'הסטאר נוצר בהצלחה!' : 'שגיאה! לא הצלחנו ליצור את הסטאר',
    );
    setStars(data.stars);
  };

  const handleDeleteStar = async (_id: string): Promise<void> => {
    try {
      const { status, data } = await deleteStar(_id);
      handleAlert(
        status === StatusCodes.OK,
        status === StatusCodes.OK
          ? 'הסטאר נמחק בהצלחה!' : 'שגיאה! לא הצלחנו למחוק את הסטאר',
      );
      setStars(data.stars);
    } catch (error) {
      handleAlert(false, error as string);
    }
  };

  const changePriority = async (
    draggedStar: IStar,
    newPri: number,
  ): Promise<void> => {
    const { status, data } = await updatePriorities(draggedStar, newPri, stars);
    handleAlert(
      status === StatusCodes.OK,
      status === StatusCodes.OK
        ? 'הסטאר עודכן בהצלחה!' : 'שגיאה! לא הצלחנו לעדכן את הסטאר',
    );
    setStars(data.stars);
  };

  return (
    <div className="Page">
      <div className="starsHeader">
        <div>
          <h1>ניהול סטארים</h1>
          <FormControl sx={{ width: '150px', marginTop: '15px' }}>
            <InputLabel>פלטפורמה</InputLabel>
            <Select
              value={platformToShow}
              variant="outlined"
              input={<OutlinedInput />}
              onChange={(e) => setPlatformToShow(e.target.value)}
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
            && platformToShow === star.platform)}
          removeStar={handleDeleteStar}
          changePriority={changePriority}
          dragged={dragged}
          setDragged={setDragged}
          events={events}
        />
        <NoPriority
          userRole={userRole}
          stars={stars.filter((star) => star.priority === 0
            && platformToShow === star.platform)}
          toggleAddStar={toggleOpenAddStar}
          removeStar={handleDeleteStar}
          changePriority={changePriority}
          dragged={dragged}
          setDragged={setDragged}
          events={events}
        />
      </div>
      <AddStar
        isOpen={openAddStar}
        toggleModal={toggleOpenAddStar}
        addStar={handleAddStar}
        currPlatform={platformToShow}
        setCurrPlatform={setPlatformToShow}
      />
    </div>
  );
};

export default StarsMain;
