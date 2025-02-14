// constants/constants.ts

export const LOCAL_STORAGE_KEYS = {
    EXPIRES: 'expires',
    TOKEN: 'token',
    LANGUAGE_CODE: 'languageCode'
} as const;

export const API_URLS = {
    BASE_URL: 'https://autoblumfarm.ru',
    TELEGRAM_AUTH: '/api/TelegramAuth',
    ACCOUNT_ACCOUNT: '/api/Account',
    ACCOUNT_ALL_GEO: '/api/Account/AllGeo',
    PURCHASE_SLOTS: '/api/Purchase/PreBuyAccountsSlots',
    PAYMENT_TRANSACTION_CONVERT_STARS_TO_USD: '/api/PaymentTransaction/ConvertStarsToUSD',
    PAYMENT_TRANSACTION_CONVERT_USD_TO_STARS: '/api/PaymentTransaction/ConvertUSDToStars',
    PAYMENT_TRANSACTION_CREATE_ORDER: '/api/PaymentTransaction/CreateOrder',
    BUY_SLOTS: '/api/Purchase/BuyAccountsSlots',
    USER_ME: '/api/User/Me',
    USER_MY_REFERRALS: '/api/User/MyReferrals',
    USER_GET_USER_AVATAR: '/api/User/GetUserAvatar',
    USER_ACTIVATE_TRIAL: '/api/User/ActivateTrial',
    TRANSLATION_GET_AVAILABLE_LANGUAGES: '/api/Translation/GetAvailableLanguages',
    TRANSLATION_CHANGE_LANGUAGE: '/api/Translation/ChangeLanguage',
    TRANSLATION_TRANSLATION: '/api/Translation'
} as const;

export const CONST = {
    TG_WEBAPP_DATA: 'tgWebAppData',
    TG_LINK: 'https://t.me/AutoBlumFarmBot?start='
} as const;

export const HEADERS = {
    'Content-Type': 'application/json',
    "ngrok-skip-browser-warning": "69420" // TODO: remove while pushing to develop
} as const;

export const ROUTES = {
    HOME: '/home',
    FRIENDS: '/friends',
    LOGIN: '/login',
    PAYMENT: '/payment'
} as const;

