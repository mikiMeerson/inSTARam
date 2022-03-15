import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import StarsTable from './starsTable';
import '../styles/stars.css';
import AddStar from './addStar';
import NoPriority from './noPriority';

interface starProps {
  userRole: userRole;
  stars: IStar[];
  addStar: (formData: any) => void;
  removeStar: (starId: string) => void;
  setFeed: (id: string) => void;
  changePriority: (star: IStar, newPri: number) => void;
}
const StarsPage = ({
  userRole,
  stars,
  addStar,
  removeStar,
  setFeed,
  changePriority,
}: starProps) => {
  const [openAddStar, toggleOpenAddStar] = useState(false);
  const [dragged, setDragged] = useState<IStar | undefined>(undefined);

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
          setFeed={setFeed}
          removeStar={removeStar}
          changePriority={changePriority}
          dragged={dragged}
          setDragged={setDragged}
        />
        <NoPriority
          userRole={userRole}
          stars={stars.filter((star) => star.priority === 0)}
          toggleAddStar={toggleOpenAddStar}
          setFeed={setFeed}
          removeStar={removeStar}
          changePriority={changePriority}
          dragged={dragged}
          setDragged={setDragged}
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

export default StarsPage;
