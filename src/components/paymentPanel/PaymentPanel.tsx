import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import HeaderPaymentPanel from "./HeaderPaymentPanel";
import StarsSection from './StarsSection';
import UsdSection from './UsdSection';
import { FamilyFontBase } from "../styled/styled";
import { useTranslation } from "react-i18next";
import useCreateOrder from '../../hooks/useCreateOrder'; // Импортируем хук
import ModalMessage from "../common/helpers/ModalMessage";

const Wrapper = styled.div`
    ${FamilyFontBase};
    flex-direction: column;
    justify-content: space-between;
    min-height: 79vh; /* Set height to available space */
    padding: 1vh;
`;

const PanelContainer = styled.div`
    color: #eee;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 100%;
    flex: 1;
    padding: 1vh;
    background-color: #1F2329;
    border-radius: 10px;
    margin: 0 auto;
    justify-content: center; /* Center content vertically */
`;

const Button = styled.button`
    background: #4caf50; /* Green background */
    color: #eee;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 1vw;
    margin-bottom: 1vw;
    width: 98.3%;
    padding: 2vw;
    font-size: 1.5em;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background: #45a049; /* Darker green on hover */
    }

    &:disabled {
        cursor: not-allowed;
    }
`;

const Spinner = styled.div`
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top: 2px solid #fff;
    width: 0.8em;
    height: 0.8em;
    animation: spin 1s linear infinite;
    display: inline-block;
    margin-left: 0.5em;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

const PaymentPanel: React.FC = () => {
    const [starsAmount, setStarsAmount] = useState<number>(0);
    const [usdAmount, setUsdAmount] = useState<number>(0);
    const [errors, setErrors] = useState<{ stars?: string, usd?: string }>({});
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalMessage, setModalMessage] = useState<string>('');
    const [modalType, setModalType] = useState<'info' | 'error'>('info');
    const { t, i18n } = useTranslation();
    const { isCreating, create, error: serverError } = useCreateOrder(); // Используем хук

    useEffect(() => {
        if (serverError) {
            setModalMessage(serverError);
            setModalType('error');
            setIsModalOpen(true);
        }
    }, [serverError]);

    const handleTopUpClick = async () => {
        const newErrors: { stars?: string, usd?: string } = {};
        if (starsAmount <= 0) {
            newErrors.stars = t('#%ERROR_PAYMENT_PANEL_STARS_AMOUNT_ERROR%#');
        }
        if (usdAmount <= 0) {
            newErrors.usd = t('#%ERROR_PAYMENT_PANEL_USD_AMOUNT_ERROR%#');
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const { success, message } = await create(usdAmount);
        setModalMessage(message);
        setModalType(success ? 'info' : 'error');
        setIsModalOpen(true);
    };

    const handleStarButtonClick = (value: number) => {
        setStarsAmount(value);
        if (errors.stars) {
            setErrors((prevErrors) => ({ ...prevErrors, stars: undefined }));
        }
    };

    const handleUsdButtonClick = (value: number) => {
        setUsdAmount(value);
        if (errors.usd) {
            setErrors((prevErrors) => ({ ...prevErrors, usd: undefined }));
        }
    };

    return (
        <Wrapper>
            <PanelContainer>
                <HeaderPaymentPanel />
                <StarsSection
                    starsAmount={starsAmount}
                    setStarsAmount={setStarsAmount}
                    usdAmount={usdAmount}
                    setUsdAmount={setUsdAmount}
                    handleButtonClick={handleStarButtonClick}
                    error={errors.stars}
                />
                <UsdSection
                    usdAmount={usdAmount}
                    setUsdAmount={setUsdAmount}
                    starsAmount={starsAmount}
                    setStarsAmount={setStarsAmount}
                    handleButtonClick={handleUsdButtonClick}
                    error={errors.usd}
                />
                <Button onClick={handleTopUpClick} disabled={isCreating}>
                    {isCreating ? (
                        <>
                            {t('#%BUTTON_PAYMENT_PANEL_TOPPING_UP%#')}
                            <Spinner />
                        </>
                    ) : (
                        t('#%BUTTON_PAYMENT_PANEL_TOP_UP%#')
                    )}
                </Button>
            </PanelContainer>
            <ModalMessage
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                onConfirm={() => setIsModalOpen(false)}
                onDecline={() => setIsModalOpen(false)}
                title={modalType === 'error' ? t('#%Error%#') : t('#%Information%#')}
                message={modalMessage}
                type={modalType}
            />
        </Wrapper>
    );
};

export default PaymentPanel;
