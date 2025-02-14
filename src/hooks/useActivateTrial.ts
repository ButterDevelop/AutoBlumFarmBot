import { useState } from 'react';
import { activateTrial } from "../utils/userUtils";
import { ActivateTrialResponse } from '../constants/types';

const useActivateTrial = () => {
    const [message, setMessage] = useState<string | null>(null);
    const [isActivating, setIsActivating] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const activate = async (): Promise<{ success: boolean, message: string }> => {
        setIsActivating(true);
        setError(null);
        try {
            const response: ActivateTrialResponse = await activateTrial();
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
            setIsActivating(false);
        }
    };

    return { message, isActivating, activate, error };
};

export default useActivateTrial;
