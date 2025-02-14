import { useState, useEffect } from 'react';
import { fetchAvailableLanguages } from "../utils/translationUtils";
import {AllLanguagesResponse} from '../constants/types';

const useFetchAllAvailableLanguages = () => {
    const [languages, setLanguages] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getLanguages = async () => {
            try {
                const response: AllLanguagesResponse = await fetchAvailableLanguages();
                if (response.ok) {
                    setLanguages(response.data);
                } else {
                    throw new Error('Failed to fetch languages');
                }
            } catch (error) {
                // @ts-ignore
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        getLanguages();
    }, []);

    return { languages, loading, error };
};

export default useFetchAllAvailableLanguages;
