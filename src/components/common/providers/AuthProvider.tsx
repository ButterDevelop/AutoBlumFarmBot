// context/AuthContext.tsx
import React, { createContext, useContext } from 'react';
import useAuthenticate from "../../../hooks/useAuthenticate";
import { AuthenticateResult } from '../../../constants/types';
import LoadingScreen from '../messages/LoadingScreen';

const AuthContext = createContext<AuthenticateResult | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { loading, isAuthenticated } = useAuthenticate();

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
