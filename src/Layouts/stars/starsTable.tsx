import { starExample, TableHeaderTabs } from "../../assets/star";
import StarRow from "./starRow";
import { Table, TableRow, TableCell, Button } from "@mui/material";
import { ArrowDropDown } from "@material-ui/icons";

const StarsTable = () => {
  return (
    <div style={{flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
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
    </div>
  );
};

export default StarsTable;
