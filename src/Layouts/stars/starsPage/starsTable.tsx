import { BaseSyntheticEvent, useState } from 'react';
import StarRow from './starRow';
import { starType, filterDataType } from '../../../assets/star';
import FiltersHeader from './filtersHeader';

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

    const filteredStars: starType[] = [];
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
      const maxPri = stars
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
          .sort((a: starType, b: starType) => a.priority - b.priority)
          .map((star: starType) => (
            <StarRow
              key={star.id}
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
