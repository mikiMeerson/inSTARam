import { Typography } from '@mui/material';
import { activityLogType } from '../../../assets/star';
import ActivityItem from './activityItem';

interface activityProps {
  activity: activityLogType[];
}

const StarActivity = ({ activity }: activityProps) => {
  if (activity.length === 0) {
    return (
      <div className="feedSection">
        <Typography variant="caption">
          לא נעשתה פעילות בסטאר זה
        </Typography>
      </div>
    );
  }

  const activityDates = activity
    .map((log) => log.time).map((date) => date.getTime())
    .filter((date, i, array) => array.indexOf(date) === i)
    .map((time) => new Date(time));

  return (
    <div className="feedSection">
      <Typography variant="h5" paddingBottom="10px">
        פעילות
      </Typography>
      <div style={{ height: '80%', overflowY: 'scroll' }}>
        {activityDates.map((currDate) => (
          <div style={{ textAlign: 'right' }}>
            <Typography variant="caption">
              {`${currDate.getFullYear()} 
              ${currDate.getDate()} 
              ${currDate.toLocaleString('default', { month: 'long' })}`}
            </Typography>
            {
              activity.filter(
                (log) => log.time.getTime() === currDate.getTime(),
              )
                .map((log: activityLogType) => (
                  <ActivityItem log={log} />
                ))
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default StarActivity;
