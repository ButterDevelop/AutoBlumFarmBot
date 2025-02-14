import { getApiUrl, postRequest } from './baseUtils';
import { API_URLS } from '../constants/constants';
import {ConversionResponse, CreateOrderResponse} from '../constants/types';

export async function convertStarsToUsd(stars: number): Promise<ConversionResponse> {
    const apiUrl = getApiUrl(API_URLS.PAYMENT_TRANSACTION_CONVERT_STARS_TO_USD);
    return postRequest<ConversionResponse>(apiUrl, { stars });
}

export async function convertUsdToStars(priceUsd: number): Promise<ConversionResponse> {
    const apiUrl = getApiUrl(API_URLS.PAYMENT_TRANSACTION_CONVERT_USD_TO_STARS);
    return postRequest<ConversionResponse>(apiUrl, { priceUsd });
}

export async function createOrder(priceUsd: number): Promise<CreateOrderResponse> {
    const apiUrl = getApiUrl(API_URLS.PAYMENT_TRANSACTION_CREATE_ORDER);
    return postRequest<CreateOrderResponse>(apiUrl, { priceUsd });
}

