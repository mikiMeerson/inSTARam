import { Typography } from '@mui/material';
import { IActivity } from '../../../types/interfaces';
import ActivityItem from './activityItem';

interface Props {
  activity: IActivity[];
}

const StarActivity = ({ activity }: Props) => {
  if (activity.length === 0) {
    return (
      <div className="feedSection" id="activity">
        <Typography variant="caption">
          לא נעשתה פעילות בסטאר זה
        </Typography>
      </div>
    );
  }

  const getDisplayDate = (time: Date) => {
    const displayDate = `${time.getFullYear()} 
          ${time.getDate()} 
          ${time.toLocaleString('default', { month: 'long' })}`;
    return displayDate || '';
  };

  const activityDates = activity
    .map((log) => (
      log.createdAt ? getDisplayDate(new Date(log.createdAt)) : ''
    ))
    .reduce((allDates, date, i, array) => {
      array.indexOf(date) === i && allDates.push(new Date(date));
      return allDates;
    }, [] as Date[])
    .sort((a, b) => b.getTime() - a.getTime());

  return (
    <div className="feedSection" id="activity">
      <Typography variant="h5" paddingBottom="10px">
        פעילות
      </Typography>
      <div style={{ height: '80%', overflowY: 'scroll' }}>
        {activityDates.map((currDate) => (
          <div style={{ textAlign: 'right' }} key={currDate.getTime()}>
            <Typography variant="caption">
              {getDisplayDate(currDate)}
            </Typography>
            {
              activity.filter((log) => log.createdAt && new Date(
                getDisplayDate(new Date(log.createdAt)),
              ).getTime() === currDate.getTime())
                .map((log: IActivity) => (
                  <ActivityItem key={log._id} {... { log }} />
                ))
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default StarActivity;
