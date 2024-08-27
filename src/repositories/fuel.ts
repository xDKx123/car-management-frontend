import { Api } from "../api/api"

class FuelRepository {
    private static fuelPath = '/fuel'

    public static getFuelPrice = async (fuelType: string): Promise<number> => {
        const response = await Api.post(this.fuelPath + '/price', {
            fuelType: fuelType
        })
        const data = await response.json()
        return data
    }
}

export { FuelRepository }
