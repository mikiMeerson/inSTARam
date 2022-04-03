import { useEffect, useState } from 'react';
import { StatusCodes } from 'http-status-codes';
import { Link } from 'react-router-dom';
import {
  Box,
  CircularProgress,
  Grid,
  SpeedDial,
  Typography,
  SpeedDialIcon,
} from '@mui/material';
import { FlightTakeoffOutlined } from '@mui/icons-material';
import { deleteEvent, getEvents } from '../../../services/event-service';
import EventCard from './eventCard';
import '../styles/event.css';
import { IEvent } from '../../../types/interfaces';
import { UserRole } from '../../../types/string-types';
import DialogAlert from '../../general/dialogAlert';
import { getStars } from '../../../services/star-service';
import SearchBar from '../filters/searchBar';
import FilterHeaders from '../filters/filterHeaders';
import { FilterDataType } from '../../../types/configurations';

interface Props {
  userRole: UserRole;
  handleAlert: (isSuccess: boolean, content: string) => void;
}

const EventsMain = ({ userRole, handleAlert }: Props) => {
  const getExistingFilters = (filterName: string) => {
    const existingFilter = localStorage.getItem(`events ${filterName} `);
    return existingFilter ? JSON.parse(existingFilter) : [];
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [events, setEvents] = useState<IEvent[]>([]);
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
  const [dateFilter, setDateFilter] = useState<string[]>(
    getExistingFilters('date'),
  );

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
    {
      tabName: 'date',
      filter: dateFilter,
      func: setDateFilter,
      chipColor: 'warning',
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

  useEffect(() => {
    const fetchEvents = async (): Promise<void> => {
      setLoading(true);
      const { data } = await getEvents();
      setEvents(data.events);
      setLoading(false);
    };
    if (events.length === 0) fetchEvents();

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
  }, [
    assigneeFilter,
    blockFilter,
    dateFilter,
    events,
    nameSearch,
    platformFilter,
  ]);

  return (
    <div className="events">
      {loading && (
      <Box sx={{
        position: 'absolute', top: '50%', right: '50%', zIndex: 1,
      }}
      >
        <CircularProgress size="100px" />
      </Box>
      )}
      <div className="eventsHeader">
        <Typography variant="h1">
          אירועים
        </Typography>
        { userRole !== 'viewer' && (
        <Link to="create">
          <SpeedDial
            ariaLabel="SpeedDial controlled open example"
            icon={<SpeedDialIcon openIcon={<FlightTakeoffOutlined />} />}
          />
        </Link>
        )}
      </div>
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
    </div>
  );
};

export default EventsMain;
