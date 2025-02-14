import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useConvertStarsToUsd from "../../hooks/useConvertStarsToUsd";
import { PaymentPanelProps } from '../../constants/types';
import {FamilyFontBase, SlotButton} from "../styled/styled";
import {useTranslation} from "react-i18next";

const SectionContainer = styled.div`
    ${FamilyFontBase};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin: 1.5vh 0.5vh; /* Increase the vertical margin */
    background-color: rgba(70, 80, 93, 0.27);
    border-radius: 1vh;
    padding: 1.5vh;
    height: auto; /* Allow height to adjust based on content */
`;

const Label = styled.label`
    color: #eae8e8;
    font-size: 3.3vh;
    margin-bottom: 5px;
`;

const Input = styled.input<{ hasError: boolean }>`
    color: ${(props) => (props.hasError ? 'red' : '#eae8e8')};
    font-size: 4vh;
    background: none;
    width: 80%;
    border: none;
    text-align: left;
    text-indent: 0.5vh;

    &::placeholder {
        color: rgba(250, 248, 248, 0.5); /* Set placeholder color to semi-transparent */
    }

    &:focus {
        outline: none;
    }
`;

const ErrorText = styled.div`
    color: red;
    margin-left: 0.3em;
    font-size: 0.9em;
`;

const TelegramStar = styled.img`
    position: relative;
    margin-right: 10px;
    width: 4.5vh;
    height: 4.5vh;
    top: 1vh;
`;

const ButtonContainer = styled.div`
    display: flex;
    font-size: 2.2vh;
    justify-content: space-between;
    margin-top: 1vh;
    width: 100%; /* Ensure the container spans the full width */
`;

const StarsSection: React.FC<PaymentPanelProps & { error?: string }> = ({ starsAmount, setStarsAmount, setUsdAmount, handleButtonClick, error }) => {
    const [debouncedStarsAmount, setDebouncedStarsAmount] = useState(starsAmount);
    const { usdAmount, loading} = useConvertStarsToUsd(debouncedStarsAmount);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedStarsAmount(starsAmount);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [starsAmount]);

    useEffect(() => {
        if (usdAmount !== null) {
            setUsdAmount(usdAmount);
        }
    }, [usdAmount, setUsdAmount]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value === "" || (Number(value) >= 0 && Number(value) <= 1000)) {
            setStarsAmount(Number(value));
        }
    };

    const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
        let value = event.currentTarget.value.replace(/[^0-9]/g, '');
        setStarsAmount(Number(value));
    };

    useEffect(() => {
        if (starsAmount > 0) {
            handleButtonClick(starsAmount);
        }
    }, [starsAmount, handleButtonClick]);

    const { t, i18n } = useTranslation();

    return (
        <SectionContainer>
            <Label><TelegramStar src="telegramStar.svg" alt="Icon" />{t('#%LABEL_STARS_SECTION_YOU_PAY%#')}</Label>
            <Input
                type="text"
                value={starsAmount.toString()}
                onChange={handleChange}
                onInput={handleInput}
                placeholder="..."
                hasError={!!error}
            />
            {error && <ErrorText>{error}</ErrorText>}
            <ButtonContainer>
                <SlotButton onClick={() => handleButtonClick(50)}>50 stars</SlotButton>
                <SlotButton onClick={() => handleButtonClick(100)}>100 stars</SlotButton>
                <SlotButton onClick={() => handleButtonClick(150)}>150 stars</SlotButton>
            </ButtonContainer>
        </SectionContainer>
    );
};

export default StarsSection;
