import React, { createContext, useContext } from 'react';
import LoadingScreen from "../messages/LoadingScreen";
import {ReferralsContextType} from "../../../constants/types";
import useFetchReferrals from "../../../hooks/useFetchReferrals";

const ReferralsContext = createContext<ReferralsContextType | undefined>(undefined);

export const ReferralsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { referrals, loading, error, refreshReferrals } = useFetchReferrals();

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <ReferralsContext.Provider value={{ referrals, loading, error, refreshReferrals }}>
            {children}
        </ReferralsContext.Provider>
    );
};

export const useReferrals = (): ReferralsContextType => {
    const context = useContext(ReferralsContext);
    if (context === undefined) {
        throw new Error('useReferrals must be used within an AccountsProvider');
    }
    return context;
};
