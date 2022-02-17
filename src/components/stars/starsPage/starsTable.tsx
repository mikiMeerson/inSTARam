import { BaseSyntheticEvent, useState } from 'react';
import { Typography } from '@mui/material';
import StarRow from './starRow';
import { filterDataType } from '../../../assets/star';
import FiltersHeader from './filtersHeader';

interface starProps {
  userRole: userRole;
  unprioritized: boolean;
  stars: IStar[];
  setFeed: (id: string) => void;
  removeStar: (starId: string) => void;
  changePriority: (star: IStar, priority: number) => void;
  dragged: IStar | undefined;
  setDragged: (star: IStar | undefined) => void;
}

const StarsTable = ({
  userRole,
  unprioritized,
  stars,
  setFeed,
  removeStar,
  changePriority,
  dragged,
  setDragged,
}: starProps) => {
  const getExistingFilters = (filterName: string) => {
    const existingFilter = localStorage.getItem(`${filterName} filter`);
    return existingFilter ? JSON.parse(existingFilter) : [];
  };

  const [statusFilter, setStatusFilter] = useState<string[]>(
    getExistingFilters('status'),
  );
  const [assigneeFilter, setAssigneeFilter] = useState<string[]>(
    getExistingFilters('assignee'),
  );
  const [versionFilter, setVersionFilter] = useState<string[]>(
    getExistingFilters('version'),
  );
  const [resourceFilter, setResourceFilter] = useState<string[]>(
    getExistingFilters('resource'),
  );
  const [computerFilter, setComputerFilter] = useState<string[]>(
    getExistingFilters('computer'),
  );
  const [nameFilter, setNameFilter] = useState<string>('');

  const filtersData: filterDataType[] = [
    {
      tabName: 'status',
      filter: statusFilter,
      func: setStatusFilter,
      chipColor: 'primary',
    },
    {
      tabName: 'assignee',
      filter: assigneeFilter,
      func: setAssigneeFilter,
      chipColor: 'secondary',
    },
    {
      tabName: 'version',
      filter: versionFilter,
      func: setVersionFilter,
      chipColor: 'warning',
    },
    {
      tabName: 'resource',
      filter: resourceFilter,
      func: setResourceFilter,
      chipColor: 'error',
    },
    {
      tabName: 'computer',
      filter: computerFilter,
      func: setComputerFilter,
      chipColor: 'info',
    },
  ];

  const getFilteredStars = () => {
    if (filtersData.every((f) => f.filter.length === 0) && nameFilter === '') {
      return stars;
    }

    const filteredStars: IStar[] = [];
    stars.forEach((s) => {
      if ((nameFilter === '' || s.name.includes(nameFilter))
        && (statusFilter.length === 0 || statusFilter.includes(s.status))
        && (versionFilter.length === 0 || versionFilter.includes(s.version))
        && (assigneeFilter.length === 0 || assigneeFilter.includes(s.assignee))
        && (resourceFilter.length === 0
          || resourceFilter.some((element) => s.resources.includes(element))
        )
        && (computerFilter.length === 0
          || (s.computer && computerFilter.includes(s.computer)))) {
        filteredStars.push(s);
      }
    });
    return filteredStars;
  };

  const handleDragOver = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    e.currentTarget.style.borderTop = '2px solid blue';
  };

  const handleDrop = (e: BaseSyntheticEvent) => {
    e.currentTarget.style.border = 'none';
    if (dragged) {
      if (unprioritized) changePriority(dragged, 0);
      else if (stars.length === 0) {
        changePriority(dragged, 1);
      } else if (dragged.priority > 0) changePriority(dragged, stars.length);
      else changePriority(dragged, stars.length + 1);

      setDragged(undefined);
    }
  };

  return (
    <div
      style={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <FiltersHeader
        nameFilter={nameFilter}
        setNameFilter={setNameFilter}
        filtersData={filtersData}
      />
      <div className="starsTable">
        {getFilteredStars().length === 0 && (
          <div style={{ textAlign: 'center' }}>
            <Typography variant="caption">
              לא נמצאו סטארים
            </Typography>
          </div>
        )}
        {getFilteredStars().length > 0 && getFilteredStars()
          .sort((a: IStar, b: IStar) => a.priority - b.priority)
          .map((star: IStar) => (
            <StarRow
              userRole={userRole}
              key={star._id}
              star={star}
              setFeed={setFeed}
              removeStar={removeStar}
              changePriority={changePriority}
              dragged={dragged}
              setDragged={setDragged}
            />
          ))}
        <div
          style={{ width: '100%', height: '50px' }}
          onDragOver={handleDragOver}
          onDragLeave={
            (e: BaseSyntheticEvent) => (e.currentTarget.style.border = 'none')
          }
          onDrop={handleDrop}
        />
      </div>
    </div>
  );
};

export default StarsTable;
