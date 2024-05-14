import {carModelId} from './id'
import {CarBrand} from './carBrand'

interface CarModel {
    id: carModelId
    name: string
    brand: CarBrand
}

export type {CarModel}