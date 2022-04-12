import { Typography } from '@mui/material';
import {
  CheckCircleOutlined,
  TextSnippetOutlined,
  OfflineBoltOutlined,
  PersonOutline,
  ComputerOutlined,
  StarOutline,
} from '@mui/icons-material';
import { IActivity } from '../../../types/interfaces';

interface Props {
  log: IActivity;
}

const actionToIcon = [
  {
    action: 'יצר/ה את הסטאר',
    icon: <StarOutline key={Math.random()} className="logIcon" />,
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

const ActivityItem = ({ log }: Props) => (
  <div className="activityItem">
    {actionToIcon
      .filter((action) => action.action === log.action)
      .map((action) => action.icon)}
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
      {log.value && (
      <span>
        {' '}
        ל
        <span className="logValue">{log.value}</span>
      </span>
      )}
    </Typography>
  </div>
);

export default ActivityItem;
