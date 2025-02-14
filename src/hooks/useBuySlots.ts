import { useState } from 'react';
import { buySlots } from '../utils/purchaseUtils';
import { PurchasePriceResponse, SuccessPurchasePriceResponse, ErrorResponse } from '../constants/types';

const useBuySlots = () => {
    const [isBuying, setIsBuying] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const buySlotCount = async (slotCount: number): Promise<void> => {
        setIsBuying(true);
        setError(null);
        try {
            const response: PurchasePriceResponse = await buySlots(slotCount);
            if (!response.ok) {
                const errorResponse = response as ErrorResponse;
                throw new Error(errorResponse.message);
            }
        } catch (error) {
            // @ts-ignore
            throw new Error(error.message);
        } finally {
            setIsBuying(false);
        }
    };

    return { isBuying, buySlotCount, error };
};

export default useBuySlots;
