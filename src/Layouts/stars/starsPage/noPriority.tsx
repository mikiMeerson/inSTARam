import { Collapse, SpeedDial, SpeedDialIcon } from "@mui/material";
import { StarBorder } from "@material-ui/icons";
import StarsTable from "./starsTable";
import { starType } from "../../../assets/star";

interface tableProps {
  stars: starType[];
  noPriority: boolean;
  toggleAddStar: (param: boolean) => void;
  setFeed: (param: starType) => void;
  removeStar: (star: starType) => void;
  changePriority: (star: starType, priority: number) => void;
  dragged: starType | undefined;
  setDragged: (param: starType | undefined) => void;
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
  return (
    <Collapse
      orientation={"horizontal"}
      in={noPriority}
      sx={{ overflow: "hidden", width: "fit-content", height: "100%" }}
      classes={{
        root: noPriority ? "collapseOpen" : "collapseClosed",
        wrapperInner: noPriority
          ? "collapseInnerWrapperOpen"
          : "collapseInnerWrapperClosed",
      }}
    >
      <div className="noPriority" style={{ width: "100%" }}>
        <div className="noPrioirityHeader">
          <SpeedDial
            sx={{ position: "fixed", left: "110px" }}
            ariaLabel="SpeedDial controlled open example"
            icon={<SpeedDialIcon openIcon={<StarBorder />} />}
            onClick={() => toggleAddStar(true)}
          />
          <h3>ממתינים לתיעדוף</h3>
        </div>
        <StarsTable
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
