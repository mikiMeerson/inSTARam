export enum STATUSES {
  CLOSED = 'סגור',
  IN_PROGRESS = 'בעבודה',
  TESTING = 'ממתין לבדיקה',
  OPEN = 'פתוח'
}

export enum ASSIGNEES {
  AMLH = 'אמלח',
  LZD = 'לצד',
  MNT = 'מנט',
  INT = 'אינטגרציה',
  MAAV = 'מאב',
}

export enum SEVERITIES {
  VERY_SERIOUS = 'חמור מאוד (1)',
  SERIOUS = 'חמור (2)',
  MEDIUM = 'בינוני (3)',
  SLIGHT = 'קל (99)',
}

export enum VERSIONS {
  RAAM_D = 'ד רעם',
  RAAM_E = 'ה רעם',
  RAAM_F = 'ו רעם',
  BAZ_E = 'ה בז',
  BAZ_F = 'ו בז',
  BAZ_G = 'ז בז'
}

export enum RESOURCES {
  STF = 'STF',
  AIF = 'AIF',
  UWI_MODEL = 'מודל UWI',
  ASB_MODEL = 'מודל ASB',
  REAL_WEAPON = 'חימוש אמיתי',
}

export enum COMPUTERS {
  AAA = 'AAA',
  BBB = 'BBB',
  CCC = 'CCC',
  DDD = 'DDD',
}

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
    key: 'version',
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
