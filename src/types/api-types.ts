import { IEvent, IStar, IUser } from './interfaces';

export type ApiStarsType = {
    message: string
    status: string
    stars: IStar[]
    star?: IStar
}

export type ApiUsersType = {
    message: string
    status: string
    users: IUser[]
    user?: IUser
}

export type ApiEventsType = {
    message: string
    status: string
    events: IEvent[]
    event?: IEvent
}
