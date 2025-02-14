import {getApiUrl, postRequest} from './baseUtils';
import { API_URLS } from '../constants/constants';
import { PurchasePriceResponse} from '../constants/types'

export async function fetchSlotPrice(amount: number): Promise<PurchasePriceResponse> {
    const apiUrl = getApiUrl(API_URLS.PURCHASE_SLOTS);
    return postRequest<PurchasePriceResponse>(apiUrl, { amount });
}

export async function buySlots(amount: number): Promise<PurchasePriceResponse> {
    const apiUrl = getApiUrl(API_URLS.BUY_SLOTS);
    return postRequest<PurchasePriceResponse>(apiUrl, { amount });
}