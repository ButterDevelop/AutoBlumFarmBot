import { useState, useEffect } from 'react';
import { convertUsdToStars} from "../utils/paymentTransaction";
import { ConversionResponse } from '../constants/types';

const useConvertUsdToStars = (usd: number) => {
    const [starsAmount, setStarsAmount] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const convert = async () => {
            try {
                const response: ConversionResponse = await convertUsdToStars(usd);
                setStarsAmount(response.data);
            } catch (error) {
                setError('Failed to convert USD to stars');
            } finally {
                setLoading(false);
            }
        };

        if (usd > 0) {
            convert();
        }
    }, [usd]);

    return { starsAmount, loading, error };
};

export default useConvertUsdToStars;
