import React, { createContext, useContext } from 'react';
import useFetchAccounts from '../../../hooks/useFetchAccounts';
import { Account } from '../../../constants/types';
import LoadingScreen from "../messages/LoadingScreen";

interface AccountsContextType {
    accounts: Account[];
    loading: boolean;
    error: string | null;
    refreshAccounts: () => void;
}

const AccountsContext = createContext<AccountsContextType | undefined>(undefined);

export const AccountsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { accounts, loading, error, refreshAccounts } = useFetchAccounts();

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <AccountsContext.Provider value={{ accounts, loading, error, refreshAccounts }}>
            {children}
        </AccountsContext.Provider>
    );
};

export const useAccounts = (): AccountsContextType => {
    const context = useContext(AccountsContext);
    if (context === undefined) {
        throw new Error('useAccounts must be used within an AccountsProvider');
    }
    return context;
};
