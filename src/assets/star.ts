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

export const starExample: starType = {
  priority: 1,
  starNumber: 33,
  name: "הצמדת יעף לא עובדת",
  status: "פתוח",
  assignee: "מאב",
  date: "10/01/2021",
  version: "בלוק ו רעם",
  publisher: "גדות - מאב",
  event: "גיחת ניסוי בלוק ו רעם",
  resources: ["AIF", "חימוש אמיתי"],
  desc: "הצמדת יעף עובדת בצורה לא דטרמיניסטית ממסכים שונים. כשההצמדה עובדת היעף מנצנץ ב-BM בניגוד לאפיון",
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
