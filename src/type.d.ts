interface IUser {
    _id: string,
    username: string,
    unit: string,
    password: string,
    roles?: string[],
}

interface IStar {
    _id: string;
    priority: number;
    severity: number;
    name: string;
    status: string;
    assignee: string;
    version: string;
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
