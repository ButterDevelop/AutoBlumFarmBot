import React, { useState } from 'react';
import styled from 'styled-components';
import AccountInfoModal from './modals/AccountInfoModal';
import AddAccountModal from './modals/AddAccountModal';
import FilledAccountScrollBoxItem from "./subComponents/FilledAccountScrollBoxItem";
import EmptyAccountScrollBoxItem from "./subComponents/EmptyAccountScrollBoxItem";
import ProfileImage from "./common/ProfileImage";
import {ScrollBoxItemProps} from "../../constants/types";

const HomePanelScrollBoxItem: React.FC<ScrollBoxItemProps> = ({
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
                                                                  isTrial,
                                                                  trialExpires

                                                     }) => {
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const openInfoModal = () => {
        setIsInfoModalOpen(true);
    };

    const closeInfoModal = () => {
        setIsInfoModalOpen(false);
    };

    const openAddModal = () => {
        setIsAddModalOpen(true);
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
    };

    const isEmpty = !customUsername && !blumAuthData;

    return (
        <>
            {isEmpty ? (
                <EmptyAccountScrollBoxItem
                    id={id}
                    profileImg={profileImg}
                    customUsername={customUsername}
                    blumUsername={blumUsername}
                    balance={balance}
                    tickets={tickets}
                    referralCount={referralCount}
                    referralLink={referralLink}
                    blumAuthData={blumAuthData}
                    earnedToday={earnedToday}
                    tookDailyReward={tookDailyReward}
                    nearestWorkIn={nearestWorkIn}
                    countryCode={countryCode}
                    lastStatus={lastStatus}
                    isTrial={isTrial}
                    trialExpires={trialExpires}
                    onAddModalOpen={openAddModal} />
            ) : (
                <FilledAccountScrollBoxItem
                    id={id}
                    profileImg={profileImg}
                    customUsername={customUsername}
                    blumUsername={blumUsername}
                    balance={balance}
                    tickets={tickets}
                    referralCount={referralCount}
                    referralLink={referralLink}
                    blumAuthData={blumAuthData}
                    earnedToday={earnedToday}
                    tookDailyReward={tookDailyReward}
                    nearestWorkIn={nearestWorkIn}
                    countryCode={countryCode}
                    lastStatus={lastStatus}
                    isTrial={isTrial}
                    trialExpires={trialExpires}
                    onInfoModalOpen={openInfoModal}
                />
            )}

            <AccountInfoModal
                id={id}
                profileImg={profileImg}
                customUsername={customUsername}
                blumUsername={blumUsername}
                balance={balance}
                tickets={tickets}
                referralCount={referralCount}
                referralLink={referralLink}
                blumAuthData={blumAuthData}
                earnedToday={earnedToday}
                tookDailyReward={tookDailyReward}
                nearestWorkIn={nearestWorkIn}
                countryCode={countryCode}
                lastStatus={lastStatus}
                isOpen={isInfoModalOpen}
                isEdit={false}
                onRequestClose={closeInfoModal}
                isTrial={isTrial}
                trialExpires={trialExpires}
            />

            <AddAccountModal
                id={id}
                profileImg={profileImg}
                customUsername={customUsername}
                blumUsername={blumUsername}
                balance={balance}
                tickets={tickets}
                referralCount={referralCount}
                referralLink={referralLink}
                blumAuthData={blumAuthData}
                earnedToday={earnedToday}
                tookDailyReward={tookDailyReward}
                nearestWorkIn={nearestWorkIn}
                countryCode={countryCode}
                lastStatus={lastStatus}
                isOpen={isAddModalOpen}
                isTrial={isTrial}
                trialExpires={trialExpires}
                isEdit={false}
                onRequestClose={closeAddModal}
            />
        </>
    );
};

// @ts-ignore
export default HomePanelScrollBoxItem;