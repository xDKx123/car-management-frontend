//write a generic post method to make post request using fetch
//this method will be used to make post request to the server
//use settings from settings.ts to get the API_URL

import { settings } from './settings'

//write a async function to login
//this function will take username and password as arguments
class Api {
    private static getHeaders = (): HeadersInit => {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }

    private static getRefreshTokenHeaders = (): HeadersInit => {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('refreshToken')}`
        }

    }

    private static refreshAccessToken = async (): Promise<void> => {
        const response = await this.post('/auth/refresh', {
            refreshToken: localStorage.getItem('refreshToken')
        })
        if (response.ok) {
            const data = await response.json()
            localStorage.setItem('accessToken', data.accessToken)
            localStorage.setItem('refreshToken', data.refreshToken)


        } else {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
        }
    }

    static refreshToken = async (): Promise<Response> => {
        return fetch(settings.API_URL + '/auth/refresh', {
            method: 'POST',
            headers: this.getRefreshTokenHeaders(),
            body: JSON.stringify({
                refreshToken: localStorage.getItem('refreshToken')
            })
        })
    }
    
    static get = async (path: string): Promise<Response> => {
        return fetch(settings.API_URL + path, {
            method: 'GET',
            headers: this.getHeaders()
        })
    }
    
    static post = async (path: string, data: any, counter = 0): Promise<Response> => {
        const response = await fetch(settings.API_URL + path, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        })

        if (response.status === 401) {
            await this.refreshAccessToken()
            return this.post(path, data)
        }

        if (response.status === 503) {
            location.pathname = '/serviceDown'
        }

        if (response.status === 504) {
            if (counter === 3) {
                const pingResponse = await this.get('/ping')

                if (pingResponse.ok) {
                    throw response
                }
                else {
                    location.pathname = '/serviceDown'
                }
            }
            return this.post(path, data, counter + 1)
        }

        if (!response.ok) {
            throw response
        }

        return response
    }
}


export {
    Api
}
