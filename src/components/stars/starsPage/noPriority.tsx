import { BaseSyntheticEvent, useState } from 'react';
import { Collapse, SpeedDial, SpeedDialIcon, Button } from '@mui/material';
import { StarBorder, ChevronRight, MenuOpenSharp } from '@material-ui/icons';
import StarsTable from './starsTable';

interface tableProps {
  userRole: userRole;
  stars: IStar[];
  toggleAddStar: (param: boolean) => void;
  setFeed: (id: string) => void;
  removeStar: (starId: string) => void;
  changePriority: (star: IStar, priority: number) => void;
  dragged: IStar | undefined;
  setDragged: (param: IStar | undefined) => void;
}

const NoPriority = ({
  userRole,
  stars,
  toggleAddStar,
  setFeed,
  removeStar,
  changePriority,
  dragged,
  setDragged,
}: tableProps) => {
  const [hideNoPriority, toggleHideNoPriority] = useState<boolean>(false);

  const handleDrop = () => {
    if (dragged) {
      changePriority(dragged, 0);
    }
  };

  return (
    <>
      <Collapse
        orientation="horizontal"
        in={!hideNoPriority}
        sx={{ overflow: 'hidden', width: 'fit-content', height: '100%' }}
        classes={{
          root: hideNoPriority ? 'collapseClosed' : 'collapseOpen',
          wrapperInner: hideNoPriority
            ? 'collapseInnerWrapperClosed'
            : 'collapseInnerWrapperOpen',
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
            {(userRole !== 'viewer') && (
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
            userRole={userRole}
            unprioritized
            setFeed={setFeed}
            stars={stars}
            removeStar={removeStar}
            changePriority={changePriority}
            dragged={dragged}
            setDragged={setDragged}
          />
        </div>
      </Collapse>
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
        onClick={() => toggleHideNoPriority(!hideNoPriority)}
      >
        {hideNoPriority
          ? <ChevronRight fontSize="small" htmlColor="white" />
          : <MenuOpenSharp fontSize="small" htmlColor="white" />}
      </Button>
    </>
  );
};

export default NoPriority;
