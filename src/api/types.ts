import {
    carId,
    carModelId
} from '../models/id'

interface CarRequest {
    id: carId
    model: carModelId
    vin: string
    registrationPlate: string
    km: number
    isFree: boolean
    fuel: string
    bodyType: string
    transmission: string
    fuelCapacity: number,
    description: string
    year: number
    kw: number
    ccm: number,
    colorExterior: string,
    colorInterior: string,
    numberOfDoors: number,
    numberOfSeats: number,
    fourWheelDrive: boolean,
    heatedSeatsFront: boolean,
    heatedSeatsRear: boolean,
    heatedSteeringWheel: boolean,
    airConditioning: boolean,
    cruiseControl: boolean,
    adaptiveCruiseControl: boolean,
    webasto: boolean,
    androidAuto: boolean,
    appleCarPlay: boolean,
    dabRadio: boolean,
    isoFix: boolean,
    pdcFront: boolean,
    pdcBack: boolean,
    rearCamera: boolean,
    towHook: boolean,
    laneAssist: boolean
}

export type {
    CarRequest
}