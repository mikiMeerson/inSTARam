import { starExample, TableHeaderTabs } from "../../assets/star";
import StarRow from "./starRow";
import { Table, TableRow, TableCell } from "@mui/material";
import { ArrowDropDown } from "@material-ui/icons";

const StarsTable = () => {
  return (
    <div className="starsTable">
      <Table className="tableHeader">
        <TableRow>
          {TableHeaderTabs.map((tab: any) => {
            return (
              <TableCell width={tab.width}>
                {tab.displayName}{" "}
                <ArrowDropDown
                  className="dropDownIcon"
                  style={{ display: tab.isDropDown ? "" : "none" }}
                />
              </TableCell>
            );
          })}
        </TableRow>
      </Table>
      <StarRow star={starExample} />
      <StarRow star={starExample} />
      <StarRow star={starExample} />
      <StarRow star={starExample} />
      <StarRow star={starExample} />
      <StarRow star={starExample} />
      <StarRow star={starExample} />
      <StarRow star={starExample} />
      <StarRow star={starExample} />
      <StarRow star={starExample} />
      <StarRow star={starExample} />
      <StarRow star={starExample} />
      <StarRow star={starExample} />
    </div>
  );
};

export default StarsTable;
