export const statuses = ['פתוח', 'בעבודה', 'סגור'];
export const assignees = ['מאב', 'אינטגרציה', 'מנט', 'לצד', 'אמלח'];
export const severities = ['חמור מאוד', 'חמור', 'בינוני', 'קל'];
export const versions = ['ו רעם', 'ה רעם', 'ד רעם', 'ז בז', 'ו בז', 'ה בז'];
export const resources = ['STF', 'AIF', 'מודל UWI', 'מודל ASB', 'חימוש אמיתי'];
export const computers = ['AAA', 'BBB', 'CCC', 'DDD'];

export const severityColors = ['red', 'orange', 'yellow', 'green'];

export type noteType = {
  id: string;
  publisher: string;
  note: string;
  time: Date;
  repliesTo?: number;
};

export type activityLogType = {
  publisher: string;
  action: string;
  time: Date;
  value?: string;
};

export type starType = {
  id: string;
  priority: number;
  severity: number;
  name: string;
  status: string;
  assignee: string;
  date: string;
  version: string;
  publisher: string;
  event: string;
  resources: string[];
  desc: string;
  computer: string;
  notes: noteType[];
  activity: activityLogType[];
};

export const defaultStar: IStar = {
  _id: '',
  priority: 0,
  severity: 0,
  name: '',
  assignee: '',
  status: '',
  version: '',
  desc: '',
  event: '',
  publisher: '',
  resources: [],
  computer: '',
};

export interface filterDataType {
  tabName: string;
  filter: string;
  func: (param: string) => void;
}
