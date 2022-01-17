import {
  Table,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Chip,
  TextField,
} from "@mui/material";
import { TableHeaderTabs, headerTabType } from "../../../assets/star";
import { ArrowDropDown, Search } from "@material-ui/icons";
import { useState } from "react";

interface filterProps {
  filters: string[];
  setFilters: (param: string[]) => void;
  setSearchValue: (param: string) => void;
}

const FiltersHeader = ({
  filters,
  setFilters,
  setSearchValue,
}: filterProps) => {
  const [displayOptions, setDisplayOptions] = useState(false);
  const [search, setSearch] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [lastTab, setLastTab] = useState("");

  const openOptions = (tab: headerTabType) => {
    if (lastTab === tab.displayName) {
      if (tab.action === "dropdown") setDisplayOptions(!displayOptions);
      else if (tab.action === "search") setSearch(!search);
    } else {
      if (tab.action === "dropdown" || tab.action === "search") {
        setLastTab(tab.displayName);
        setSearch(tab.action === "search");
        setDisplayOptions(tab.action === "dropdown");
        if (tab.options) setOptions(tab.options);
      }
    }
  };

  return (
    <Table
      className="tableHeader"
      sx={{
        marginBottom:
          (displayOptions && filters.length > 0) ||
          (search && filters.length > 0)
            ? "85px"
            : displayOptions || filters.length > 0 || search
            ? "55px"
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
                    background:
                      tab.displayName === lastTab && (displayOptions || search)
                        ? "whitesmoke"
                        : "",
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
          className="searchSection"
          style={{
            display: search ? "flex" : "none",
          }}
        >
          <TextField
            fullWidth
            autoFocus
            variant="standard"
            label="חפש לפי טקסט חופשי"
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div
          className="optionSection"
          style={{
            display: displayOptions ? "flex" : "none",
          }}
        >
          {options
            ?.filter((o: string) => !filters.includes(o))
            .map((o: string) => {
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
        <div
          className="filterSection"
          style={{
            display: filters ? "flex" : "none",
            marginTop: displayOptions || search ? "50px" : 0,
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
      </TableBody>
    </Table>
  );
};

export default FiltersHeader;
