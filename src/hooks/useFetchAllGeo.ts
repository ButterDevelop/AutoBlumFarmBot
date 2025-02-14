import { useState, useEffect } from 'react';
import { fetchAllGeo } from '../utils/accountUtils';
import {Geo, GeoResponse} from '../constants/types';

const useFetchAllGeo = () => {
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
                // TODO: error handling
            } finally {
                setLoading(false);
            }
        };

        getGeos();
    }, []);

    return { geos, loading, error };
};

export default useFetchAllGeo;