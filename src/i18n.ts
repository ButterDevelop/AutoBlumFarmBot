import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { fetchTranslations } from "./utils/translationUtils";
import { LanguageResponse } from "./constants/types";
import enTranslations from './locales/en.json';

const translationCache: Record<string, Record<string, string>> = {};

const transformTranslations = (translationsArray: LanguageResponse['data']): Record<string, string> => {
    return translationsArray.reduce((acc, { mask, text }) => {
        acc[mask] = text;
        return acc;
    }, {} as Record<string, string>);
};

const loadResources = async (lang: string): Promise<Record<string, string>> => {
    if (translationCache[lang]) {
        return translationCache[lang];
    }

    const response: LanguageResponse = await fetchTranslations(lang);

    if (response.ok) {
        const translations = transformTranslations(response.data);
        translationCache[lang] = translations;
        return translations;
    } else {
        throw new Error('Failed to load translations');
    }
};

i18n
    .use(initReactI18next)
    .init({
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: {
                translation: enTranslations,
            },
        },
    });

export const changeLanguage = async (lang: string) => {
    try {
        const translations = await loadResources(lang);
        i18n.addResourceBundle(lang, 'translation', translations, true, true);
    } catch (error) {
        console.error(`Failed to load translations for language ${lang}:`, error);
    }
    i18n.changeLanguage(lang);
};

export default i18n;
