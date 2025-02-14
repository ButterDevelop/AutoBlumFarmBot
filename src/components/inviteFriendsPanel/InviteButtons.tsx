import React, {useEffect} from 'react';
import styled from 'styled-components';
import {FamilyFontBase} from "../styled/styled";
import {useTranslation} from "react-i18next";
import {changeLanguage} from "../../i18n";
import {CONST} from "../../constants/constants";

const ButtonsContainer = styled.div`
    ${FamilyFontBase};
    display: flex;
    justify-content: space-between;
`;

const InviteButton = styled.button`
    background-color: #33393e;
    color: #ddd;
    font-weight: bold;
    font-size: 2.3vh;
    padding: 2vh;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1vh;
`;

const CopyButton = styled.button`
    background-color: #33393e;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    flex: 0 0 20%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Icon = styled.img`
    filter: invert(25%);
    width: 4vh;
    height: 4vh;
`;

type Props = {
    referralLink: string;
    inviteMessage: string;
};

const InviteButtons: React.FC<Props> = ({ referralLink, inviteMessage }) => {
    const { t, i18n } = useTranslation();

    const fullReferralLink = `${CONST.TG_LINK}${referralLink}`;

    const handleCopyLink = () => {
        navigator.clipboard.writeText(fullReferralLink);
        alert(t('#%ALERT_INVITE_BUTTONS_ALERT_MESSAGE%#'));
    };

    const handleInviteFriend = () => {
        const fullInviteMessage = `${inviteMessage} ${fullReferralLink}`;
        window.open(`https://t.me/share/url?url=${encodeURIComponent(fullInviteMessage)}`, '_blank');
    };

    return (
        <ButtonsContainer>
            <InviteButton onClick={handleInviteFriend}>
                {t('#%BUTTON_INVITE_BUTTONS_INVITE_FRIEND%#')}
            </InviteButton>
            <CopyButton onClick={handleCopyLink}>
                <Icon src="copy-svgrepo-com.svg" alt="copy icon" />
            </CopyButton>
        </ButtonsContainer>
    );
};

export default InviteButtons;