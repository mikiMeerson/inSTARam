export type starType = {
  priority: number;
  starNumber: number;
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
};

export const TableHeaderTabs = [
  {
    displayName: "עדיפות",
    width: "20px",
    isDropDown: false
  },
  {
    displayName: "שם",
    width: "100px",
    isDropDown: true
  },
  {
    displayName: "סטטוס",
    width: "20px",
    isDropDown: true
  },
  {
    displayName: "אחראי",
    width: "60px",
    isDropDown: true
  },
  {
    displayName: "תאריך",
    width: "70px",
    isDropDown: true
  },
  {
    displayName: "בלוק",
    width: "50px",
    isDropDown: true
  },
];

export const starExample: starType = {
  priority: 1,
  starNumber: 33,
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
};

export type commentType = {
  publisher: string;
  comment: string;
  replies?: commentType[];
};

export const notesExample: commentType[] = [
  {
    publisher: "לודה - לצד",
    comment:
      "תיאור של דיון הסטארים לאחר גיחת בלוק ו שבו הגענו לכל מיני מסקנות על זה שמאב צריכים מעבדה",
    replies: [
      {
        publisher: "אריאל - מאב",
        comment: "זה ממש נכון אנחנו באמת צריכים ימי מעבדה",
      },
      {
        publisher: "יונתן - אמלח",
        comment:
          "אני אישית חושב שמאב צריכים לקבל את כל זמן המעבדה בעולם העיקר שלא יפסיקו לעבוד לרגע",
      },
    ],
  },
  {
    publisher: "אריאל - מאב",
    comment: "לא רלוונטי פתרתי הכל לבד עוד לפני הגיחה",
  },
];

export type activityLogType = {
  publisher: string;
  action: string;
  value?: string
};

export const activityLogExample: activityLogType[] = [
  {
    publisher: "גדות - מאב",
    action: "יצר את הסטאר"
  },
  {
    publisher: "ינון - מאב",
    action: "שינה את הסטטוס",
    value: "בתהליך"
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
    value: "סגור"
  },
];
