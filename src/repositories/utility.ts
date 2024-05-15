import { Api } from "../api/api"

class UtilityRepository {
    public static ping = async(): Promise<boolean | undefined> => {
        const response = await Api.get('/ping')
        const data = await response.json()
        return data['pong']
    }

    public static validateEmail = async(email: string): Promise<boolean> => {
        const response = await Api.post('/user/validateEmail', {
            email: email
        })
        const data = await response.json()
        return data['isValid']
    }

    public static validateIdNumber = async(idNumber: string): Promise<boolean> => {
        const response = await Api.post('/user//validateIdNumber', {
            idNumber: idNumber
        })
        const data = await response.json()
        return data['isValid']
    }

    public static validatePassword = async(password: string): Promise<boolean> => {
        const response = await Api.post('/auth/validatePassword', {
            password: password
        })
        const data = await response.json()
        return data['isValid']
    }

    public static validatePhoneNumber = async(phoneNumber: string): Promise<boolean> => {
        const response = await Api.post('/user/validatePhoneNumber', {
            phoneNumber: phoneNumber
        })
        const data = await response.json()
        return data['isValid']
    }

    public static getEnvironment = async (): Promise<string> => { 
        const response = await Api.get('/environment')
        const data = await response.json()
        return data['environment']
    }
}

export { UtilityRepository }

