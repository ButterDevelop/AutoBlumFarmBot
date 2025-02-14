import React, { createContext, useContext, ReactNode, useMemo } from 'react';
import useFetchUserMe from "../../../hooks/useUserMe";
import { User } from '../../../constants/types';
import LoadingScreen from "../messages/LoadingScreen";

interface UserContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    refreshUserMe: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user, loading, error, refreshUserMe } = useFetchUserMe();

    const value = useMemo(() => ({ user, loading, error, refreshUserMe }), [user, loading, error]);

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
