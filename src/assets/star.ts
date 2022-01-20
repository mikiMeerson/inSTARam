export const statuses = ["פתוח", "בעבודה", "סגור"];
export const assignees = ["מאב", "אינטגרציה", "מנט", "לצד", "אמלח"];
export const severities = ["חמור מאוד", "חמור", "בינוני", "קל"];
export const versions = ["ו רעם", "ה רעם", "ד רעם", "ז בז", "ו בז", "ה בז"];
export const resources = ["STF", "AIF", "מודל UWI", "מודל ASB", "חימוש אמיתי"];
export const computers = ["AAA", "BBB", "CCC", "DDD"];

export type noteType = {
  id: number;
  publisher: string;
  note: string;
  time: Date;
  repliesTo?: number;
};

export type activityLogType = {
  publisher: string;
  action: string;
  value?: string;
};

export type starType = {
  id: number;
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

export const starList: starType[] = [
  {
    id: 1,
    priority: 1,
    severity: 1,
    name: "מוצגות סולמיות במקום זמן",
    status: "פתוח",
    assignee: "מאב",
    date: "10/01/2021",
    version: "בלוק ו רעם",
    publisher: "גדות - מאב",
    event: "גיחת ניסוי בלוק ו רעם",
    resources: ["AIF", "חימוש אמיתי"],
    desc: "במסך מסוים אמור להיות מוצג זמן ובמקום הזמן מוצגות סולמיות וזה מאוד מכעיס ולא בסדר",
    computer: "VHSIC",
    notes: [
      {
        id: 1,
        publisher: "לודה - לצד",
        note: "תיאור של דיון הסטארים לאחר גיחת בלוק ו שבו הגענו לכל מיני מסקנות על זה שמאב צריכים מעבדה",
        time: new Date(),
      },
      {
        id: 2,
        publisher: "אריאל - מאב",
        note: "לא רלוונטי פתרתי הכל לבד עוד לפני הגיחה",
        time: new Date(),
      },
      {
        id: 3,
        publisher: "אריאל - מאב",
        note: "זה ממש נכון אנחנו באמת צריכים ימי מעבדה",
        time: new Date(),
        repliesTo: 1,
      },
      {
        id: 4,
        publisher: "יונתן - אמלח",
        note: "אני אישית חושב שמאב צריכים לקבל את כל זמן המעבדה בעולם העיקר שלא יפסיקו לעבוד לרגע",
        time: new Date(),
        repliesTo: 1,
      },
    ],
    activity: [],
  },
  {
    id: 2,
    priority: 2,
    severity: 1,
    name: "סטטוסים מוצגים בניגוד לאפיון",
    status: "סגור",
    assignee: "מאב",
    date: "09/11/2017",
    version: "בלוק ה רעם",
    publisher: "אבישי - מאב",
    event: "אינטגרציה עם רפאל",
    resources: ["AIF"],
    desc: "במסכים שונים מוצגים סטטוסים שונים",
    computer: "AIU",
    notes: [],
    activity: [
      {
        publisher: "גדות - מאב",
        action: "יצר את הסטאר",
      },
      {
        publisher: "ינון - מאב",
        action: "שינה את הסטטוס",
        value: "בתהליך",
      },
      {
        publisher: "לודה - לצד",
        action: "הוסיפה הערה חדשה",
      },
      {
        publisher: "אריאל - מאב",
        action: "הוסיף הערה חדשה",
      },
      {
        publisher: "אריאל - מאב",
        action: "שינה את הסטטוס",
        value: "סגור",
      },
    ],
  },
  {
    id: 3,
    priority: 3,
    severity: 2,
    name: "תקלת מחשב חימוש",
    status: "פתוח",
    assignee: "אינטגרציה",
    date: "13/10/2021",
    version: "בלוק ו רעם",
    publisher: "זוהר - אינטגרציה",
    event: "אינטגרציה עם רפאל",
    resources: ["AIF", "צמות חדשות"],
    desc: "בעקבות צמות תקולות מופיע תקלה במחשב שלא מאפשרת פעולות שונות",
    computer: "PACS",
    notes: [],
    activity: [],
  },
  {
    id: 4,
    priority: 4,
    severity: 3,
    name: "תצוגה מנצנצת",
    status: "פתוח",
    assignee: "מאב",
    date: "07/07/2019",
    version: "בלוק ו רעם",
    publisher: "אריאל - מאב",
    event: "גיחת ניסוי",
    resources: [],
    desc: "דליפת זיכרון גורמת לריצוד מסכים",
    computer: "VHSIC",
    notes: [],
    activity: [],
  },
  {
    id: 5,
    priority: 0,
    severity: 4,
    name: "בעיות עומסים",
    status: "סגור",
    assignee: "מאב",
    date: "18/10/2018",
    version: "בלוק ה רעם",
    publisher: "איתן - מאב",
    event: "",
    resources: ["AIF", "חימוש אמיתי"],
    desc: "עומסי תקשורת וזיכרון",
    computer: "VHSIC",
    notes: [],
    activity: [],
  },
  {
    id: 6,
    priority: 0,
    severity: 2,
    name: "אין מטרה ראשית",
    status: "בעבודה",
    assignee: "מאב",
    date: "02/02/2020",
    version: "בלוק ו רעם",
    publisher: "יונתן - אמלח",
    event: "גיחת ניסוי",
    resources: [],
    desc: "",
    computer: "",
    notes: [],
    activity: [],
  },
];

export const defaultStar: starType = {
  id: 0,
  priority: 0,
  severity: 0,
  name: "",
  status: "",
  assignee: "",
  date: "",
  version: "",
  publisher: "",
  event: "",
  resources: [],
  desc: "",
  computer: "",
  notes: [],
  activity: [],
};
