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
              setDates([
                item.selection.startDate.toString(),
                item.selection.endDate.toString(),
              ]);
            }
          }
      }
      moveRangeOnFirstSelection={false}
      ranges={[{
        startDate: dates.length > 0 ? new Date(dates[0]) : new Date(),
        endDate: dates.length > 0 ? new Date(dates[1]) : new Date(),
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

export default DateRangePicker;
