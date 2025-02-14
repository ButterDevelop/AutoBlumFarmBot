// utils/accountUtils.ts

import {getApiUrl, getRequest, postRequest} from "./baseUtils";
import { API_URLS } from "../constants/constants";
import {AllLanguagesResponse, ChangeLanguageResponse, LanguageResponse} from "../constants/types";

export async function fetchAvailableLanguages(): Promise<AllLanguagesResponse> {
    const apiUrl = getApiUrl(API_URLS.TRANSLATION_GET_AVAILABLE_LANGUAGES);
    return getRequest<AllLanguagesResponse>(apiUrl);
}

export async function changeLanguage(languageCode: string): Promise<ChangeLanguageResponse> {
    const apiUrl = getApiUrl(API_URLS.TRANSLATION_CHANGE_LANGUAGE);
    return postRequest<ChangeLanguageResponse>(apiUrl, { languageCode });
}

export async function fetchTranslations(lang: string): Promise<LanguageResponse> {
    const apiUrl = getApiUrl(`${API_URLS.TRANSLATION_TRANSLATION}/${lang}`);
    const response = await getRequest<LanguageResponse>(apiUrl);
    return response;
}

const languageToCountryMapping: Record<string, string> = {
    ar: 'SA', // Arabic
    be: 'BY', // Belarusian
    cs: 'CZ', // Czech
    de: 'DE', // German
    en: 'US', // English
    fa: 'IR', // Persian
    fr: 'FR', // French
    pl: 'PL', // Polish
    ru: 'RU', // Russian
    uk: 'UA', // Ukrainian
    uz: 'UZ'  // Uzbek
};

const countryToLanguageMapping: Record<string, string> = {
    SA: 'ar',
    BY: 'be',
    CZ: 'cs',
    DE: 'de',
    US: 'en',
    IR: 'fa',
    FR: 'fr',
    PL: 'pl',
    RU: 'ru',
    UA: 'uk',
    UZ: 'uz'
};

export function mapLanguageToCountry(languageCode: string): string {
    return languageToCountryMapping[languageCode.toLowerCase()] || 'US';
}

export function mapCountryToLanguage(countryCode: string): string {
    return countryToLanguageMapping[countryCode.toUpperCase()] || 'en';
}
