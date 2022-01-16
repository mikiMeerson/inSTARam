import { TableHeaderTabs } from "../../../assets/star";
import StarRow from "./starRow";
import { Table, TableRow, TableCell, Button } from "@mui/material";
import { ArrowDropDown } from "@material-ui/icons";
import { starType } from "../../../assets/star";
import { TableBody } from "@material-ui/core";

interface starProps {
  stars: starType[];
  setFeed: (star: starType) => void;
  removeStar: (star: starType) => void;
  changePriority: (star: starType, priority: number) => void;
  dragged: starType | undefined;
  setDragged: (star: starType | undefined) => void;
}
const StarsTable = ({
  stars,
  setFeed,
  removeStar,
  changePriority,
  dragged,
  setDragged,
}: starProps) => {
  const handleDragOver = (e: any) => {
    e.preventDefault();
    e.currentTarget.style.borderTop = "2px solid blue";
  };

  const handleDrop = (e: any) => {
    e.currentTarget.style.border = "none"
    if (dragged) {
      let maxPri = stars
        .sort((a: starType, b: starType) => a.priority - b.priority)
        .reverse()[0].priority;
      changePriority(dragged, maxPri + 1);
    }
    setDragged(undefined);
  };
  return (
    <div
      style={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Table className="tableHeader">
        <TableBody>
          <TableRow>
            {TableHeaderTabs.map((tab: any) => {
              return (
                <TableCell key={tab} width={tab.width}>
                  <Button
                    sx={{
                      color: "Gray",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {tab.displayName}
                    <ArrowDropDown
                      className="dropDownIcon"
                      style={{ display: tab.isDropDown ? "" : "none" }}
                    />
                  </Button>
                </TableCell>
              );
            })}
          </TableRow>
        </TableBody>
      </Table>
      <div className="starsTable">
        {stars
          .sort((a: starType, b: starType) => {
            return a.priority - b.priority;
          })
          .map((star: starType) => {
            return (
              <StarRow
                key={star.id}
                star={star}
                setFeed={setFeed}
                removeStar={removeStar}
                changePriority={changePriority}
                dragged={dragged}
                setDragged={setDragged}
              />
            );
          })}
        <div
          style={{ width: "100%", height: "50px" }}
          onDragOver={handleDragOver}
          onDragLeave={(e: any) => e.currentTarget.style.border = "none"}
          onDrop={handleDrop}
        ></div>
      </div>
    </div>
  );
};

export default StarsTable;
