import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';
import { Dialog } from '@mui/material';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface FilterProps {
    isDatePick: boolean;
    setIsDatePick: (param: boolean) => void;
}
const DateRangePicker = ({ isDatePick, setIsDatePick }: FilterProps) => (
  <Dialog
    dir="ltr"
    open={isDatePick}
    onClose={() => setIsDatePick(false)}
  >
    <DateRange
      editableDateInputs
      onChange={(item) => console.log(item)}
      moveRangeOnFirstSelection={false}
      ranges={[{
        startDate: new Date(),
        endDate: addDays(new Date(), 3),
        key: 'selection',
      }]}
    />
  </Dialog>
);

export default DateRangePicker;
