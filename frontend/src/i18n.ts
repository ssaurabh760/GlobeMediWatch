import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';

// Initialize i18next for internationalization
i18n.use(HttpApi)
    .use(initReactI18next)
    .init({
        lng: 'en',
        fallbackLng: 'en',
        ns: ['common'],
        backend: {
            loadPath: '/i18n/{{lng}}/{{ns}}.json',
        },
        interpolation: {
            escapeValue: false,
        }
        });

export default i18n;