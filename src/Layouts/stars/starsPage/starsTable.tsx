import { useState } from "react";
import StarRow from "./starRow";
import { starType } from "../../../assets/star";
import FiltersHeader from "./filtersHeader";

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
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [assigneeFilter, setAssigneeFilter] = useState<string>("");
  const [versionFilter, setVersionFilter] = useState<string>("");
  const [searchValue, setSearchValue] = useState("");

  const getFilteredStars = () => {
    if (
      statusFilter === "" &&
      assigneeFilter === "" &&
      versionFilter === "" &&
      searchValue === ""
    )
      return stars;

    let filteredStars: starType[] = [];
    stars.forEach((s) => {
      if (
        (s.name.includes(searchValue) || searchValue === "") &&
        (statusFilter === "" || s.status === statusFilter) &&
        (versionFilter === "" || s.version === versionFilter) &&
        (assigneeFilter === "" || s.assignee === assigneeFilter)
      )
        filteredStars.push(s);
    });
    return filteredStars;
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    e.currentTarget.style.borderTop = "2px solid blue";
  };

  const handleDrop = (e: any) => {
    e.currentTarget.style.border = "none";
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
      <FiltersHeader
        statusFilter={statusFilter}
        assigneeFilter={assigneeFilter}
        versionFilter={versionFilter}
        setStatusFilter={setStatusFilter}
        setAssigneeFilter={setAssigneeFilter}
        setVersionFilter={setVersionFilter}
        setSearchValue={setSearchValue}
      />
      <div className="starsTable">
        {getFilteredStars()
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
          onDragLeave={(e: any) => (e.currentTarget.style.border = "none")}
          onDrop={handleDrop}
        ></div>
      </div>
    </div>
  );
};

export default StarsTable;
