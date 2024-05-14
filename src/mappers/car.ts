import { Car } from "../models/car"
import { CarBrand } from "../models/carBrand"
import { CarModel } from "../models/carModel"

class CarMapper {
    public static fixCarBrands = (carBrands: any): CarBrand[] => {
        return carBrands.map(this.fixCarBrand)
    }
    
    public static fixCarBrand = (carBrand: any): CarBrand => {
        return {
            id: carBrand._id,
            name: carBrand.name
        }
    }
    
    public static fixCarModels = (carModels: any): CarModel[] => {
        return carModels.map(this.fixCarModel)
    
    }
    
    public static fixCarModel = (carModel: any): CarModel => {
        return {
            id: carModel._id,
            name: carModel.name,
            brand: carModel.brand && this.fixCarBrand(carModel.brand)
        } as CarModel
    }
    
    public static fixCar = (carModel: any): Car => {
        return {
            ...carModel,
            id: carModel._id,
            name: carModel.name,
            model: this.fixCarModel(carModel.modelCar),
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