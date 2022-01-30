import { useState } from 'react';
import { Button } from '@mui/material';
import { ChevronRight, MenuOpenSharp } from '@material-ui/icons';
import StarsTable from './starsTable';
import '../styles/stars.css';
import AddStar from './addStar';
import NoPriority from './noPriority';

interface starProps {
  stars: IStar[];
  addStar: (e: React.FormEvent, formData: IStar) => void;
  removeStar: (starId: string) => void;
  setFeed: (star: IStar) => void;
  changePriority: (star: IStar, newPri: number) => void;
}
const StarsPage = ({
  stars,
  addStar,
  removeStar,
  setFeed,
  changePriority,
}: starProps) => {
  const [noPriority, toggleNoPriority] = useState(true);
  const [openAddStar, toggleOpenAddStar] = useState(false);
  const [dragged, setDragged] = useState<IStar | undefined>(undefined);

  let icon;
  if (noPriority) icon = <MenuOpenSharp fontSize="small" htmlColor="white" />;
  else icon = <ChevronRight fontSize="small" htmlColor="white" />;

  return (
    <div className="Page">
      <h1>סטארים</h1>
      <div className="stars">
        <StarsTable
          unpriotized={false}
          stars={stars.filter((star) => star.priority > 0)}
          setFeed={setFeed}
          removeStar={removeStar}
          changePriority={changePriority}
          dragged={dragged}
          setDragged={setDragged}
        />
        <NoPriority
          stars={stars.filter((star) => star.priority === 0)}
          noPriority={noPriority}
          toggleAddStar={toggleOpenAddStar}
          setFeed={setFeed}
          removeStar={removeStar}
          changePriority={changePriority}
          dragged={dragged}
          setDragged={setDragged}
        />
      </div>
      <Button
        classes={{ root: 'collapseButton' }}
        variant="contained"
        sx={{
          height: '60px',
          width: '40px',
          borderRadius: '50%',
          margin: '3%',
          position: 'absolute',
          background: 'black',
          bottom: 0,
          left: '5px',
        }}
        onClick={() => toggleNoPriority(!noPriority)}
      >
        {icon}
      </Button>
      <AddStar
        isOpen={openAddStar}
        toggleModal={toggleOpenAddStar}
        addStar={addStar}
      />
    </div>
  );
};

export default StarsPage;
