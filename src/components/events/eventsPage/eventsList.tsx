import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { StatusCodes } from 'http-status-codes';
import DialogAlert from '../../general/dialogAlert';
import FilterHeaders from '../filters/filterHeaders';
import SearchBar from '../filters/searchBar';
import EventCard from './eventCard';
import { FilterDataType } from '../../../types/configurations';
import { IEvent } from '../../../types/interfaces';
import { getStars } from '../../../services/star-service';
import { deleteEvent } from '../../../services/event-service';
import { UserRole } from '../../../types/string-types';

interface Props {
    events: IEvent[];
    setEvents: (events: IEvent[]) => void;
    userRole: UserRole;
    handleAlert: (isSuccess: boolean, content: string) => void;
}

const EventsList = ({ events, setEvents, userRole, handleAlert }: Props) => {
  const getExistingFilters = (filterName: string) => {
    const existingFilter = localStorage.getItem(`events ${filterName} `);
    return existingFilter ? JSON.parse(existingFilter) : [];
  };

  const [filteredEvents, setFilteredEvents] = useState<IEvent[]>([]);
  const [deleteError, setDeleteError] = useState<boolean>(false);
  const [nameSearch, setNameSearch] = useState<string>('');
  const [platformFilter, setPlatformFilter] = useState<string[]>(
    getExistingFilters('platform'),
  );
  const [blockFilter, setBlockFilter] = useState<string[]>(
    getExistingFilters('block'),
  );
  const [assigneeFilter, setAssigneeFilter] = useState<string>('');

  useEffect(() => {
    const tempFilteredEvents: IEvent[] = [];
    events.forEach((e) => {
      if ((nameSearch === '' || e.name.includes(nameSearch))
        && (platformFilter.length === 0 || platformFilter.includes(e.platform))
        && (blockFilter.length === 0 || blockFilter.includes(e.block))
        && (assigneeFilter === ''
          || (e.assignee && e.assignee.includes(assigneeFilter)))) {
        tempFilteredEvents.push(e);
      }
    });
    setFilteredEvents(tempFilteredEvents);
  }, [events, assigneeFilter, blockFilter, nameSearch, platformFilter]);

  const filtersData: FilterDataType[] = [
    {
      tabName: 'platform',
      filter: platformFilter,
      func: setPlatformFilter,
      chipColor: 'primary',
    },
    {
      tabName: 'block',
      filter: blockFilter,
      func: setBlockFilter,
      chipColor: 'secondary',
    },
  ];

  const checkAttachedStars = async (event: IEvent) => {
    const { status, data } = await getStars();
    if (status !== StatusCodes.OK) return true; // !should be another error
    const attachedStars = data.stars.filter((s) => s.event === event._id);
    return attachedStars.length;
  };

  const handleDeleteEvent = async (event: IEvent) => {
    if (await checkAttachedStars(event)) {
      setDeleteError(true);
    } else {
      const { status, data } = await deleteEvent(event._id);
      if (status !== StatusCodes.OK) {
        handleAlert(false, 'לא הצלחנו למחוק את האירוע');
      } else {
        handleAlert(true, 'האירוע נמחק בהצלחה');
        setEvents(data.events);
      }
    }
  };

  const sortByDate = (events: IEvent[]) => events
    .sort((a: IEvent, b: IEvent) => {
      if (a.dates[1] < b.dates[1]) return 1;
      if (a.dates[1] > b.dates[1]) return -1;
      if (a.dates[0] < b.dates[0]) return 1;
      if (a.dates[0] > b.dates[0]) return -1;
      return 0;
    });

  return (
    <>
      <FilterHeaders
        filtersData={filtersData}
        assigneeFilter={assigneeFilter}
        setAssigneeFilter={setAssigneeFilter}
      />
      <SearchBar events={events} setSearch={setNameSearch} />
      <Grid container className="eventsList">
        {sortByDate(filteredEvents).map((e) => (
          <Grid key={e._id} className="cardContainer" item xs={3}>
            <EventCard
              event={e}
              handleDeleteEvent={handleDeleteEvent}
              userRole={userRole}
            />
          </Grid>
        ))}
      </Grid>
      <DialogAlert
        header="שגיאה!"
        content="לא ניתן למחוק אירוע כאשר משויכים אליו סטארים"
        isOpen={deleteError}
        setIsOpen={setDeleteError}
        activateResponse={undefined}
      />
    </>
  );
};

export default EventsList;
