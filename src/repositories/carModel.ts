import { Api } from "../api/api"
import CarModelMapper from "../mappers/carModel"
import { CarModel } from "../models/carModel"

class CarModelRepository {
    private static carModelPath = '/carModel'

    public static loadCarModel = async (id: string): Promise<CarModel | undefined> => {
        const response = await Api.post(this.carModelPath + '/loadModel', {
            id: id
        })
        const data = await response.json()
        return CarModelMapper.fixCarModel(data['carModel'])
    }

    public static loadCarModels = async (brandId: string): Promise<CarModel[] | undefined> => {
        const response = await Api.post(this.carModelPath + '/load', {
            brandId: brandId
        })
        const data = await response.json()
        return CarModelMapper.fixCarModels(data['carModels'])
    }

    public static addCarModel = async (name: string, brandId: string): Promise<CarModel | undefined> => {
        const response = await Api.post(this.carModelPath + '/add', {
            name: name,
            brandId: brandId
        })
        const data = await response.json()
        return CarModelMapper.fixCarModel(data['carModel'])
    }
}

export { CarModelRepository }