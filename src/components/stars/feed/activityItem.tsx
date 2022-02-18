import { Typography } from '@mui/material';
import {
  StarBorderOutlined,
  CheckCircleOutlined,
  TextSnippetOutlined,
  OfflineBoltOutlined,
  PersonOutline,
  ComputerOutlined,
} from '@mui/icons-material';

interface activityProps {
    log: IActivity;
}

const actionToIcon = [
  {
    action: 'יצר/ה את הסטאר',
    icon: <StarBorderOutlined key={Math.random()} className="logIcon" />,
  },
  {
    action: 'שינת/ה את הסטטוס',
    icon: <CheckCircleOutlined key={Math.random()} className="logIcon" />,
  },
  {
    action: 'הוסיפ/ה הערה חדשה',
    icon: <TextSnippetOutlined key={Math.random()} className="logIcon" />,
  },
  {
    action: 'שינת/ה את האחראי',
    icon: <PersonOutline key={Math.random()} className="logIcon" />,
  },
  {
    action: 'עדכנ/ה משאבים נדרשים',
    icon: <OfflineBoltOutlined key={Math.random()} className="logIcon" />,
  },
  {
    action: 'שינת/ה את המערכת',
    icon: <ComputerOutlined key={Math.random()} className="logIcon" />,
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
