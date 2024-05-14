import { Api } from "../api/api"
import CarBrandMapper from "../mappers/carBrand"
import { CarBrand } from "../models/carBrand"

class CarBrandRepository {
    private static carBrandPath = '/carBrand'

    public static addCarBrand = async (name: string): Promise<CarBrand | undefined> => {
        const response: Response = await Api.post(this.carBrandPath + '/add', {
            name: name
        })

        const data = await response.json()

        return data['carBrand']
    }
    public static updateCarBrand = async (id: string, name: string): Promise<CarBrand | undefined> => {
        const response: Response = await Api.post(this.carBrandPath + '/update', {
            id: id,
            name: name
        })

        const data = await response.json()

        return data['carBrand']
    }

    public static loadCarBrands = async (): Promise<CarBrand[] | undefined> => {
        const response = await Api.post(this.carBrandPath + '/load', {})
        const data = await response.json()
        return CarBrandMapper.fixCarBrands(data['carBrands'])
    }


    public static loadCarBrand = async (brandId: string): Promise<CarBrand | undefined> => {
        const response = await Api.post(this.carBrandPath + '/loadBrand', {
            brandId: brandId
        })
        const data = await response.json()
        return CarBrandMapper.fixCarBrand(data['carBrand'])
    }
}

export default CarBrandRepository