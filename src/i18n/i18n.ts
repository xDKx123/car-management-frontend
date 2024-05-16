import i18n from 'i18next'

import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

i18n.use(Backend).use(initReactI18next).init({
    lng: 'sl',
    fallbackLng: ['en', 'sl'],
    debug: process.env.NODE_ENV === 'development',
    ns: 'translation',
    interpolation: {
        escapeValue: false
    },
    backend: {
        loadPath: '/api/static/locales/{{lng}}/{{ns}}.json'
    }
})

export default i18n