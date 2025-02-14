import React, { useState } from 'react';
import styled from 'styled-components';
import { FamilyFontBase } from "../styled/styled";
import useActivateTrial from "../../hooks/useActivateTrial";
import ModalMessage from "../common/helpers/ModalMessage";
import {useAccounts} from "../common/providers/AccountsProvider";
import useUserMe from "../../hooks/useUserMe";
import {useTranslation} from "react-i18next";

const ButtonsContainer = styled.div`
    ${FamilyFontBase};
    display: flex;
    justify-content: space-between;
`;

const InviteButton = styled.button<{ isDeactivating: boolean }>`
    background-color: ${({ isDeactivating }) => (isDeactivating ? '#D32F2F' : '#276304')};
    color: #ffffff;
    font-weight: bold;
    font-size: 2.2vh;
    padding: 2vh;
    width: 74vw;
    border: none;
    border-radius: 5px;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    ${({ disabled }) =>
            disabled &&
            `
        background-color: #A9A9A9; /* Gray background when disabled */
    `}
`;

type Props = {
    accounts: number;
};

const TrialButton: React.FC<Props> = ({ accounts }) => {
    const { message, isActivating, activate, error } = useActivateTrial();
    const { refreshAccounts } = useAccounts();
    const { refreshUserMe } = useUserMe();

    const { t, i18n } = useTranslation();

    // State to control modal visibility and its content
    const [isModalOpen, setModalOpen] = useState(false);

    const handleActivateTrial = async () => {
        const result = await activate();
        if (result.success) {
            console.log('Trial activated:', result.message);
        } else {
            console.error('Error activating trial:', result.message);
        }
    };

    const handleOpenModal = () => {
        setModalOpen(true); // Open the modal when button is clicked
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleConfirmTrial = async () => {
        setModalOpen(false); // Close the modal
        await handleActivateTrial();
        refreshAccounts();
        refreshUserMe();
    };

    return (
        <div>
            <ButtonsContainer>
                <InviteButton
                    onClick={handleOpenModal}
                    isDeactivating={accounts !== 0}
                    disabled={accounts !== 0}
                >
                    {accounts !== 0 ? t('#%TRIAL_BUTTON_MODAL_MESSAGE_BUTTON_IS_ACTIVE%#') : t('#%TRIAL_BUTTON_MODAL_MESSAGE_BUTTON_ACTIVATE%#')}
                </InviteButton>
            </ButtonsContainer>
            <ModalMessage
                isOpen={isModalOpen}
                onDecline={handleCloseModal}
                onRequestClose={handleCloseModal}
                onConfirm={handleConfirmTrial}
                title={t('#%TRIAL_BUTTON_MODAL_MESSAGE_TITLE_CONFIRM%#')}
                message={t('#%TRIAL_BUTTON_MODAL_MESSAGE_MESSAGE_INFORM%#')}
                type="warning"
            />
        </div>
    );
};

export default TrialButton;
