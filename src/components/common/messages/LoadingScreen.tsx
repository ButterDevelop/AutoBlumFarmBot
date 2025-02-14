// LoadingScreen.js
import React from 'react';
import styled from 'styled-components';
import {FamilyFontBase} from "../../styled/styled";
import {useTranslation} from "react-i18next";

const LoadingWrapper = styled.div`
  ${FamilyFontBase};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #1F2329;
  color: white;
`;

const Spinner = styled.div`
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top: 2px solid #fff;
    width: 3em;
    height: 3em;
    animation: spin 1s linear infinite;
    display: inline-block;
    margin-left: 0.5em;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;


const LoadingScreen = () => {
    return (
        <LoadingWrapper>
            <Spinner/>
        </LoadingWrapper>
    );
};

export default LoadingScreen;
