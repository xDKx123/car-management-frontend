import { Api } from "../api/api"
import { User } from "../models/user"

class AuthorizationRepository {
    static login = async (username: string, password: string): Promise<User | undefined> => {
        const response = await Api.post('/auth/login', {
            username: username,
            password: password
        })
        const data = await response.json()
        localStorage.setItem('accessToken', data['accessToken'])
        localStorage.setItem('refreshToken', data['refreshToken'])
        return data['user']
    }
}

export { AuthorizationRepository }

