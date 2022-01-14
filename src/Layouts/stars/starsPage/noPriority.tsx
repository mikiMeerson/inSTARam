import { Collapse, SpeedDial, SpeedDialIcon } from "@mui/material";
import { StarBorder } from "@material-ui/icons";
import StarsTable from "./starsTable";
import { starType } from "../../../assets/star";

interface tableProps {
  noPriority: boolean;
  toggleAddStar: (param: boolean) => void;
  setStar: (param: starType) => void;
}

const NoPriority = ({ noPriority, toggleAddStar, setStar }: tableProps) => {
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
        <StarsTable setStar={setStar} />
      </div>
    </Collapse>
  );
};

export default NoPriority;
