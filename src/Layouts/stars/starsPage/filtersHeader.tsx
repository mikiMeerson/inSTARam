import {
  Table,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Chip,
  TextField,
} from "@mui/material";
import { statuses, assignees, versions } from "../../../assets/star";
import {
  CheckCircleOutline,
  Search,
  PersonOutline,
  DateRange,
  Flight,
} from "@material-ui/icons";
import { useState } from "react";

interface filterProps {
  setSearchValue: (param: string) => void;
  statusFilter: string;
  assigneeFilter: string;
  versionFilter: string;
  setStatusFilter: (param: string) => void;
  setAssigneeFilter: (param: string) => void;
  setVersionFilter: (param: string) => void;
}

const FiltersHeader = ({
  setSearchValue,
  statusFilter,
  assigneeFilter,
  versionFilter,
  setStatusFilter,
  setAssigneeFilter,
  setVersionFilter,
}: filterProps) => {
  const [displayOptions, setDisplayOptions] = useState(false);
  const [search, setSearch] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [lastTab, setLastTab] = useState("");

  let filterEmpty =
    statusFilter === "" && assigneeFilter === "" && versionFilter === "";

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
            <Button sx={{ textAlign: "center" }} disabled>
              עדיפות
            </Button>
          </TableCell>

          <TableCell width={"100px"} sx={{ textAlign: "center" }}>
            <Button
              sx={{
                color: "Gray",
                fontWeight: "bold",
                textAlign: "center",
                background:
                  lastTab === "name" && (displayOptions || search)
                    ? "whitesmoke"
                    : "",
              }}
              onClick={() => {
                setSearch(lastTab === "name" ? !search : true);
                setDisplayOptions(false);
                setLastTab("name");
              }}
            >
              שם
              <Search className="dropDownIcon" />
            </Button>
          </TableCell>

          <TableCell width={"20px"} sx={{ textAlign: "center" }}>
            <Button
              sx={{
                color: "Gray",
                fontWeight: "bold",
                textAlign: "center",
                background:
                  lastTab === "status" && (displayOptions || search)
                    ? "whitesmoke"
                    : "",
              }}
              onClick={() => {
                setDisplayOptions(
                  lastTab === "status" ? !displayOptions : true
                );
                setOptions(statuses);
                setSearch(false);
                setLastTab("status");
              }}
            >
              סטטוס
              <CheckCircleOutline className="dropDownIcon" />
            </Button>
          </TableCell>

          <TableCell width={"60px"} sx={{ textAlign: "center" }}>
            <Button
              sx={{
                color: "Gray",
                fontWeight: "bold",
                textAlign: "center",
                background:
                  lastTab === "assignee" && (displayOptions || search)
                    ? "whitesmoke"
                    : "",
              }}
              onClick={() => {
                setDisplayOptions(
                  lastTab === "assignee" ? !displayOptions : true
                );
                setOptions(assignees);
                setSearch(false);
                setLastTab("assignee");
              }}
            >
              אחראי
              <PersonOutline className="dropDownIcon" />
            </Button>
          </TableCell>

          <TableCell width={"70px"} sx={{ textAlign: "center" }}>
            <Button
              sx={{
                color: "Gray",
                fontWeight: "bold",
                textAlign: "center",
                background:
                  lastTab === "date" && (displayOptions || search)
                    ? "whitesmoke"
                    : "",
              }}
              onClick={() => {}}
            >
              תאריך
              <DateRange className="dropDownIcon" />
            </Button>
          </TableCell>

          <TableCell width={"50px"} sx={{ textAlign: "center" }}>
            <Button
              sx={{
                color: "Gray",
                fontWeight: "bold",
                textAlign: "center",
                background:
                  lastTab === "version" && (displayOptions || search)
                    ? "whitesmoke"
                    : "",
              }}
              onClick={() => {
                setDisplayOptions(
                  lastTab === "version" ? !displayOptions : true
                );
                setOptions(versions);
                setSearch(false);
                setLastTab("version");
              }}
            >
              סטטוס
              <Flight className="dropDownIcon" />
            </Button>
          </TableCell>
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
          {options.filter((o :string) => {
            if (lastTab === "status") return o !== statusFilter;
            else if(lastTab === "assignee") return o !== assigneeFilter;
            else if(lastTab === "version") return o !== versionFilter;
            else return true;
          }).map((o: string) => {
            return (
              <Chip
                size="medium"
                sx={{ marginRight: "15px" }}
                label={o}
                key={o}
                onClick={() => {
                  if (lastTab === "status") setStatusFilter(o);
                  else if (lastTab === "assignee") setAssigneeFilter(o);
                  else if (lastTab === "version") setVersionFilter(o);
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
          <Chip
            size="medium"
            color="secondary"
            label={statusFilter}
            sx={{
              marginRight: "15px",
              display: statusFilter === "" ? "none" : "",
            }}
            onClick={() => setStatusFilter("")}
          />
          <Chip
            size="medium"
            color="secondary"
            label={assigneeFilter}
            sx={{
              marginRight: "15px",
              display: assigneeFilter === "" ? "none" : "",
            }}
            onClick={() => setAssigneeFilter("")}
          />
          <Chip
            size="medium"
            color="secondary"
            label={versionFilter}
            sx={{
              marginRight: "15px",
              display: versionFilter === "" ? "none" : "",
            }}
            onClick={() => setVersionFilter("")}
          />
        </div>
      </TableBody>
    </Table>
  );
};

export default FiltersHeader;
