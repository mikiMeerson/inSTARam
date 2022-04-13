import { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { StatusCodes } from 'http-status-codes';
import DialogAlert from '../../general/dialogAlert';
import FilterHeaders from '../filters/filterHeaders';
import SearchBar from '../filters/searchBar';
import EventCard from './eventCard';
import { FilterDataType } from '../../../types/configurations';
import { IEvent } from '../../../types/interfaces';
import { getStarsByEvent } from '../../../services/star-service';
import { deleteEvent } from '../../../services/event-service';
import { UserRole, PlatformType } from '../../../types/string-types';

interface Props {
    events: IEvent[];
    setEvents: (events: IEvent[]) => void;
    userRole: UserRole;
    handleAlert: (isSuccess: boolean, content: string) => void;
    platformToShow: PlatformType;
}

const EventsList = ({
  events,
  setEvents,
  userRole,
  handleAlert,
  platformToShow,
}: Props) => {
  const getExistingFilters = (filterName: string) => {
    const existingFilter = localStorage.getItem(`events ${filterName} `);
    return existingFilter ? JSON.parse(existingFilter) : [];
  };

  const [filteredEvents, setFilteredEvents] = useState<IEvent[]>([]);
  const [deleteError, setDeleteError] = useState<boolean>(false);
  const [nameSearch, setNameSearch] = useState<string>('');
  const [platformFilter, setPlatformFilter] = useState<string[]>(
    [platformToShow],
  );
  const [blockFilter, setBlockFilter] = useState<string[]>(
    getExistingFilters('block'),
  );
  const [assigneeFilter, setAssigneeFilter] = useState<string>('');

  useEffect(() => {
    const tempFilteredEvents: IEvent[] = [];
    events.forEach((event) => {
      if ((nameSearch === '' || event.name.includes(nameSearch))
        && (platformFilter.length === 0
          || platformFilter.includes(event.platform))
        && (blockFilter.length === 0 || blockFilter.includes(event.block))
        && (assigneeFilter === ''
          || (event.assignee && event.assignee.includes(assigneeFilter)))) {
        tempFilteredEvents.push(event);
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
    const { status, data } = await getStarsByEvent(event._id);
    if (status !== StatusCodes.OK) return true; // !should be another error
    return data.stars.length;
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
    .sort((event1, event2) => {
      if (event1.dates[1] < event2.dates[1]) return 1;
      if (event1.dates[1] > event2.dates[1]) return -1;
      if (event1.dates[0] < event2.dates[0]) return 1;
      if (event1.dates[0] > event2.dates[0]) return -1;
      return 0;
    });

  return (
    <>
      <FilterHeaders {... { filtersData, assigneeFilter, setAssigneeFilter }} />
      <SearchBar
        list={events}
        setSearch={setNameSearch}
        placeholder="חפש לפי שם האירוע"
      />
      {filteredEvents.length === 0 && (
      <div style={{ textAlign: 'center' }}>
        <Typography variant="caption">
          לא נמצאו אירועים
        </Typography>
      </div>
      )}
      <Grid container className="eventsList">
        {sortByDate(filteredEvents).map((event) => (
          <Grid key={event._id} className="cardContainer" item xs={3}>
            <EventCard {... { event, handleDeleteEvent, userRole }} />
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
