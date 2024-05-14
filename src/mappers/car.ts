import { Car } from "../models/car"
import CarModelMapper from "./carModel"

class CarMapper {

    public static fixCar = (carModel: any): Car => {
        return {
            ...carModel,
            id: carModel._id,
            name: carModel.name,
            model: CarModelMapper.fixCarModel(carModel.modelCar),
            year: carModel.year,
            vin: carModel.vin,
            km: carModel.km,
            registrationPlate: carModel.registrationPlate,
            fuel: carModel.fuel,
            transmission: carModel.transmission,
            bodyType: carModel.bodyType,
            description: carModel.description,
            fuelCapacity: carModel.fuelCapacity
        } as Car
    }

    public static fixCars = (cars: any): Car[] => {
        return cars.map(this.fixCar)
    }
}

export { CarMapper }