import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import StarsTable from './starsTable';
import '../styles/stars.css';
import AddStar from './addStar';
import NoPriority from './noPriority';
import { IEvent, IStar } from '../../../types/interfaces';
import { UserRole } from '../../../types/string-types';
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
        <h1>ניהול סטארים</h1>
        <Link to="history">
          <Button>לטבלת הסטארים המלאה</Button>
        </Link>
      </div>
      <div className="stars">
        <StarsTable
          userRole={userRole}
          unprioritized={false}
          stars={stars.filter((star) => star.priority > 0)}
          removeStar={removeStar}
          changePriority={changePriority}
          dragged={dragged}
          setDragged={setDragged}
          events={events}
        />
        <NoPriority
          userRole={userRole}
          stars={stars.filter((star) => star.priority === 0)}
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
