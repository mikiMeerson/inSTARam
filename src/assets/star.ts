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
}
