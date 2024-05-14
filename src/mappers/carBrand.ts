import { CarBrand } from "../models/carBrand"

class CarBrandMapper {
    public static fixCarBrands = (carBrands: any): CarBrand[] => {
        return carBrands.map(this.fixCarBrand)
    }

    public static fixCarBrand = (carBrand: any): CarBrand => {
        return {
            id: carBrand._id,
            name: carBrand.name
        }
    }
}

export default CarBrandMapper