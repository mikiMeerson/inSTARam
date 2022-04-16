import { BaseSyntheticEvent, useCallback, useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import StarRow from './starRow';
import FilterHeaders from './Filters/filterHeaders';
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
  const [resourcesFilter, setResourcesFilter] = useState<string[]>(
    getExistingFilters('resources'),
  );
  const [computerFilter, setComputerFilter] = useState<string[]>(
    getExistingFilters('computer'),
  );
  const [dateFilter, setDateFilter] = useState<string[]>(
    getExistingFilters('createdAt'),
  );
  const [freeTextFilter, setFreeTextFilter] = useState<string>('');
  const [filteredStars, setFilteredStars] = useState<IStar[]>([]);

  const getFiltersData = useCallback((): FilterDataType[] => [
    {
      tabName: 'status',
      filter: statusFilter,
      func: setStatusFilter,
      filterType: 'single',
      chipColor: 'primary',
    },
    {
      tabName: 'assignee',
      filter: assigneeFilter,
      func: setAssigneeFilter,
      filterType: 'single',
      chipColor: 'secondary',
    },
    {
      tabName: 'block',
      filter: blockFilter,
      func: setBlockFilter,
      filterType: 'single',
      chipColor: 'warning',
    },
    {
      tabName: 'resources',
      filter: resourcesFilter,
      func: setResourcesFilter,
      filterType: 'multiple',
      chipColor: 'default',
    },
    {
      tabName: 'computer',
      filter: computerFilter,
      func: setComputerFilter,
      filterType: 'single',
      chipColor: 'info',
    },
    {
      tabName: 'createdAt',
      filter: dateFilter,
      func: setDateFilter,
      filterType: 'date',
      chipColor: 'error',
    },
  ], [
    assigneeFilter,
    blockFilter,
    computerFilter,
    dateFilter,
    resourcesFilter,
    statusFilter,
  ]);

  useEffect(() => {
    const checkFilter = (filterData: FilterDataType, star: IStar): boolean => {
      if (filterData.filterType === 'single') {
        return filterData.filter.length === 0
          || filterData.filter
            .includes(star[filterData.tabName as keyof IStar] as string);
      }
      // filterType is date
      if (filterData.filterType === 'multiple') {
        return filterData.filter.length === 0
          || filterData.filter
            .some((element) => (star[
              filterData.tabName as keyof IStar
            ] as string[])
              .includes(element));
      }
      const creationDate = star[filterData.tabName as keyof IStar] as string;
      return filterData.filter.length === 0
        || (new Date(creationDate) >= new Date(filterData.filter[0])
          && new Date(creationDate) <= new Date(
            new Date(filterData.filter[1]).getFullYear(),
            new Date(filterData.filter[1]).getMonth(),
            new Date(filterData.filter[1]).getDate() + 1,
          )
        );
    };

    const checkFreeTextFilter = (filter: string, star: IStar): boolean => (
      filter === '' || star.name.includes(filter) || star.desc.includes(filter)
    );

    const tempFilteredStars: IStar[] = [];
    stars.forEach((star) => {
      if (checkFreeTextFilter(freeTextFilter, star) && getFiltersData()
        .every((filterData) => checkFilter(filterData, star))) {
        tempFilteredStars.push(star);
      }
    });
    setFilteredStars(tempFilteredStars);
  }, [getFiltersData, freeTextFilter, stars]);

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
        {... { unprioritized, freeTextFilter, setFreeTextFilter }}
        filtersData={getFiltersData()}
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
          .sort((star1, star2) => star1.priority - star2.priority)
          .map((star: IStar) => (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              {!unprioritized && (<div id="priority">{star.priority}</div>)}
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
