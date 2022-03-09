import { DateRange } from 'react-date-range';
import { Dialog } from '@mui/material';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useEffect, useState } from 'react';
import { filterDataType } from '../../../../assets';

interface FilterProps {
    isDatePick: boolean;
    setIsDatePick: (param: boolean) => void;
    filtersData: filterDataType[];
}
const DateRangePicker = ({
  isDatePick,
  setIsDatePick,
  filtersData,
}: FilterProps) => {
  const [dateFilter, setDateFilter] = useState<filterDataType>();
  const [currentDates, setCurrentDates] = useState<string[]>([
    new Date().toString(), new Date().toString(),
  ]);

  useEffect(() => {
    setDateFilter(filtersData.find((f) => f.tabName === 'date'));
    if (dateFilter) {
      setCurrentDates([
        dateFilter.filter[0] || new Date().toString(),
        dateFilter.filter[1] || new Date().toString(),
      ]);
    }
  }, [dateFilter, filtersData]);

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
          console.log(item);
          if (item.selection.startDate
            && item.selection.endDate
            && dateFilter) {
            dateFilter.func([
              item.selection.startDate.toString(),
              item.selection.endDate.toString(),
            ]);
          }
        }
      }
        moveRangeOnFirstSelection={false}
        ranges={[{
          startDate: new Date(currentDates[0]),
          endDate: new Date(currentDates[1]),
          key: 'selection',
        }]}
      />
    </Dialog>
  );
};

export default DateRangePicker;
