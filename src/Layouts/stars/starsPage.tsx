import { useState } from "react";
import StarsTable from "./starsTable";
import {
  Button,
  Collapse,
} from "@mui/material";
import { ChevronRight, MenuOpenSharp } from "@material-ui/icons";
import "./styles/stars.css";

const StarsPage = () => {
  const [toggleNoPriority, setToggleNoPriority] = useState(true);

  let icon;
  if (toggleNoPriority)
    icon = <MenuOpenSharp fontSize="small" htmlColor="white" />;
  else icon = <ChevronRight fontSize="small" htmlColor="white" />;

  return (
    <div className="Page">
      <h1>סטארים</h1>
      <div className="stars">
        <StarsTable />
        <Collapse
          orientation={"horizontal"}
          in={toggleNoPriority}
          sx={{ overflow: "hidden", width: "fit-content", height: "90%" }}
          classes={{
            root: toggleNoPriority ? "collapseOpen" : "collapseClosed",
            wrapperInner: toggleNoPriority
              ? "collapseInnerWrapperOpen"
              : "collapseInnerWrapperClosed",
          }}
        >
          <div className="noPriority" style={{ width: "100%" }}>
            <h3>ממתינים לתיעדוף</h3>
            <StarsTable />
          </div>
        </Collapse>
      </div>
      <Button
        classes={{ root: "collapseButton" }}
        variant="contained"
        sx={{
          height: "50px",
          width: "45px",
          borderRadius: "50%",
          margin: "3%",
          position: "absolute",
          background: "black",
          bottom: 0,
          left: 0,
        }}
        onClick={() => setToggleNoPriority(!toggleNoPriority)}
      >
        {icon}
      </Button>
    </div>
  );
};

export default StarsPage;
