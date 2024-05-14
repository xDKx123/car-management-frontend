import { CarModel } from "../models/carModel"
import CarBrandMapper from "./carBrand"

class CarModelMapper {
    public static fixCarModels = (carModels: any): CarModel[] => {
        return carModels.map(this.fixCarModel)

    }

    public static fixCarModel = (carModel: any): CarModel => {
        return {
            id: carModel._id,
            name: carModel.name,
            brand: carModel.brand && CarBrandMapper.fixCarBrand(carModel.brand)
        } as CarModel
    }
}

export default CarModelMapper