import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { Collapse, SpeedDial, SpeedDialIcon } from '@mui/material';
import { StarBorder } from '@material-ui/icons';
import StarsTable from './starsTable';
import { authorizeUser } from '../../../services/user-service';

interface tableProps {
  stars: IStar[];
  noPriority: boolean;
  toggleAddStar: (param: boolean) => void;
  setFeed: (id: string) => void;
  removeStar: (starId: string) => void;
  changePriority: (star: IStar, priority: number) => void;
  dragged: IStar | undefined;
  setDragged: (param: IStar | undefined) => void;
}

const NoPriority = ({
  stars,
  noPriority,
  toggleAddStar,
  setFeed,
  removeStar,
  changePriority,
  dragged,
  setDragged,
}: tableProps) => {
  const [isEditor, setIsEditor] = useState<boolean>(false);

  const handleDrop = () => {
    if (dragged) {
      changePriority(dragged, 0);
    }
  };

  useEffect(() => {
    const ac = new AbortController();
    authorizeUser('editor').then((res: boolean) => setIsEditor(res));
    return () => ac.abort();
  }, []);

  return (
    <Collapse
      orientation="horizontal"
      in={noPriority}
      sx={{ overflow: 'hidden', width: 'fit-content', height: '100%' }}
      classes={{
        root: noPriority ? 'collapseOpen' : 'collapseClosed',
        wrapperInner: noPriority
          ? 'collapseInnerWrapperOpen'
          : 'collapseInnerWrapperClosed',
      }}
    >
      <div
        className="noPriority"
        style={{ width: '100%' }}
        onDragOver={(e: BaseSyntheticEvent) => {
          e.preventDefault();
        }}
        onDrop={handleDrop}
      >
        <div className="noPrioirityHeader">
          {isEditor && (
            <SpeedDial
              sx={{
                position: 'fixed',
                left: '110px',
              }}
              ariaLabel="SpeedDial controlled open example"
              icon={<SpeedDialIcon openIcon={<StarBorder />} />}
              onClick={() => toggleAddStar(true)}
            />
          )}
          <h3>ממתינים לתיעדוף</h3>
        </div>
        <StarsTable
          unpriotized
          setFeed={setFeed}
          stars={stars}
          removeStar={removeStar}
          changePriority={changePriority}
          dragged={dragged}
          setDragged={setDragged}
        />
      </div>
    </Collapse>
  );
};

export default NoPriority;
