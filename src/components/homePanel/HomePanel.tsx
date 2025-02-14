import React from 'react';
import styled from 'styled-components';
import { ScrollBox } from "../common/helpers/ScrollBox";
import HomePanelScrollBoxItem from './HomePanelScrollBoxItem';
import AddAccountButton from './subComponents/AddAccountButton';
import BlumPointsPanel from './subComponents/BlumPointsPanel';
import LoadingScreen from '../common/messages/LoadingScreen';
import ProfileImage from './common/ProfileImage';
import { useAccounts } from "../common/providers/AccountsProvider";
import { FamilyFontBase } from "../styled/styled";
import TrialButton from "./TrialButton";
import { useUser } from "../common/providers/UserProvider";

const HomeContainer = styled.div`
    ${FamilyFontBase};
    margin: 2vh auto;
    max-height: 78vh;
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const MainContainer = styled.div`
    ${FamilyFontBase};
    margin: 2vh auto;
    flex: 1;
    max-height: 74vh;
    display: flex;
    flex-direction: column;
`;

const BottomContainer = styled.div`
    ${FamilyFontBase};
    margin: 2vh auto;
    flex: 1;
    max-height: 4vh;
    display: flex;
    flex-direction: column;
`;

function HomePanel() {
    const { accounts, loading, error } = useAccounts();
    //const { user, loadingUser, errorUser } = useUser();

    const addNewAccount = () => {};

    if (loading) {
        return <LoadingScreen />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (accounts.length === 0) {
        return (
            <HomeContainer>
                <MainContainer>
                    <BlumPointsPanel number={accounts.reduce((acc, account) => acc + account.balance, 0)} />
                    <ScrollBox>
                        {accounts.map(({
                                           id,
                                           customUsername,
                                           blumUsername,
                                           balance,
                                           tickets,
                                           referralCount,
                                           referralLink,
                                           blumAuthData,
                                           earnedToday,
                                           tookDailyReward,
                                           nearestWorkIn,
                                           countryCode,
                                           lastStatus,
                                           isTrial,
                                           trialExpires
                                       }) => (
                            <HomePanelScrollBoxItem
                                id={id}
                                key={id}
                                profileImg={<ProfileImage username={customUsername} />}
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
                            />
                        ))}
                        <AddAccountButton onClick={addNewAccount} />
                    </ScrollBox>
                </MainContainer>
                <BottomContainer>
                    <TrialButton accounts={accounts.length} />
                </BottomContainer>
            </HomeContainer>
        );
    }

    return (
        <HomeContainer>
            <BlumPointsPanel number={accounts.reduce((acc, account) => acc + account.balance, 0)} />
            <ScrollBox>
                {accounts.map(({
                                   id,
                                   customUsername,
                                   blumUsername,
                                   balance,
                                   tickets,
                                   referralCount,
                                   referralLink,
                                   blumAuthData,
                                   earnedToday,
                                   tookDailyReward,
                                   nearestWorkIn,
                                   countryCode,
                                   lastStatus,
                                   isTrial,
                                   trialExpires
                               }) => (
                    <HomePanelScrollBoxItem
                        id={id}
                        key={id}
                        profileImg={<ProfileImage username={customUsername} />}
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
                    />
                ))}
                <AddAccountButton onClick={addNewAccount} />
            </ScrollBox>
        </HomeContainer>
    );
}

export default HomePanel;
