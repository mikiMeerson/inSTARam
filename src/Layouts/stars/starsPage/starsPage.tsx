import { useState } from "react";
import StarsTable from "./starsTable";
import { Button } from "@mui/material";
import { ChevronRight, MenuOpenSharp } from "@material-ui/icons";
import "../styles/stars.css";
import { starType } from "../../../assets/star";
import AddStar from "./addStar";
import NoPriority from './noPriority';

interface starProps {
  setStar: (star: starType) => void;
}
const StarsPage = ({ setStar }: starProps) => {
  const [noPriority, toggleNoPriority] = useState(true);
  const [addStar, toggleAddStar] = useState(false);
  
  let icon;
  if (noPriority)
    icon = <MenuOpenSharp fontSize="small" htmlColor="white" />;
  else icon = <ChevronRight fontSize="small" htmlColor="white" />;

  return (
    <div className="Page">
      <h1>סטארים</h1>
      <div className="stars">
        <StarsTable setStar={setStar} />
        <NoPriority noPriority={noPriority} toggleAddStar={toggleAddStar} setStar={setStar} />
      </div>
      <Button
        classes={{ root: "collapseButton" }}
        variant="contained"
        sx={{
          height: "60px",
          width: "40px",
          borderRadius: "50%",
          margin: "3%",
          position: "absolute",
          background: "black",
          bottom: 0,
          left: '5px',
        }}
        onClick={() => toggleNoPriority(!noPriority)}
      >
        {icon}
      </Button>
      <AddStar isOpen={addStar} toggleModal={toggleAddStar}/>
    </div>
  );
};

export default StarsPage;
