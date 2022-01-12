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
}

export const starExample: starType = {
    priority: 1,
    starNumber: 33,
    name: "הצמדת יעף לא עובדת",
    status: "פתוח",
    assignee: "מאב",
    date: "10/01/2021",
    version: "בלוק ו רעם",
    publisher: "נועם - מאב",
    event: "גיחת ניסוי בלוק ו רעם",
    resources: ["AIF", "חימוש אמיתי"],
    desc: "הצמדת יעף עובדת בצורה לא דטרמיניסטית ממסכים שונים. כשההצמדה עובדת היעף מנצנץ ב-BM בניגוד לאפיון",
    computer: "VHSIC"
}