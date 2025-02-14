// utils/accountUtils.ts

import {AccountsResponse, GeoResponse, UpdateAccountData, UpdateAccountResponse} from "../constants/types";
import {getApiUrl, getRequest, putRequest} from "./baseUtils";
import {API_URLS} from "../constants/constants";

export async function fetchAccounts(): Promise<AccountsResponse> {
    const apiUrl = getApiUrl(API_URLS.ACCOUNT_ACCOUNT);
    return getRequest<AccountsResponse>(apiUrl);
}

export async function fetchAllGeo(): Promise<GeoResponse> {
    const apiUrl = getApiUrl(API_URLS.ACCOUNT_ALL_GEO);
    return getRequest<GeoResponse>(apiUrl);
}

export async function updateAccount(id: number, data: UpdateAccountData): Promise<UpdateAccountResponse> {
    const apiUrl = getApiUrl(`${API_URLS.ACCOUNT_ACCOUNT}/${id}`);
    return putRequest<UpdateAccountResponse>(apiUrl, data);
}