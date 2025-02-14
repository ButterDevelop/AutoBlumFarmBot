// utils/telegramAuthUtils.ts

import { getApiUrl, postRequest } from './baseUtils';
import { LOCAL_STORAGE_KEYS, API_URLS } from '../constants/constants';
import { AuthResponse, AuthResponseData } from '../constants/types';

export async function telegramAuth(tgWebAppData: string): Promise<AuthResponse> {
    const apiUrl = getApiUrl(API_URLS.TELEGRAM_AUTH);
    const finalJson = { query: tgWebAppData };
    return postRequest(apiUrl, finalJson);
}