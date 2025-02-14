import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import useConvertUsdToStars from "../../hooks/useConvertUsdToStars";
import { PaymentPanelProps } from '../../constants/types';
import { FamilyFontBase, SlotButton } from "../styled/styled";
import { useTranslation } from "react-i18next";
//@ts-ignore
import debounce from 'lodash.debounce';

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

const ReceiveIcon = styled.img`
    position: relative;
    margin-right: 10px;
    width: 4vh;
    height: 4vh;
    top: 0.8vh;
`;

const ButtonContainer = styled.div`
    display: flex;
    font-size: 2.2vh;
    justify-content: space-between;
    margin-top: 1vh;
    width: 100%; /* Ensure the container spans the full width */
`;

const UsdSection: React.FC<PaymentPanelProps & { error?: string }> = ({ usdAmount, setUsdAmount, setStarsAmount, handleButtonClick, error }) => {
    const [inputValue, setInputValue] = useState(usdAmount.toString());
    const { starsAmount, loading } = useConvertUsdToStars(usdAmount);

    const debouncedSetUsdAmount = useCallback(
        debounce((value: number) => {
            setUsdAmount(value);
        }, 500),
        []
    );

    useEffect(() => {
        setInputValue(usdAmount.toString());
    }, [usdAmount]);

    useEffect(() => {
        if (starsAmount !== null) {
            setStarsAmount(starsAmount);
        }
    }, [starsAmount, setStarsAmount]);

    const handleUsdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        // Update input value immediately to allow user to see what they type
        setInputValue(value);

        // Validate and debounce update of usdAmount
        if (value === "" || /^(\d+(\.\d{0,2})?)?$/.test(value)) {
            debouncedSetUsdAmount(Number(value));
        }
    };

    const handleUsdKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const allowedKeys = [
            'Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Home', 'End'
        ];
        if (
            !allowedKeys.includes(event.key) && // Allow control keys
            !/^[0-9.]$/.test(event.key) // Allow numbers and dots
        ) {
            event.preventDefault();
        }
    };

    const { t, i18n } = useTranslation();

    useEffect(() => {
        if (usdAmount > 0) {
            handleButtonClick(usdAmount);
        }
    }, [usdAmount, handleButtonClick]);

    return (
        <SectionContainer>
            <Label><ReceiveIcon src="PaymentUSD.svg" alt="Icon" />{t('#%LABEL_USD_SECTION_YOU_RECEIVE%#')}</Label>
            <Input
                type="text"
                value={inputValue}
                onChange={handleUsdChange}
                onKeyDown={handleUsdKeyDown}
                placeholder="..."
                hasError={!!error}
            />
            {error && <ErrorText>{error}</ErrorText>}
            <ButtonContainer>
                <SlotButton onClick={() => handleButtonClick(1)}>1 USD</SlotButton>
                <SlotButton onClick={() => handleButtonClick(5)}>5 USD</SlotButton>
                <SlotButton onClick={() => handleButtonClick(10)}>10 USD</SlotButton>
            </ButtonContainer>
        </SectionContainer>
    );
};

export default UsdSection;
