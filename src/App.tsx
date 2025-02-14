import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HeaderNav } from './components/common/HeaderNav';
import { FooterNav } from './components/common/FooterNav';
import HomePanel from './components/homePanel/HomePanel';
import InviteFriendsPanel from "./components/inviteFriendsPanel/InviteFriendsPanel";
import PaymentPanel from "./components/paymentPanel/PaymentPanel";
import { ROUTES } from "./constants/constants";
import {FamilyFontBase} from "./components/styled/styled";

const StyledApp = styled.div`
    ${FamilyFontBase};
  
    background-color: black;
    padding: 0;
    margin: 0;
    color: black;

    @media (prefers-color-scheme: dark) {
        //background-color: #1b1f24;
        background-color: #1F2329;
        color: white;
    }
    height: 97vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
   // Fallback color is black
`;

declare const Telegram: any;

function App() {
    useEffect(() => {
        if (window.Telegram) {
            Telegram.WebApp.setBackgroundColor('#1F2329');
            Telegram.WebApp.setHeaderColor('#1F2329');
            Telegram.WebApp.disableVerticalSwipes();
            Telegram.WebApp.expand();

            const fullHeight = Telegram.WebApp.viewportHeight;
            document.body.style.height = `${fullHeight}px`;
            document.body.style.overflow = 'hidden';
        }
    }, []);

    return (
        <StyledApp>
            <HeaderNav />
                <Routes>
                    <Route path={ROUTES.HOME} element={<HomePanel />} />
                    <Route path={ROUTES.FRIENDS} element={<InviteFriendsPanel />} />
                    <Route path={ROUTES.PAYMENT} element={<PaymentPanel />} />
                </Routes>
            <FooterNav />
        </StyledApp>
    );
}

export default App;
