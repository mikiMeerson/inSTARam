import { BaseSyntheticEvent, useState } from 'react';
import StarRow from './starRow';
import { filterDataType } from '../../../assets/star';
import FiltersHeader from './filtersHeader';

interface starProps {
  unpriotized: boolean;
  stars: IStar[];
  setFeed: (star: IStar) => void;
  removeStar: (starId: string) => void;
  changePriority: (star: IStar, priority: number) => void;
  dragged: IStar | undefined;
  setDragged: (star: IStar | undefined) => void;
}

const StarsTable = ({
  unpriotized,
  stars,
  setFeed,
  removeStar,
  changePriority,
  dragged,
  setDragged,
}: starProps) => {
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [assigneeFilter, setAssigneeFilter] = useState<string>('');
  const [versionFilter, setVersionFilter] = useState<string>('');
  const [resourceFilter, setResourceFilter] = useState<string>('');
  const [computerFilter, setComputerFilter] = useState<string>('');
  const [searchValue, setSearchValue] = useState('');

  const filtersData: filterDataType[] = [
    {
      tabName: 'status',
      filter: statusFilter,
      func: setStatusFilter,
    },
    {
      tabName: 'assignee',
      filter: assigneeFilter,
      func: setAssigneeFilter,
    },
    {
      tabName: 'version',
      filter: versionFilter,
      func: setVersionFilter,
    },
    {
      tabName: 'resource',
      filter: resourceFilter,
      func: setResourceFilter,
    },
    {
      tabName: 'computer',
      filter: computerFilter,
      func: setComputerFilter,
    },
  ];

  const getFilteredStars = () => {
    if (filtersData.every((f) => f.filter === '')) {
      return stars;
    }

    const filteredStars: IStar[] = [];
    stars.forEach((s) => {
      if ((s.name.includes(searchValue) || searchValue === '')
        && (statusFilter === '' || s.status === statusFilter)
        && (versionFilter === '' || s.version === versionFilter)
        && (assigneeFilter === '' || s.assignee === assigneeFilter)
        && (resourceFilter === '' || s.resources.includes(resourceFilter))
        && (computerFilter === '' || s.computer === computerFilter)) {
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
      if (unpriotized) changePriority(dragged, 0);
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
        filtersData={filtersData}
        setSearchValue={setSearchValue}
      />
      <div className="starsTable">
        {getFilteredStars()
          .sort((a: IStar, b: IStar) => a.priority - b.priority)
          .map((star: IStar) => (
            <StarRow
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
