import React, {useEffect} from 'react';
import { BitcoinIcon } from '@bitcoin-design/bitcoin-icons-react/filled';
import styled from "styled-components";
import {FamilyFontBase} from "../styled/styled";
import {useTranslation} from "react-i18next";
import {changeLanguage} from "../../i18n";

const HeaderPaymentPanel = styled.div`
    ${FamilyFontBase};
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

const HeaderTextH1 = styled.h1`
    margin-top: 0.6rem;
    font-size: 3.5vh;
    color: #eae8e8;
`;
const HeaderTextH2 = styled.h1`
    margin-top: 0.2rem;
    font-size: 1.8vh;
    color: #adabab;
`;

const BlumPanel = () => {

    const { t, i18n } = useTranslation();

    return (
        <HeaderPaymentPanel>
            <HeaderTextH1>{t('#%LABEL_HEADER_PAYMENT_PANEL_WALLET%#')}</HeaderTextH1>
            <HeaderTextH2>{t('#%LABEL_PAYMENT_PANEL_FRAGMENT_PAYMENT%#')}</HeaderTextH2>
        </HeaderPaymentPanel>
    );
};

export default BlumPanel;
