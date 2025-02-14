import React from 'react';
import styled from 'styled-components';
import {FamilyFontBase, ScrollBoxItemContainerBase, ScrollBoxItemRightCommonButton} from '../../styled/styled';
import {FilledScrollBoxItemProps} from "../../../constants/types";
import {useTranslation} from "react-i18next";

const FilledAccountScrollBoxItemContainer = styled(ScrollBoxItemContainerBase)`
    ${FamilyFontBase};
    background-color: #46505d;
`;

const FilledAccountScrollBoxItemContent = styled.div`
    flex-grow: 1;
    display: flex;
    align-items: center;
    margin-left: 2vw;
    overflow: hidden;
`;

const UserName = styled.div`
    font-weight: bold;
    color: #fff;
    font-size: 4vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const UserNamePostfix = styled.div`
    font-weight: bold;
    color: #919191;
    font-size: 4vw;
    margin-left: 2vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const AccountBalanceItem = styled.div`
    font-weight: bold;
    color: #fff;
    margin-right: 10px;
    font-size: 4vw;
    flex-shrink: 0;
`;

const FilledAccountScrollBoxItem: React.FC<FilledScrollBoxItemProps> = ({
                                                                            id,
                                                                            profileImg,
                                                                            customUsername,
                                                                            blumUsername,
                                                                            balance,
                                                                            tickets,
                                                                            referralCount,
                                                                            referralLink,
                                                                            earnedToday,
                                                                            blumAuthData,
                                                                            tookDailyReward,
                                                                            nearestWorkIn,
                                                                            countryCode,
                                                                            lastStatus,
                                                                            onInfoModalOpen,
                                                                            isTrial,
                                                                            trialExpires
                                                                 }) => (
    <FilledAccountScrollBoxItemContainer>
        {profileImg}
        <FilledAccountScrollBoxItemContent>
            <UserName>{customUsername}</UserName>
            {isTrial && (
                <UserNamePostfix>{"[trial]"}</UserNamePostfix>
            )}
        </FilledAccountScrollBoxItemContent>
        <AccountBalanceItem>{balance.toLocaleString('de-DE')} BP</AccountBalanceItem>
        <ScrollBoxItemRightCommonButton onClick={onInfoModalOpen}>
            <img src="maximize-size-svgrepo-com.svg" alt="Icon max" />
        </ScrollBoxItemRightCommonButton>
    </FilledAccountScrollBoxItemContainer>
);

// @ts-ignore
export default FilledAccountScrollBoxItem;