// hooks/useAuthenticate.ts
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { telegramAuth } from '../utils/telegramAuthUtils';
import { isTokenValid, storeAuthData, clearAuthData } from "../utils/baseUtils";
import {CONST, LOCAL_STORAGE_KEYS, ROUTES} from "../constants/constants";

const useAuthenticate = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        //localStorage.clear();
        //navigate(ROUTES.HOME);
        //console.log("Current hash:", location.hash);

        if (isAuthenticated && isTokenValid()) {
            return
        }
        const hash = location.hash.substring(1);
        //console.log("Hash after substring:", hash);
        const params = new URLSearchParams(hash);
        const tgWebAppDataParam = params.get(CONST.TG_WEBAPP_DATA);
        //console.log("tgWebAppDataParam:", tgWebAppDataParam);

        const authenticate = async (retries = 3, delay = 300) => {
            if (isTokenValid()) {
                setIsAuthenticated(true);
                setLoading(false);
                navigate(ROUTES.HOME);
                return;
            }

            clearAuthData();

            if (tgWebAppDataParam) {
                for (let attempt = 0; attempt < retries; attempt++) {
                    try {
                        const authResponse = await telegramAuth(tgWebAppDataParam);
                        if (authResponse.ok) {
                            storeAuthData(authResponse.data);
                            setIsAuthenticated(true);
                            setLoading(false);
                            navigate(ROUTES.HOME);
                            return;
                        } else {
                            clearAuthData();
                            setLoading(false);
                            navigate(ROUTES.LOGIN);
                            return;
                        }
                    } catch (error) {
                        if (attempt < retries - 1) {
                            await new Promise(resolve => setTimeout(resolve, delay));
                        } else {
                            clearAuthData();
                            setLoading(false);
                            navigate(ROUTES.LOGIN);
                        }
                    }
                }
            } else {
                setLoading(false);
                navigate(ROUTES.LOGIN);
            }
        };

        authenticate();
    }, [location.hash, navigate]);

    return { loading, isAuthenticated };
};

export default useAuthenticate;
