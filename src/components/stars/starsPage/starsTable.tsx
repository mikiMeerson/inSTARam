import { BaseSyntheticEvent, useState } from 'react';
import { Typography } from '@mui/material';
import StarRow from './starRow';
import FilterHeaders from './Filters/filterHeaders';
import { IEvent, IStar } from '../../../types/interfaces';
import { userRole } from '../../../types/string-types';
import { filterDataType } from '../../../types/configurations';

interface Props {
  userRole: userRole;
  unprioritized: boolean;
  stars: IStar[];
  removeStar: (starId: string) => void;
  changePriority: (star: IStar, priority: number) => void;
  dragged: IStar | undefined;
  setDragged: (star: IStar | undefined) => void;
  events: IEvent[];
}

const StarsTable = ({
  userRole,
  unprioritized,
  stars,
  removeStar,
  changePriority,
  dragged,
  setDragged,
  events,
}: Props) => {
  const getExistingFilters = (filterName: string) => {
    const existingFilter = unprioritized
      ? localStorage.getItem(`${filterName} filter unprioritized`)
      : localStorage.getItem(`${filterName} filter prioritized`);
    return existingFilter ? JSON.parse(existingFilter) : [];
  };

  const [statusFilter, setStatusFilter] = useState<string[]>(
    getExistingFilters('status'),
  );
  const [assigneeFilter, setAssigneeFilter] = useState<string[]>(
    getExistingFilters('assignee'),
  );
  const [blockFilter, setBlockFilter] = useState<string[]>(
    getExistingFilters('block'),
  );
  const [resourceFilter, setResourceFilter] = useState<string[]>(
    getExistingFilters('resource'),
  );
  const [computerFilter, setComputerFilter] = useState<string[]>(
    getExistingFilters('computer'),
  );
  const [dateFilter, setDateFilter] = useState<string[]>(
    getExistingFilters('date'),
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
      tabName: 'block',
      filter: blockFilter,
      func: setBlockFilter,
      chipColor: 'warning',
    },
    {
      tabName: 'resource',
      filter: resourceFilter,
      func: setResourceFilter,
      chipColor: 'default',
    },
    {
      tabName: 'computer',
      filter: computerFilter,
      func: setComputerFilter,
      chipColor: 'info',
    },
    {
      tabName: 'date',
      filter: dateFilter,
      func: setDateFilter,
      chipColor: 'error',
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
        && (blockFilter.length === 0 || blockFilter.includes(s.block))
        && (assigneeFilter.length === 0 || assigneeFilter.includes(s.assignee))
        && (resourceFilter.length === 0
          || resourceFilter.some((element) => s.resources.includes(element))
        )
        && (computerFilter.length === 0
          || (s.computer && computerFilter.includes(s.computer)))
        && (dateFilter.length === 0 || (s.createdAt
          && new Date(s.createdAt) >= new Date(dateFilter[0])
          && new Date(s.createdAt) <= new Date(
            new Date(dateFilter[1]).getFullYear(),
            new Date(dateFilter[1]).getMonth(),
            new Date(dateFilter[1]).getDate() + 1,
          )))) {
        filteredStars.push(s);
      }
    });
    return filteredStars;
  };

  const handleDragOver = (e: BaseSyntheticEvent) => {
    if (!(unprioritized && dragged?.priority === 0)) {
      e.preventDefault();
      e.currentTarget.style.borderTop = '2px solid blue';
    }
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
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <FilterHeaders
        unprioritized={unprioritized}
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
              removeStar={removeStar}
              changePriority={changePriority}
              dragged={dragged}
              setDragged={setDragged}
              event={events.find((e) => e._id === star.event)}
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
