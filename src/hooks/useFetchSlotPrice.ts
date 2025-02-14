import { useState, useEffect } from 'react';
import { fetchSlotPrice } from '../utils/purchaseUtils';
import { PurchasePriceResponse } from '../constants/types';

const useFetchSlotPrice = (slotCount: number) => {
    const [price, setPrice] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getPrice = async () => {
            try {
                const response: PurchasePriceResponse = await fetchSlotPrice(slotCount);
                if (response.ok) {
                    // @ts-ignore
                    setPrice(response.data.price);
                } else {
                    throw new Error('Failed to fetch slot price');
                }
            } catch (error) {
                // TODO: Error handle
            } finally {
                setLoading(false);
            }
        };

        if (slotCount > 0) {
            getPrice();
        }
    }, [slotCount]);

    return { price, loading, error };
};

export default useFetchSlotPrice;
