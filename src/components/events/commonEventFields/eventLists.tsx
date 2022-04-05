import { Typography } from '@mui/material';
import { EVENT_KEY_DISPLAY, EVENT_LISTS } from '../../../types/configurations';
import { IEvent } from '../../../types/interfaces';
import ListGenerator from '../../general/listGenerator';
import List from '../../general/list';

interface Props {
    event: IEvent;
    editable: boolean;
    setAttr: (attr: keyof IEvent, value: IEvent[keyof IEvent]) => void;
}

const EventLists = ({ event, setAttr, editable }: Props) => (
  <>
    {EVENT_LISTS.map((list) => (
      (editable && setAttr)
        ? (
          <ListGenerator
            header={
              EVENT_KEY_DISPLAY.find((k) => k.key === list)?.display || 'שגיאה'
            }
            attr={list}
            event={event}
            setCurrList={setAttr}
          />
        )
        : (
          <div key={list} className="eventDetails">
            <Typography variant="h6">
              {EVENT_KEY_DISPLAY.find((k) => k.key === list)?.display
               || 'שגיאה'}
            </Typography>
            <List
              list={event[list] as string[]}
              deletable={false}
            />
          </div>
        )
    ))}
  </>
);

export default EventLists;
