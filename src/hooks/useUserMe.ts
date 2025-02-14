import { useState, useEffect, useCallback } from 'react';
import { fetchUserMe } from '../utils/userUtils';
import { User, UserResponse } from '../constants/types';
import {changeLanguage} from "../utils/translationUtils";

const useFetchUserMe = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const getUserMe = async () => {
        setLoading(true);
        setError(null);
        try {
            const response: UserResponse = await fetchUserMe();
            if (response.ok) {
                setUser(response.data);
            } else {
                throw new Error('Failed to fetch user data');
            }
        } catch (error) {
            // @ts-ignore
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUserMe();
    }, []);

    const refreshUserMe = useCallback(() => {
        getUserMe();
    }, []);

    return { user, loading, error, refreshUserMe };
};

export default useFetchUserMe;
