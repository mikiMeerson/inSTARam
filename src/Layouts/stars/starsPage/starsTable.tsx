import { TableHeaderTabs } from "../../../assets/star";
import StarRow from "./starRow";
import { Table, TableRow, TableCell, Button } from "@mui/material";
import { ArrowDropDown } from "@material-ui/icons";
import { starType } from "../../../assets/star";

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
  const handleDrop = () => {
    if (dragged) {
      if (dragged.priority === 0) {
        changePriority(dragged, 1);
      } else {
        changePriority(dragged, 0);
      }
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
      onDragOver={(e: any) => {
        e.preventDefault();
      }}
      onDrop={handleDrop}
    >
      <Table className="tableHeader">
        <TableRow>
          {TableHeaderTabs.map((tab: any) => {
            return (
              <TableCell width={tab.width}>
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
                setDragged={setDragged}
              />
            );
          })}
      </div>
    </div>
  );
};

export default StarsTable;
