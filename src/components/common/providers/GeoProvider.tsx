import React, {createContext, useState, useEffect, useContext, ReactNode} from 'react';
import { fetchAllGeo} from "../../../utils/accountUtils";
import {GeoContextType, GeoResponse} from "../../../constants/types";

const GeoContext = createContext<GeoContextType | undefined>(undefined);

export const GeoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [geos, setGeos] = useState<GeoResponse['data']['geos']>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getGeos = async () => {
            try {
                const response: GeoResponse = await fetchAllGeo();
                if (response.ok) {
                    setGeos(response.data.geos);
                } else {
                    throw new Error('Failed to fetch geos');
                }
            } catch (error) {
                // TODO: error
            } finally {
                setLoading(false);
            }
        };

        getGeos();
    }, []);

    return (
        <GeoContext.Provider value={{ geos, loading, error }}>
            {children}
        </GeoContext.Provider>
    );
};

export const useGeo = () => {
    const context = useContext(GeoContext);
    if (context === undefined) {
        throw new Error('useGeo must be used within a GeoProvider');
    }
    return context;
};