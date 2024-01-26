import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import XHR from 'i18next-xhr-backend';
import {initReactI18next} from 'react-i18next';

import localeEN from './locales/en.json';
import localeRU from './locales/ru.json';
import localeUZ from './locales/uz.json';

const resources = {
    ru: {
        translation: localeRU,
    },
    uz: {
        translation: localeUZ,
    },
    en: {
        translation: localeEN,
    },
};

i18n.use(XHR)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'ru',
        lng: 'ru',
        debug: false,
        ns: ['translation'],
        defaultNS: 'translation',
        interpolation: {
            escapeValue: false,
        },
        react: {
            useSuspense: false,
        },
    });

export default i18n;
