// utils/userUtils.ts

import {AccountsResponse, ActivateTrialResponse, ReferralsResponse, UserResponse} from "../constants/types";
import {getApiUrl, getRequest} from "./baseUtils";
import {API_URLS} from "../constants/constants";

export async function fetchUserMe(): Promise<UserResponse> {
    const apiUrl = getApiUrl(API_URLS.USER_ME);
    return getRequest<UserResponse>(apiUrl);
}

export async function fetchReferrals(): Promise<ReferralsResponse> {
    const apiUrl = getApiUrl(API_URLS.USER_MY_REFERRALS);
    return getRequest<ReferralsResponse>(apiUrl);
}

export async function fetchUserAvatar(userId: number): Promise<string> {
    const apiUrl = getApiUrl(`${API_URLS.USER_GET_USER_AVATAR}/${userId}`)
    const blob = await getRequest<Blob>(apiUrl, 'blob');
    return URL.createObjectURL(blob);
}

export async function activateTrial(): Promise<ActivateTrialResponse> {
    const apiUrl = getApiUrl(API_URLS.USER_ACTIVATE_TRIAL); // Replace with your actual API URL logic
    return getRequest<ActivateTrialResponse>(apiUrl);
}