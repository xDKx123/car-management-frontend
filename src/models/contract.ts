import {Customer} from './customer'
import {Car} from './car'

interface Contract {
    id: string,
    name: string,
    car: Car,
    customer: Customer,
    returnDate: Date
    leavingDate: Date
}

export type {
    Contract
}