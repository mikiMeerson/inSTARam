import { Typography } from '@mui/material';
import {
  StarBorderOutlined,
  CheckCircleOutlined,
  TextSnippetOutlined,
  OfflineBoltOutlined,
  PersonOutline,
} from '@mui/icons-material';

interface activityProps {
    log: IActivity;
}

const actionToIcon = [
  {
    action: 'יצר/ה את הסטאר',
    icon: <StarBorderOutlined className="logIcon" />,
  },
  {
    action: 'שינת/ה את הסטטוס',
    icon: <CheckCircleOutlined className="logIcon" />,
  },
  {
    action: 'הוסיפ/ה הערה חדשה',
    icon: <TextSnippetOutlined className="logIcon" />,
  },
  {
    action: 'שינת/ה את האחראי',
    icon: <PersonOutline className="logIcon" />,
  },
  {
    action: 'הוסיפ/ה משאבים נדרשים',
    icon: <OfflineBoltOutlined className="logIcon" />,
  },
];

const ActivityItem = ({ log }: activityProps) => (
  <div className="activityItem">
    {actionToIcon.filter((a) => a.action === log.action).map((e) => e.icon)}
    <Typography
      sx={{ fontSize: 14 }}
      color="text.secondary"
      gutterBottom
    >
      <span className="logPublisher">{log.publisher}</span>
      <span>
        {' '}
        {log.action}
      </span>
      <span style={{ display: log.value ? '' : 'none' }}>
        {' '}
        ל
        <span className="logValue">{log.value}</span>
      </span>
    </Typography>
  </div>
);

export default ActivityItem;
