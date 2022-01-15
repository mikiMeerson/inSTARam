import { useState } from "react";
import StarsTable from "./starsTable";
import { Button } from "@mui/material";
import { ChevronRight, MenuOpenSharp } from "@material-ui/icons";
import "../styles/stars.css";
import { starList, starType } from "../../../assets/star";
import AddStar from "./addStar";
import NoPriority from "./noPriority";

interface starProps {
  setStar: (star: starType) => void;
}
const StarsPage = ({ setStar }: starProps) => {
  const [stars, setStars] = useState(starList);
  const [noPriority, toggleNoPriority] = useState(true);
  const [openAddStar, toggleOpenAddStar] = useState(false);

  const removeStar = (star: starType) => {
    setStars(
      stars
        .filter((s: starType) => s !== star)
        .map((s: starType) => {
          if (s.priority > star.priority && star.priority > 0) s.priority -= 1;
          return s;
        })
    );
  };

  const addStar = (star: starType) => {
    setStars([...stars, star]);
  };

  let icon;
  if (noPriority) icon = <MenuOpenSharp fontSize="small" htmlColor="white" />;
  else icon = <ChevronRight fontSize="small" htmlColor="white" />;

  return (
    <div className="Page">
      <h1>סטארים</h1>
      <div className="stars">
        <StarsTable
          stars={stars.filter((star) => star.priority > 0)}
          setStar={setStar}
          removeStar={removeStar}
        />
        <NoPriority
          stars={stars.filter((star) => star.priority === 0)}
          noPriority={noPriority}
          toggleAddStar={toggleOpenAddStar}
          setStar={setStar}
          removeStar={removeStar}
        />
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
          left: "5px",
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
