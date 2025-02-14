import { API_URLS, HEADERS, LOCAL_STORAGE_KEYS } from '../constants/constants';
import { AuthResponseData } from '../constants/types';

export function getApiUrl(endpoint: string): string {
    return `${API_URLS.BASE_URL}${endpoint}`;
}

function getAuthHeaders(): HeadersInit {
    return isTokenValid()
        ? { ...HEADERS, 'Authorization': `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN)}` }
        : HEADERS;
}

export function storeAuthData(data: AuthResponseData): void {
    localStorage.setItem(LOCAL_STORAGE_KEYS.EXPIRES, data.expires);
    localStorage.setItem(LOCAL_STORAGE_KEYS.LANGUAGE_CODE, data.languageCode);
    localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, data.token);
}

export function clearAuthData(): void {
    localStorage.clear();
}

export function isTokenValid(): boolean {
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
    if (!token) return false;

    const expires = localStorage.getItem(LOCAL_STORAGE_KEYS.EXPIRES);
    if (!expires) return false;

    const expiresDate = new Date(expires);
    const currentDate = new Date();
    return expiresDate > currentDate;
}

async function makeRequest<T>(url: string, method: string, body?: any, responseType?: string): Promise<T> {
    try {

        const response = await fetch(url, {
            method,
            headers: getAuthHeaders(),
            body: body ? JSON.stringify(body) : undefined
        });

        let responseData;
        if (responseType === 'blob') {
            responseData = await response.blob();
        } else {
            responseData = await response.json();
        }

        if (!response.ok) {
            const errorMessage = responseData.message || `Network response was not ok: ${response.status} - ${response.statusText}`;
            throw new Error(errorMessage);
        }

        return responseData;
    } catch (error) {
        throw error;
    }
}

export async function postRequest<T>(url: string, body: any): Promise<T> {
    return makeRequest<T>(url, 'POST', body);
}

export async function putRequest<T>(url: string, body: any): Promise<T> {
    return makeRequest<T>(url, 'PUT', body);
}

export async function getRequest<T>(url: string, responseType?: string): Promise<T> {
    return makeRequest<T>(url, 'GET', undefined, responseType);
}

