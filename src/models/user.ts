import { userId } from './id'

interface User {
    _id: userId
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    active: boolean,
    validated: boolean,
}

export type {
    User
}
