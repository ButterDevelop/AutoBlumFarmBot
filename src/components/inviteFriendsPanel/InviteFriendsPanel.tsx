import React, {useEffect} from 'react';
import styled from 'styled-components';
import AccountsReferralScrollBoxItem from "./AccountsReferralScrollBoxItem";
import InviteButtons from './InviteButtons';
import { FriendsScrollBox } from "../common/helpers/FriendsScrollBox";
import {useReferrals} from "../common/providers/ReferralsProvider";
import {useUser} from "../common/providers/UserProvider";
import {FamilyFontBase} from "../styled/styled";
import {useTranslation} from "react-i18next";
import {changeLanguage} from "../../i18n";

const PanelContainer = styled.div`
    ${FamilyFontBase};
    color: white;
    display: flex;
    flex-direction: column;
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 82vh;
    padding-left: 3vw;
    padding-right: 3vw;
`;

const Title = styled.div`
    color: #faf8f8;
    font-size: 2.7vh;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 10vh;
    text-align: center;
    margin-top: 4vw;
    margin-bottom: 4vw;
`;

const FriendsCount = styled.div`
    color: #faf8f8;
    font-size: 2.3vh;
    font-weight: bold;
    align-items: center;
    width: 100%;
    height: 5vh;
    text-align: center;
    margin-top: 0;
`;

const ContentContainer = styled.div`
    flex: 1;
    overflow-y: auto;
    padding-top: 1vw;
`;

const BottomContainer = styled.div`
    width: 97.8%;
    padding-left: 1vw;
    padding-right: 2vw;
    padding-bottom: 2vw;
`;

function InviteFriendsPanel() {

    const { referrals, loading, error } = useReferrals();
    const { user } = useUser();

    const { t, i18n } = useTranslation();

    return (
        <PanelContainer>
            <Title>{t('#%LABEL_INVITE_FRIENDS_PANEL_INVITE_FRIENDS%#')}</Title>
            <FriendsCount>{t('#%LABEL_INVITE_FRIENDS_PANEL_LIST_OF_FRIENDS%#')} ({referrals.length})</FriendsCount>
            <ContentContainer>
                <FriendsScrollBox>
                    {referrals.map(({id, firstName, lastName, hostEarnings }, index) => (
                        <AccountsReferralScrollBoxItem
                            key={id}
                            id={id}
                            firstName={firstName}
                            lastName={lastName}
                            hostEarnings={hostEarnings}
                        />
                    ))}
                </FriendsScrollBox>
            </ContentContainer>
            <BottomContainer>
                <InviteButtons referralLink={user?.ownReferralCode ?? ""} inviteMessage={t('#%MESSAGE_INVITE_FRIENDS_PANEL_INVITE_MESSAGE%#')} />
            </BottomContainer>
        </PanelContainer>
    );
}

export default InviteFriendsPanel;
