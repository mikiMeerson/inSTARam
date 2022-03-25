import { IEvent, IStar } from './interfaces';
import { userRole } from './string-types';

export interface starKeyDisplayType {
    key: keyof IStar;
    display: string;
  }

export const starKeyDisplay: starKeyDisplayType[] = [
  {
    key: 'priority',
    display: 'עדיפות',
  },
  {
    key: 'severity',
    display: 'חומרה',
  },
  {
    key: 'name',
    display: 'שם הסטאר',
  },
  {
    key: 'status',
    display: 'סטטוס',
  },
  {
    key: 'assignee',
    display: 'אחראי',
  },
  {
    key: 'publisher',
    display: 'הועלה על ידי',
  },
  {
    key: 'event',
    display: 'אירוע',
  },
  {
    key: 'resources',
    display: 'משאבים נדרשים',
  },
  {
    key: 'platform',
    display: 'פלטפורמה',
  },
  {
    key: 'block',
    display: 'בלוק',
  },
  {
    key: 'desc',
    display: 'תיאור',
  },
  {
    key: 'computer',
    display: 'מחשב',
  },
  {
    key: 'createdAt',
    display: 'זמן יצירה',
  },
];

export interface eventKeyDisplayType {
    key: keyof IEvent;
    display: string;
  }

export const eventKeyDisplay: eventKeyDisplayType[] = [
  {
    key: 'name',
    display: 'שם האירוע',
  },
  {
    key: 'type',
    display: 'סוג האירוע',
  },
  {
    key: 'assignee',
    display: 'גוף מבצע',
  },
  {
    key: 'publisher',
    display: 'הועלה על ידי',
  },
  {
    key: 'platform',
    display: 'פלטפורמה',
  },
  {
    key: 'block',
    display: 'בלוק',
  },
  {
    key: 'reason',
    display: 'מטס',
  },
  {
    key: 'team',
    display: 'צוות',
  },
  {
    key: 'dates',
    display: 'תאריכים',
  },
  {
    key: 'callSign',
    display: 'אות קריאה',
  },
  {
    key: 'areas',
    display: 'אזורים',
  },
  {
    key: 'duration',
    display: 'משך',
  },
  {
    key: 'generalSummary',
    display: 'תיאור כללי',
  },
  {
    key: 'goals',
    display: 'מטרות',
  },
  {
    key: 'dataSources',
    display: 'אמצעי איסוף נתונים',
  },
  {
    key: 'configuration',
    display: 'תצורה',
  },
  {
    key: 'description',
    display: 'מהלך הניסוי',
  },
  {
    key: 'findings',
    display: 'ממצאים',
  },
  {
    key: 'notes',
    display: 'הערות',
  },
  {
    key: 'conclusions',
    display: 'מסקנות, המלצות ומטלות',
  },
];

export const activityInfoArray = [
  {
    name: 'star',
    action: 'יצר/ה את הסטאר',
    isValue: false,
  },
  {
    name: 'status',
    action: 'שינת/ה את הסטטוס',
    isValue: true,
  },
  {
    name: 'note',
    action: 'הוסיפ/ה הערה חדשה',
    isValue: false,
  },
  {
    name: 'assignee',
    action: 'שינת/ה את האחראי',
    isValue: true,
  },
  {
    name: 'resources',
    action: 'עדכנ/ה משאבים נדרשים',
    isValue: false,
  },
  {
    name: 'computer',
    action: 'שינת/ה את המערכת',
    isValue: true,
  },
];

export type linkDisplayType = {
    display: string;
    link: string;
    role: userRole;
  }

export const pages: linkDisplayType[] = [
  { display: 'סטארים', link: '/stars', role: 'viewer' },
  { display: 'אירועים', link: '/events', role: 'viewer' },
  { display: 'משתמשים', link: '/users', role: 'admin' },
];

export interface filterDataType {
    tabName: string;
    filter: string[];
    func: (param: string[]) => void;
    chipColor: 'default'
    | 'secondary'
    | 'primary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning',
  }
