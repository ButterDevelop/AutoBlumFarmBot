import { useState, useEffect, useCallback } from 'react';
import { fetchReferrals } from '../utils/userUtils';
import { Referral, ReferralsResponse } from '../constants/types';

const useFetchReferrals = () => {
    const [referrals, setReferrals] = useState<Referral[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const getReferrals = async () => {
        setLoading(true);
        setError(null);
        try {
            const response: ReferralsResponse = await fetchReferrals();
            if (response.ok) {
                const updatedReferrals = response.data.map(referral => ({
                    ...referral,
                    hostEarnings: parseFloat(referral.hostEarnings.toFixed(2)),
                }));
                setReferrals(updatedReferrals);
            } else {
                throw new Error('Failed to fetch referrals');
            }
        } catch (error) {
            //TODO: error
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getReferrals();
    }, []);

    const refreshReferrals = useCallback(() => {
        getReferrals();
    }, []);

    return { referrals, loading, error, refreshReferrals };
};

export default useFetchReferrals;
