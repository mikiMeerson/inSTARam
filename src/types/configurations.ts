import { ReactElement } from 'react';
import { IEvent, IStar } from './interfaces';
import { UserRole } from './string-types';

export interface StarKeyDisplayType {
  key: keyof IStar;
  display: string;
}

export const STAR_KEY_DISPLAY: StarKeyDisplayType[] = [
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
    key: 'contact',
    display: 'איש קשר',
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

export interface EventKeyDisplayType {
  key: keyof IEvent;
  display: string;
}

export const EVENT_KEY_DISPLAY: EventKeyDisplayType[] = [
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

export type LinkDisplayType = {
  display: string;
  link: string;
  role: UserRole;
};

export const pages: LinkDisplayType[] = [
  { display: 'סטארים', link: '/stars', role: 'viewer' },
  { display: 'אירועים', link: '/events', role: 'viewer' },
  { display: 'משתמשים', link: '/users', role: 'admin' },
];

export interface FilterDataType {
  tabName: string;
  filter: string[];
  func: (param: string[]) => void;
  chipColor:
    | 'default'
    | 'secondary'
    | 'primary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning';
}

export const EVENT_LISTS: (keyof IEvent)[] = [
  'generalSummary',
  'goals',
  'dataSources',
  'description',
  'findings',
  'notes',
  'conclusions',
];

export const EVENT_FLIGHT_DETAILS: (keyof IEvent)[] = [
  'assignee', 'team', 'reason',
];

export const ADDITIONAL_EVENT_DETAILS: (keyof IEvent)[] = [
  'callSign', 'areas', 'duration',
];

export interface FilterField {
  name: string;
  activation: string;
  displayName: string;
  icon: ReactElement<unknown>;
  isPrimary?: boolean;
  options?: string[];
}
