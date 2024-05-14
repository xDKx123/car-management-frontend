import { Api } from "../api/api"
import { CarRequest } from "../api/types"
import { CarMapper } from "../mappers/car"
import { Car } from "../models/car"
import { CarBrand } from "../models/carBrand"
import { CarModel } from "../models/carModel"

class CarRepository {

    public static loadCarModel = async (id: string): Promise<CarModel | undefined> => {
        const response = await Api.post('/loadCarModel', {
            id: id
        })
        const data = await response.json()
        return CarMapper.fixCarModel(data['carModel'])
    }
    public static addCarBrand = async (name: string): Promise<CarBrand | undefined> => {
        const response: Response = await Api.post('/addCarBrand', {
            name: name
        })

        const data = await response.json()

        return data['carBrand']
    }
    public static updateCarBrand = async ( id: string, name: string ): Promise<CarBrand | undefined> => {
        const response: Response = await Api.post('/updateCarBrand', {
            id: id,
            name: name
        })

        const data = await response.json()

        return data['carBrand']
    }
    public static loadCars = async (page?: number, rowsPerPage?: number): Promise<any> => {
        const response: Response = await Api.post('/car/load', {
            page: page,
            rowsPerPage: rowsPerPage
        })

        const data = await response.json()

        return CarMapper.fixCars(data['cars'])
    }

    public static addCar = async(car: CarRequest): Promise<Car | undefined> => {
        const response = await Api.post('/cars/add', car)
        const data = await response.json()
        return data['user']
    }

    public static loadCarBrands = async(): Promise<CarBrand[] | undefined> => {
        const response = await Api.post('/carBrands/load', {})
        const data = await response.json()
        return CarMapper.fixCarBrands(data['carBrands'])
    }

    public static loadCarBrand = async(brandId: string): Promise<CarBrand | undefined> => {
        const response = await Api.post('/carBrand/loadCarBrand', {
            brandId: brandId
        })
        const data = await response.json()
        return CarMapper.fixCarBrand(data['carBrand'])
    }

    public static loadCarModels = async(brandId: string): Promise<CarModel[] | undefined> => {
        const response = await Api.post('/carModels/load', {
            brandId: brandId
        })
        const data = await response.json()
        return CarMapper.fixCarModels(data['carModels'])
    }

    public static isValidVin = async(vin: string): Promise<boolean | undefined> => {
        const response = await Api.post('/car/isValidVin', {
            vin: vin
        })
        const data = await response.json()
        return data['isValid']
    }

    public static loadCarBodyTypes = async(): Promise<string[] | undefined> => {
        const response = await Api.post('/car/loadCarBodyTypes', {})
        const data = await response.json()
        return data['carBodyTypes']
    }

    public static loadCarFuelTypes= async (): Promise<string[] | undefined> => {
        const response = await Api.post('/car/loadCarFuelTypes', {})
        const data = await response.json()
        return data['carFuelTypes']
    }

    public static loadCarTransmissionTypes = async(): Promise<string[] | undefined> => {
        const response = await Api.post('/car/loadCarTransmissionTypes', {})
        const data = await response.json()
        return data['carTransmissionTypes']
    }

}

export { CarRepository }

