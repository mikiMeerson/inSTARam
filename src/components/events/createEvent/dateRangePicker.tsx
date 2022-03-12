import { Dialog } from '@mui/material';
import { DateRange } from 'react-date-range';

interface dateProps {
    isDatePick: boolean;
    setIsDatePick: (param: boolean) => void;
    currDates: Date[];
    setCurrDates: (param: Date[]) => void;
}
const DateRangePicker = ({
  isDatePick,
  setIsDatePick,
  currDates,
  setCurrDates,
} : dateProps) => (
  <Dialog
    dir="ltr"
    open={isDatePick}
    onClose={() => setIsDatePick(false)}
  >
    <DateRange
      editableDateInputs
      onChange={
          (item) => {
            if (item.selection.startDate && item.selection.endDate) {
              setCurrDates([item.selection.startDate, item.selection.endDate]);
            }
          }
      }
      moveRangeOnFirstSelection={false}
      ranges={[{
        startDate: currDates.length > 0 ? currDates[0] : new Date(),
        endDate: currDates.length > 0 ? currDates[1] : new Date(),
        key: 'selection',
      }]}
    />
  </Dialog>
);

export default DateRangePicker;
