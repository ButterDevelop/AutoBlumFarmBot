// constants/types.ts

import React, {ReactNode} from "react";

export interface AuthResponseData {
    expires: string;
    languageCode: string;
    token: string;
}

export interface AuthResponse {
    ok: boolean;
    data: AuthResponseData;
}

export interface ErrorResponse {
    ok: boolean;
    message: string;
}

export interface User {
    id: number;
    telegramUserId: number;
    firstName: string;
    lastName: string;
    balanceUSD: number;
    languageCode: string;
    ownReferralCode: string;
    hadTrial: boolean;
    photoUrl: string;
    accountsBalancesSum: number;
}

export interface UserResponse {
    ok: boolean;
    data: User;
}

export interface Geo {
    countryCode: string;
    countryName: string;
    timezoneOffset: number;
}

export interface GeoResponse {
    ok: boolean;
    data: {
        geos: Geo[];
    };
}

export interface GeoContextType {
    geos: Geo[];
    loading: boolean;
    error: string | null;
}

export interface Account {
    id: number;
    customUsername: string;
    blumUsername: string;
    balance: number;
    tickets: number;
    referralCount: number;
    referralLink: string;
    blumAuthData: string;
    earnedToday: number;
    tookDailyReward: boolean;
    nearestWorkIn: string;
    countryCode: string;
    lastStatus: string;
    isTrial: boolean;
    trialExpires: string;
}

export interface ScrollBoxItemProps extends Account {
    profileImg: React.ReactNode;
}

export interface AccountModalPropsCommon extends ScrollBoxItemProps {
    isOpen: boolean;
    isEdit: boolean;
    onRequestClose: () => void;
}

export interface FilledScrollBoxItemProps extends ScrollBoxItemProps {
    onInfoModalOpen: () => void;
}

export interface EmptyScrollBoxItemProps extends ScrollBoxItemProps {
    onAddModalOpen: () => void;
}

export interface AccountsResponse {
    ok: boolean;
    data: Account[];
}

export interface UpdateAccountData {
    customUsername: string;
    countryCode: string;
    blumTelegramAuth: string;
}

export interface UpdateAccountResponse {
    ok: boolean;
    message: string;
}

export interface AuthenticateResult {
    loading: boolean;
    isAuthenticated: boolean;
}

export interface PurchasePriceData {
    price: number;
    discount: number;
}

export type PurchasePriceResponse = SuccessPurchasePriceResponse | ErrorResponse;

export interface SuccessPurchasePriceResponse {
    ok: boolean;
    data: PurchasePriceData;
}

export interface PaymentPanelProps {
    starsAmount: number;
    setStarsAmount: React.Dispatch<React.SetStateAction<number>>;
    usdAmount: number;
    setUsdAmount: React.Dispatch<React.SetStateAction<number>>;
    handleButtonClick: (value: number) => void;
}


export interface Referral {
    id: number;
    firstName: string;
    lastName: string;
    hostEarnings: number;
}

export interface ReferralsContextType {
    referrals: Referral[];
    loading: boolean;
    error: string | null;
    refreshReferrals: () => void;
}

export interface ReferralsResponse {
    ok: boolean;
    data: Referral[];
}

export interface ActivateTrialResponse {
    ok: boolean;
    message: string;
}

export interface ConversionResponse {
    ok: boolean;
    data: number;
}

export interface CreateOrderResponse {
    ok: boolean;
    message: string;
}

export interface TranslationItem {
    mask: string;
    text: string;
}

export interface LanguageResponse {
    ok: boolean;
    data: TranslationItem[];
}

export interface AllLanguagesResponse {
    ok: boolean;
    data: Record<string, string>;
}

export interface ChangeLanguageResponse {
    ok: boolean;
    message: string;
}