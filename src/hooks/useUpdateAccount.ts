import { useState } from 'react';
import { updateAccount } from '../utils/accountUtils';
import {UpdateAccountData, UpdateAccountResponse} from "../constants/types";

const useUpdateAccount = () => {
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [updateError, setUpdateError] = useState<string | null>(null);

    const updateAccountDetails = async (id: number, data: UpdateAccountData): Promise<void> => {
        setIsUpdating(true);
        setUpdateError(null);
        try {
            const response: UpdateAccountResponse = await updateAccount(id, data);
            if (!response.ok) {
                throw new Error(response.message);
            }
        } catch (error) {
            // @ts-ignore
            throw new Error(error.message);
        } finally {
            setIsUpdating(false);
        }
    };

    return { isUpdating, updateAccountDetails, updateError };
};

export default useUpdateAccount;
