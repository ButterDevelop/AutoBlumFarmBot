import { useState } from 'react';
import { createOrder } from "../utils/paymentTransaction";
import { CreateOrderResponse } from '../constants/types';

const useCreateOrder = () => {
    const [message, setMessage] = useState<string | null>(null);
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const create = async (priceUsd: number): Promise<{ success: boolean, message: string }> => {
        setIsCreating(true);
        setError(null);
        try {
            const response: CreateOrderResponse = await createOrder(priceUsd);
            if (!response.ok) {
                throw new Error(response.message);
            }
            setMessage(response.message);
            return { success: response.ok, message: response.message };
        } catch (error) {
            // @ts-ignore
            setError(error.message);
            // @ts-ignore
            return { success: false, message: error.message };
        } finally {
            setIsCreating(false);
        }
    };

    return { message, isCreating, create, error };
};

export default useCreateOrder;
