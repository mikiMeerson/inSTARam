import { useState } from 'react';
import { StatusCodes } from 'http-status-codes';
import { Typography } from '@mui/material';
import { EVENT_KEY_DISPLAY, EVENT_LISTS } from '../../../types/configurations';
import { IEvent } from '../../../types/interfaces';
import ListGenerator from '../../general/listGenerator';
import List from '../../general/list';
import AddStar from '../../stars/starsPage/addStar';
import { addStar } from '../../../services/star-service';

interface Props {
    event: IEvent;
    editable: boolean;
    setAttr: (attr: keyof IEvent, value: IEvent[keyof IEvent]) => void;
    handleAlert?: (isSuccess: boolean, content: string) => void;
}

const EventLists = ({ event, setAttr, editable, handleAlert }: Props) => {
  const [openAddStar, setOpenAddStar] = useState<boolean>(false);
  const [findingToGenerate, setFindingToGenerate] = useState<string>('');

  const generateStar = (finding: string) => {
    setFindingToGenerate(finding);
    setOpenAddStar(true);
  };

  const handleAddStar = async (formData: any): Promise<void> => {
    setFindingToGenerate('');
    formData.publisher = localStorage.getItem('userDisplay') || 'אנונימי';
    const { status } = await addStar(formData);
    handleAlert && handleAlert(
      status === StatusCodes.CREATED,
      status === StatusCodes.CREATED
        ? 'הסטאר נוצר בהצלחה!' : 'שגיאה! לא הצלחנו ליצור את הסטאר',
    );
  };

  return (
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
              {list === 'findings'
                ? (
                  <List
                    list={event[list] as string[]}
                    generateStar={generateStar}
                  />
                )
                : <List list={event[list] as string[]} />}
            </div>
          )
      ))}
      <AddStar
        isOpen={openAddStar}
        toggleModal={setOpenAddStar}
        addStar={handleAddStar}
        platformToShow={event.platform}
        defaultName={findingToGenerate}
        defaultBlock={event.block}
        defaultEventId={event._id}
      />
    </>
  );
};

export default EventLists;

EventLists.defaultProps = {
  handleAlert: undefined,
};
