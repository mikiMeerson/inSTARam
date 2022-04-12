import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import StarRow from './starRow';
import FilterHeaders from './filters/filterHeaders';
import { IEvent, IStar } from '../../../types/interfaces';
import { UserRole } from '../../../types/string-types';
import { FilterDataType } from '../../../types/configurations';

interface Props {
  userRole: UserRole;
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
      ? localStorage.getItem(`stars ${filterName} unprioritized`)
      : localStorage.getItem(`stars ${filterName} `);
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
  const [freeTextFilter, setFreeTextFilter] = useState<string>('');
  const [filteredStars, setFilteredStars] = useState<IStar[]>([]);

  const filtersData: FilterDataType[] = [
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

  useEffect(() => {
    const tempFilteredStars: IStar[] = [];
    stars.forEach((star) => {
      if ((freeTextFilter === ''
        || star.name.includes(freeTextFilter)
        || star.desc.includes(freeTextFilter))
        && (statusFilter.length === 0 || statusFilter.includes(star.status))
        && (blockFilter.length === 0 || blockFilter.includes(star.block))
        && (assigneeFilter.length === 0
          || assigneeFilter.includes(star.assignee))
        && (computerFilter.length === 0
          || computerFilter.includes(star.computer))
        && (resourceFilter.length === 0 || resourceFilter
          .some((element) => star.resources.includes(element)))
        && (dateFilter.length === 0 || (star.createdAt
          && new Date(star.createdAt) >= new Date(dateFilter[0])
          && new Date(star.createdAt) <= new Date(
            new Date(dateFilter[1]).getFullYear(),
            new Date(dateFilter[1]).getMonth(),
            new Date(dateFilter[1]).getDate() + 1,
          )))) {
        tempFilteredStars.push(star);
      }
    });
    setFilteredStars(tempFilteredStars);
  }, [
    stars,
    assigneeFilter,
    blockFilter,
    computerFilter,
    dateFilter,
    freeTextFilter,
    resourceFilter,
    statusFilter,
  ]);

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
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <FilterHeaders
        {... { unprioritized, freeTextFilter, setFreeTextFilter, filtersData }}
      />
      <div className="starsTable">
        {filteredStars.length === 0 && (
          <div style={{ textAlign: 'center' }}>
            <Typography variant="caption">
              לא נמצאו סטארים
            </Typography>
          </div>
        )}
        {filteredStars.length > 0 && filteredStars
          .sort((a: IStar, b: IStar) => a.priority - b.priority)
          .map((star: IStar, index: number) => (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              {!unprioritized && (<div id="priority">{index + 1}</div>)}
              <StarRow
                key={star._id}
                {... {
                  userRole,
                  star,
                  removeStar,
                  changePriority,
                  dragged,
                  setDragged,
                }}
                event={events.find((event) => event._id === star.event)}
              />
            </div>
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
