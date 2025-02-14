import { useState, useEffect } from 'react';
import { convertStarsToUsd} from "../utils/paymentTransaction";
import { ConversionResponse } from '../constants/types';

const useConvertStarsToUsd = (stars: number) => {
    const [usdAmount, setUsdAmount] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const convert = async () => {
            try {
                const response: ConversionResponse = await convertStarsToUsd(stars);
                setUsdAmount(response.data);
            } catch (error) {
                setError('Failed to convert stars to USD');
            } finally {
                setLoading(false);
            }
        };

        if (stars > 0) {
            convert();
        }
    }, [stars]);

    return { usdAmount, loading, error };
};

export default useConvertStarsToUsd;
