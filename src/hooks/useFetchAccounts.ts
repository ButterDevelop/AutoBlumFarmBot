import { useState, useEffect, useCallback } from 'react';
import { fetchAccounts } from '../utils/accountUtils';
import { Account, AccountsResponse } from '../constants/types';

const useFetchAccounts = () => {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const getAccounts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response: AccountsResponse = await fetchAccounts();
            if (response.ok) {
                const updatedAccounts = response.data.map(account => ({
                    ...account,
                    balance: Math.floor(account.balance),
                    earnedToday: Math.floor(account.earnedToday)
                }));
                setAccounts(updatedAccounts);
            } else {
                throw new Error('Failed to fetch accounts');
            }
        } catch (error) {
            //TODO: error
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAccounts();
    }, []);

    const refreshAccounts = useCallback(() => {
        getAccounts();
    }, []);

    return { accounts, loading, error, refreshAccounts };
};

export default useFetchAccounts;
