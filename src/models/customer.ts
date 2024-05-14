import {customerId} from './id'

interface Customer {
    id: customerId,
    name: string,
    surname: string,
    email: string,
    phoneNumber: string,
    isLegalPerson: boolean,
    idNumber: string,
    idValidFrom: Date,
    idValidTo: Date,
    drivingLicenseNumber: string,
    drivingLicenseValidFrom: Date,
    drivingLicenseValidTo: Date,
    street: string,
    postalCode: number,
    city: string,
    birthDate: Date,
    birthPlace: string
}

export type {
    Customer
}