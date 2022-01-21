import { Typography, Card, CardContent } from '@mui/material';
import { activityLogType } from '../../../assets/star';

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
  return (
    <div className="feedSection">
      <Typography variant="h5" paddingBottom="10px">
        פעילות
      </Typography>
      {activity.map((log: activityLogType) => (
        <Card
          sx={{
            height: '50px',
            margin: '10px',
            border: '1px solid silver',
            borderRadius: '2px',
          }}
        >
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              <span>{log.publisher}</span>
              <span>
                {' '}
                {log.action}
              </span>
              <span style={{ display: log.value ? '' : 'none' }}>
                {' '}
                ל-
                {log.value}
              </span>
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StarActivity;
