export const statuses = ['פתוח', 'בעבודה', 'סגור'];
export const assignees = ['מאב', 'אינטגרציה', 'מנט', 'לצד', 'אמלח'];
export const severities = [
  'חמור מאוד (1)',
  'חמור (2)',
  'בינוני (3)',
  'קל (99)',
];
export const versions = ['ו רעם', 'ה רעם', 'ד רעם', 'ז בז', 'ו בז', 'ה בז'];
export const resources = ['STF', 'AIF', 'מודל UWI', 'מודל ASB', 'חימוש אמיתי'];
export const computers = ['AAA', 'BBB', 'CCC', 'DDD'];

export const severityColors = ['red', 'orange', 'yellow', 'green'];

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
