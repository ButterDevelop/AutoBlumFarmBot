import React, {useEffect} from 'react';
import { BitcoinIcon } from '@bitcoin-design/bitcoin-icons-react/filled';
import styled from "styled-components";
import {FamilyFontBase} from "../../styled/styled";
import {useTranslation} from "react-i18next";
import {changeLanguage} from "../../../i18n";

const BlumPointsPanel = styled.div`
    ${FamilyFontBase};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    background-color: #1F2329;
    text-align: center;
    box-sizing: border-box;
    margin-top: 2vh;
`;

const IconNumberContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const BlumPointsNumber = styled.div`
    color: #faf8f8;
    font-size: 4vh;
    font-weight: bold;
    margin-left: 10px; 
    margin-bottom: 1vh;
    text-shadow: 1px 1px 20px rgba(128, 128, 128, 1);
`;

const HeaderTextH1 = styled.h1`
    font-size: 2.5vh;
    text-align: center;
    color: #ccc;
`;

interface StatsPanelProps {
    number: number;
}

const BlumPanel: React.FC<StatsPanelProps> = ({ number }) => {
    const formattedNumber = number.toLocaleString('de-DE');

    const { t, i18n } = useTranslation();

    return (
        <BlumPointsPanel>
            <IconNumberContainer>
                <BlumPointsNumber>{formattedNumber} BP</BlumPointsNumber>
            </IconNumberContainer>
            <HeaderTextH1>{t('#%LABEL_BLUM_POINTS_PANEL_YOUR_ACCOUNTS%#')}</HeaderTextH1>
        </BlumPointsPanel>
    );
};

export default BlumPanel;
