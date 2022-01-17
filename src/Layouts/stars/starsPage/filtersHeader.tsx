import {
  Table,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Chip,
} from "@mui/material";
import { TableHeaderTabs, headerTabType } from "../../../assets/star";
import { ArrowDropDown, Search } from "@material-ui/icons";
import { useState } from "react";

interface filterProps {
  filters: any;
  setFilters: (param: any) => any;
}

const FiltersHeader = ({ filters, setFilters }: filterProps) => {
  const [displayOptions, setDisplayOptions] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [lastTab, setLastTab] = useState("");

  const openOptions = (tab: headerTabType) => {
    if (lastTab === tab.displayName) setDisplayOptions(!displayOptions);
    else {
      setLastTab(tab.displayName);
      if (tab.action === "dropdown") {
        setDisplayOptions(true);
        if (tab.options) setOptions(tab.options);
      }
    }
  };

  return (
    <Table
      className="tableHeader"
      sx={{
        marginBottom:
          displayOptions && filters
            ? "85px"
            : displayOptions || filters
            ? "35px"
            : 0,
      }}
    >
      <TableBody>
        <TableRow>
          {TableHeaderTabs.map((tab: headerTabType) => {
            return (
              <TableCell
                key={tab.displayName}
                width={tab.width}
                sx={{ textAlign: "center" }}
              >
                <Button
                  sx={{
                    color: "Gray",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                  onClick={() => openOptions(tab)}
                >
                  {tab.displayName}
                  <ArrowDropDown
                    className="dropDownIcon"
                    style={{ display: tab.action === "dropdown" ? "" : "none" }}
                  />
                  <Search
                    className="dropDownIcon"
                    style={{ display: tab.action === "search" ? "" : "none" }}
                  />
                </Button>
              </TableCell>
            );
          })}
        </TableRow>
        <div
          className="filterSection"
          style={{
            display: filters ? "flex" : "none",
          }}
        >
          {filters.map((f: string) => {
            return (
              <Chip
                size="medium"
                color="secondary"
                sx={{ marginRight: "15px" }}
                label={f}
                key={f}
                onClick={() =>
                  setFilters(filters.filter((fi: string) => fi !== f))
                }
              />
            );
          })}
        </div>
        <div
          className="optionSection"
          style={{
            display: displayOptions ? "flex" : "none",
            marginTop: filters ? "45px" : 0,
          }}
        >
          {options
            ?.filter((o) => !filters.includes(o))
            .map((o) => {
              return (
                <Chip
                  size="medium"
                  sx={{ marginRight: "15px" }}
                  label={o}
                  key={o}
                  onClick={() => setFilters([...filters, o])}
                />
              );
            })}
        </div>
      </TableBody>
    </Table>
  );
};

export default FiltersHeader;
