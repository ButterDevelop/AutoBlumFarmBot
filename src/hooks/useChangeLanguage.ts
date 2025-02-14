import { useState } from 'react';
import { changeLanguage } from "../utils/translationUtils";
import { ChangeLanguageResponse } from '../constants/types';

const useChangeLanguage = () => {
    const [isChanging, setIsChanging] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const changeLang = async (selectedOption: string): Promise<boolean> => {
        setIsChanging(true);
        setError(null);
        try {
            const response: ChangeLanguageResponse = await changeLanguage(selectedOption);
            if (!response.ok) {
                throw new Error('Failed to change language');
            }
            return true; // Успешный ответ
        } catch (error) {
            // @ts-ignore
            setError(error.message);
            return false; // Ошибка
        } finally {
            setIsChanging(false);
        }
    };

    return { isChanging, changeLang, error };
};

export default useChangeLanguage;
