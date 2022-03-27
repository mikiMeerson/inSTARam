import { Typography } from '@mui/material';
import { eventKeyDisplay, eventLists } from '../../../types/configurations';
import { IEvent } from '../../../types/interfaces';
import ListGenerator from '../../general/listGenerator';
import List from '../../general/list';

interface ListsProps {
    event: IEvent;
    editable: boolean;
    setAttr?: (attr: keyof IEvent, value: any) => void;
}

const EventLists = ({ event, setAttr, editable }: ListsProps) => (
  <>
    {eventLists.map((list) => (
      (editable && setAttr)
        ? (
          <ListGenerator
            header={
              eventKeyDisplay.find((k) => k.key === list)?.display || 'שגיאה'
            }
            attr={list as keyof IEvent}
            event={event}
            setCurrList={setAttr}
          />
        )
        : (
          <div key={list} className="eventDetails">
            <Typography variant="h6">
              {eventKeyDisplay.find((k) => k.key === list)?.display || 'שגיאה'}
            </Typography>
            <List
              list={event[list as keyof IEvent] as string[]}
              deletable={false}
            />
          </div>
        )
    ))}
  </>
);

export default EventLists;

EventLists.defaultProps = {
  setAttr: undefined,
};
