import { Dialog, DialogActions, Button } from '@mui/material';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface dateProps {
    isDatePick: boolean;
    setIsDatePick: (param: boolean) => void;
    dates: string[];
    setDates: (param: string[]) => void;
}
const DateRangePicker = ({
  isDatePick,
  setIsDatePick,
  dates,
  setDates,
} : dateProps) => {
  const [sd, ed] = dates.length
    ? [new Date(dates[0]), new Date(dates[1])]
    : [new Array(2).fill(new Date())];

  return (
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
              setDates([
                item.selection.startDate.toString(),
                item.selection.endDate.toString(),
              ]);
            }
          }
      }
        moveRangeOnFirstSelection={false}
        ranges={[{
          startDate: sd as Date,
          endDate: ed as Date,
          key: 'selection',
        }]}
      />
      <DialogActions>
        <Button
          variant="contained"
          fullWidth
          onClick={() => setIsDatePick(false)}
        >
          אישור
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DateRangePicker;
