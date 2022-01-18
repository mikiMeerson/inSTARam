import {
  Table,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Chip,
  TextField,
} from "@mui/material";
import {
  statuses,
  assignees,
  versions,
  resources,
  computers,
} from "../../../assets/star";
import {
  CheckCircleOutline,
  Search,
  PersonOutline,
  DateRange,
  Flight,
  MoreVert,
  FlashOn,
  Computer,
} from "@material-ui/icons";
import { useState } from "react";

interface filterProps {
  setSearchValue: (param: string) => void;
  statusFilter: string;
  assigneeFilter: string;
  versionFilter: string;
  resourceFilter: string;
  computerFilter: string;
  setFilter: (field: string, value: string) => void;
}

const FiltersHeader = ({
  setSearchValue,
  statusFilter,
  assigneeFilter,
  versionFilter,
  resourceFilter,
  computerFilter,
  setFilter,
}: filterProps) => {
  const [displayOptions, setDisplayOptions] = useState(false);
  const [search, setSearch] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [lastTab, setLastTab] = useState("");
  const [displayMore, setDisplayMore] = useState(false);

  let filterEmpty =
    statusFilter === "" &&
    assigneeFilter === "" &&
    versionFilter === "" &&
    resourceFilter === "" &&
    computerFilter === "";

  const getOptions = (options: string[]) => {
    let newOptions = options.filter((o) => {
      if (lastTab === "status") return o !== statusFilter;
      else if (lastTab === "assignee") return o !== assigneeFilter;
      else if (lastTab === "version") return o !== versionFilter;
      else if (lastTab === "resource") return o !== resourceFilter;
      else if (lastTab === "computer") return o !== computerFilter;
      else return true;
    });
    return newOptions;
  };

  const selectedFilters = [
    {
      filter: statusFilter,
      tabName: "status",
    },
    {
      filter: assigneeFilter,
      tabName: "assignee",
    },
    {
      filter: versionFilter,
      tabName: "version",
    },
    {
      filter: resourceFilter,
      tabName: "resource",
    },
    {
      filter: computerFilter,
      tabName: "computer",
    },
  ];

  const primaryFilterFields = [
    {
      name: "name",
      width: "120px",
      activation: "search",
      displayName: "שם",
      icon: <Search className="dropDownIcon" />,
    },
    {
      name: "status",
      width: "40px",
      activation: "options",
      options: statuses,
      displayName: "סטטוס",
      icon: <CheckCircleOutline className="dropDownIcon" />,
    },
    {
      name: "assignee",
      width: "100px",
      activation: "options",
      options: assignees,
      displayName: "אחראי",
      icon: <PersonOutline className="dropDownIcon" />,
    },
    {
      name: "date",
      width: "80px",
      activation: "none",
      displayName: "תאריך",
      icon: <DateRange className="dropDownIcon" />,
    },
    {
      name: "version",
      width: "60px",
      activation: "options",
      options: versions,
      displayName: "בלוק",
      icon: <Flight className="dropdownIcon" />,
    },
  ];

  const secondaryFilterFields = [
    {
      name: "resource",
      activation: "options",
      options: resources,
      displayName: "משאבים",
      icon: <FlashOn className="dropDownIcon" />,
    },
    {
      name: "computer",
      activation: "options",
      options: computers,
      displayName: "מחשב",
      icon: <Computer className="dropDownIcon" />,
    },
  ];

  return (
    <Table
      className="tableHeader"
      sx={{
        marginBottom:
          (displayOptions && !filterEmpty) || (search && !filterEmpty)
            ? "85px"
            : displayOptions || !filterEmpty || search
            ? "55px"
            : 0,
      }}
    >
      <TableBody>
        <TableRow>
          <TableCell width={"20px"} sx={{ textAlign: "center" }}>
            <Button sx={{ textAlign: "center" }}>
              <MoreVert
                fontSize="small"
                onClick={() => {
                  setDisplayMore(!displayMore);
                  setDisplayOptions(false);
                  setSearch(false);
                }}
              />
            </Button>
          </TableCell>
          {primaryFilterFields.map((field: any) => {
            return (
              <TableCell width={field.width} sx={{ textAlign: "center" }}>
                <Button
                  sx={{
                    color: "Gray",
                    fontWeight: "bold",
                    textAlign: "center",
                    background:
                      lastTab === field.name && (displayOptions || search)
                        ? "whitesmoke"
                        : "",
                  }}
                  onClick={() => {
                    if (field.activation === "search") {
                      setSearch(lastTab === "name" ? !search : true);
                      setDisplayOptions(false);
                    } else if (field.activation === "options") {
                      setDisplayOptions(
                        lastTab === field.name ? !displayOptions : true
                      );
                      setOptions(field.options);
                      setSearch(false);
                      setLastTab(field.name);
                    }
                    setLastTab(field.name);
                  }}
                >
                  {field.displayName}
                  {field.icon}
                </Button>
              </TableCell>
            );
          })}
        </TableRow>

        <TableRow sx={{ display: displayMore ? "" : "none" }}>
          <TableCell width={"60px"} />

          {secondaryFilterFields.map((field: any) => {
            return (
              <TableCell sx={{ textAlign: "center" }}>
                <Button
                  sx={{
                    color: "Gray",
                    fontWeight: "bold",
                    textAlign: "center",
                    paddingLeft: 0,
                    background:
                      lastTab === field.name && (displayOptions || search)
                        ? "whitesmoke"
                        : "",
                  }}
                  onClick={() => {
                    setDisplayOptions(
                      lastTab === field.name ? !displayOptions : true
                    );
                    setOptions(field.options);
                    setSearch(false);
                    setLastTab(field.name);
                  }}
                >
                  {field.displayName}
                  {field.icon}
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
          {getOptions(options).map((o: string) => {
            return (
              <Chip
                size="medium"
                sx={{ marginRight: "15px" }}
                label={o}
                key={o}
                onClick={() => {
                  setFilter(lastTab, o);
                }}
              />
            );
          })}
        </div>

        <div
          className="filterSection"
          style={{
            display: !filterEmpty ? "flex" : "none",
            marginTop: displayOptions || search ? "50px" : 0,
          }}
        >
          {selectedFilters.map((selected) => {
            return (
              <Chip
                size="medium"
                color="secondary"
                label={selected.filter}
                sx={{
                  marginRight: "15px",
                  display: selected.filter === "" ? "none" : "",
                }}
                onClick={() => setFilter(selected.tabName, "")}
              />
            );
          })}
        </div>
      </TableBody>
    </Table>
  );
};

export default FiltersHeader;
