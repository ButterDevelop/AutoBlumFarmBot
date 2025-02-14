import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import BuySlotsModal from "../modals/BuySlotsModal";
import {FamilyFontBase} from "../../styled/styled";
import {useTranslation} from "react-i18next";
import {changeLanguage} from "../../../i18n"; // Adjust the path as necessary

const AddAccountButtonContainer = styled.div`
    ${FamilyFontBase};
    position: relative;
    height: 15vw;
    width: 80vw;
    margin-right: 10px;
    max-width: 80vw;
    border-radius: 5px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.24);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 1vw;
    padding-left: 2vw;
    background-color: rgba(59, 68, 80, 0.1);
`;

const LockIcon = styled.img`
    height: 7vw;
    width: 7vw;
`;

const LockText = styled.div`
    margin-top: 1vw;
    font-size: 3vw;
    color: #cccccc;
    opacity: 0.8;
`;

interface AddAccountButtonProps {
    onClick: () => void;
}

const AddAccountButton: React.FC<AddAccountButtonProps> = ({ onClick }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const { t, i18n } = useTranslation();

    return (
        <>
            <AddAccountButtonContainer onClick={openModal}>
                <LockIcon src="lock-1-svgrepo-com_2.svg" alt="Lock Icon" />
                <LockText>{t('#%BUTTON_ADD_ACCOUNT_BUTTON_BUY_NEW_SLOT%#')}</LockText>
            </AddAccountButtonContainer>
            <BuySlotsModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                onPurchase={onClick}
            />
        </>
    );
};

export default AddAccountButton;
