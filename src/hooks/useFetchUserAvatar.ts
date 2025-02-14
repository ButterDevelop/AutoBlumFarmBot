import { useState, useEffect, useCallback } from 'react';
import { getApiUrl} from "../utils/baseUtils";
import {API_URLS} from "../constants/constants"; // предположим, что у вас есть такая функция для получения полного URL

const useFetchUserAvatar = (userId: number) => {
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const getUserAvatar = () => {
        setLoading(true);
        setError(null);
        try {
            const apiUrl = getApiUrl(`${API_URLS.USER_GET_USER_AVATAR}/${userId}`);
            setAvatarUrl(apiUrl);
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUserAvatar();
    }, [userId]);

    const refreshUserAvatar = useCallback(() => {
        getUserAvatar();
    }, []);

    return { avatarUrl, loading, error, refreshUserAvatar };
};

export default useFetchUserAvatar;
