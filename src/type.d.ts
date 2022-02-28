// This might change based on backend's updates,
// and might break the code here if not updated as well.
// Maybe you can export this to a mutual package that
// frontend and backend can use together? I don't really know
// a solution but this might be one.
type userRole = 'viewer' | 'editor' | 'admin';
type orderType = 'desc' | 'asc';

type linkDisplayType = {
    display: string;
    link: string;
    role: userRole;
}

interface IStar {
    _id: string;
    priority: number;
    severity: SEVERITIES;
    name: string;
    status: STATUSES;
    assignee: ASSIGNEES;
    version: VERSIONS;
    publisher: string;
    event: string;
    resources: string[];
    desc: string;
    computer?: string;
    createdAt?: string;
    updatedAt?: string;
}

interface INote {
    _id: string;
    starId: string;
    note: string;
    publisher: string;
    repliesTo?: string;
    createdAt?: string;
    updatedAt?: string;
}

interface IActivity {
    _id: string;
    starId: string;
    publisher: string;
    action: string;
    value?: string;
    createdAt?: string;
    updatedAt?: string;
}

interface IUser {
    _id: string;
    username: string;
    password: string;
    name: string;
    unit: string;
    role: userRole;
    watchList?: string[];
    createdAt?: string;
    updatedAt?: string;
}

interface IEvent {
    _id: string;
    name: string;
    type: 'flight' | 'integration' | 'industry';
    version: string;
    date: string;
    publisher: string;
    description: string;
    configuration: {
      aaaa: string;
      bbbb: string;
      cccc: string;
      dddd: string;
    }
    findings: string[];
}

type ApiStarsType = {
    message: string
    status: string
    stars: IStar[]
    star?: IStar
}

type ApiNotesType = {
    message: string
    status: string
    notes: INote[]
    note?: INote
}

type ApiActivitiesType = {
    message: string
    status: string
    activities: IActivity[]
    activity?: IActivity
}

type ApiUsersType = {
    message: string
    status: string
    users: IUser[]
    user?: IUser
}

type IAlert = {
    isAlert: boolean
    content: string
    severity: 'success' | 'info' | 'warning' | 'error'
}

type ApiEventsType = {
    message: string
    status: string
    events: IEvent[]
    event?: IEvent
}
