import { Api } from "../api/api";
import { User } from "../models/user";

class UserRepository {
    public static fetchUser = async (id: string): Promise<User> => {
        const response = await Api.post('/user/getById', {
            id: id
        })
        const data = await response.json()
        return data['user']
    };

    public static getCurrentUser = async (): Promise<User> => {
        const response = await Api.get('/user/current')
        const data = await response.json()
        return data['user']
    };

    public static changePassword = async (id: string, oldPassword: string, newPassword: string, confirmNewPassword: string): Promise<boolean> => {
        const response = await Api.post('/user/changePassword', {
            id: id,
            oldPassword: oldPassword,
            newPassword: newPassword,
            confirmNewPassword: confirmNewPassword
        })
        const data = await response.json()
        return data['success']
    };

    public static disableUser = async (id: string): Promise<boolean> => {
        const response = await Api.post('/user/disableUser', {
            id: id
        })
        const data = await response.json()
        return data['success']
    };

    public static checkIfEmailExists = async (email: string): Promise<boolean> => {
            const response = await Api.post('/user/checkIfEmailExists', {
                email: email
            })
            const data = await response.json()
            return data['isValid']
    };
}

export { UserRepository };

