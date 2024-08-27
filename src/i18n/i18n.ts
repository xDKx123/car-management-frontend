import i18n, { TFunction } from 'i18next'

import HttpBackend, { HttpBackendOptions } from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'
import { settings } from '../api/settings'

const callBack = (error: any, t: TFunction) => {
    if (error) {
        console.error(error)
    }
 }

i18n.use(HttpBackend).use(initReactI18next).init<HttpBackendOptions>({
    lng: 'sl',
    load: 'currentOnly',
    fallbackLng: ['en', 'sl'],
    debug: process.env.NODE_ENV === 'development',
    ns: 'translation',
    interpolation: {
        escapeValue: false
    },
    backend: {
        loadPath: settings.API_URL + '/static/locales/{{lng}}/{{ns}}.json',
        crossDomain: true,

    }
}, callBack)

export default i18n