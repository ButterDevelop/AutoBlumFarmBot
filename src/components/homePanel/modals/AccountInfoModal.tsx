import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
// @ts-ignore
import Modal from 'react-modal';
import { AccountModalPropsCommon } from '../../../constants/types';
import AddAccountModal from './AddAccountModal'; // Import the modified AddAccountModal
import { useGeo} from "../../common/providers/GeoProvider";
import {FamilyFontBase} from "../../styled/styled";
import {useTranslation} from "react-i18next";
import {changeLanguage} from "../../../i18n";
import {string} from "prop-types";
import {formatInTimeZone} from "date-fns-tz";

const StyledModal = styled(Modal)`
    ${FamilyFontBase};
    position: fixed;
    top: 50%;
    left: 50%;
    right: auto;
    bottom: auto;
    width: 80%;
    padding: 2vw;
    transform: translate(-50%, -50%);
    background-color: #1F2329; /* Background color matching the image */
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
    position: absolute;
    top: 1vw;
    right: 1vw;
    background: none;
    border: none;
    color: #e0e0e0;
    font-size: 2em;
    cursor: pointer;

    &:hover {
        color: #cccccc; /* Lighter shade on hover */
    }
`;

const EditButton = styled.button`
    position: absolute;
    top: 1vw;
    left: 1vw;
    background: none;
    border: none;
    color: #e0e0e0;
    font-size: 1.5em;
    cursor: pointer;

    &:hover {
        color: #cccccc; /* Lighter shade on hover */
    }
`;

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2vw;
    color: #e0e0e0;
`;

const UserName = styled.h2`
    margin-top: 10px;
    font-size: 1.5em;
    text-align: center; /* Center align text */
    width: 100%; /* Take full width */
`;

const InfoRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 1vw;
`;

const InfoBlock = styled.div`
    padding: 2vw;
    margin: 1vw;
    background: #3b4450; /* Dark background for info blocks */
    border-radius: 10px;
    width: 48%; /* Take half of the row width */
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
`;

const LargeInfoBlock = styled.div`
    padding: 2vw;
    margin-left: 1vw;
    background: #3b4450; /* Dark background for info blocks */
    border-radius: 10px;
    width: 92%; /* Take full row width */
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    margin-bottom: 1vw;
`;

const InfoLabel = styled.div`
    font-size: 0.85em;
    color: #cccccc; /* Light grey color */
    text-align: center; /* Left align text */
`;

const InfoValue = styled.div`
    font-size: 1.3em;
    font-weight: bold;
    color: #d0d0d0;
    padding-top: 0.5vw;
    text-align: center; /* Left align text */
`;

const CopyButton = styled.button`
    background: #ffbf00; /* Yellow background */
    border: none;
    border-radius: 5px;
    margin-top: 1vw;
    color: #444;
    cursor: pointer;
    padding: 0.1em;
    font-size: 1em;
    font-weight: bold;

    &:hover {
        background: #e6a800; /* Darker yellow on hover */
    }
`;

const AccountInfoModal: React.FC<AccountModalPropsCommon> = ({
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
                                                                 isOpen,
                                                                 isEdit,
                                                                 isTrial,
                                                                 trialExpires,
                                                                 onRequestClose
                                                             }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const { geos } = useGeo();

    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const formattedTrialExpires = formatInTimeZone(new Date(trialExpires), userTimeZone, 'dd.MM.yyyy HH:mm:ss');

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink);
        alert(t('#%ALERT_ACCOUNT_INFO_MODAL_COPY_BLUM_REF%#'));
    };

    const handleEditClick = () => {
        setIsEditModalOpen(true);
        onRequestClose(); // Close the current modal
    };

    const { t, i18n } = useTranslation();

    const countryName = geos.find(geo => geo.countryCode === countryCode)?.countryName || t('#%LABEL_ACCOUNT_INFO_MODAL_UNKNOWN_COUNTRY%#');

    return (
        <>
            <StyledModal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                contentLabel={t('#%LABEL_ACCOUNT_INFO_MODAL_UNKNOWN_COUNTRY%#')}
                ariaHideApp={false}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)' // Set the transparency level for the overlay here
                    },
                    content: {
                        borderRadius: '10px',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
                    }
                }}
            >
                <CloseButton onClick={onRequestClose}>&times;</CloseButton>
                <EditButton onClick={handleEditClick}>&#9998;</EditButton>
                <ModalContent>
                    {profileImg}
                    <UserName>{customUsername}</UserName>
                    <LargeInfoBlock>
                        <InfoLabel>{t('#%LABEL_ACCOUNT_INFO_MODAL_COUNTRY%#')}</InfoLabel>
                        <InfoValue>{countryName}</InfoValue>
                    </LargeInfoBlock>
                    <InfoRow>
                        <InfoBlock>
                            <InfoLabel>{t('#%LABEL_ACCOUNT_INFO_MODAL_BALANCE%#')}</InfoLabel>
                            <InfoValue>{balance} BP</InfoValue>
                        </InfoBlock>
                        <InfoBlock>
                            <InfoLabel>{t('#%LABEL_ACCOUNT_INFO_MODAL_TODAY%#')}</InfoLabel>
                            <InfoValue>{earnedToday} BP</InfoValue>
                        </InfoBlock>
                    </InfoRow>
                    <InfoRow>
                        <InfoBlock>
                            <InfoLabel>{t('#%LABEL_ACCOUNT_INFO_MODAL_LINK%#')}</InfoLabel>
                            <CopyButton onClick={handleCopy}>{t('#%BUTTON_ACCOUNT_INFO_MODAL_COPY%#')}</CopyButton>
                        </InfoBlock>
                        <InfoBlock>
                            <InfoLabel>{t('#%LABEL_ACCOUNT_INFO_MODAL_COUNT%#')}</InfoLabel>
                            <InfoValue>{referralCount}</InfoValue>
                        </InfoBlock>
                    </InfoRow>
                    <InfoRow>
                        <InfoBlock>
                            <InfoLabel>{t('#%LABEL_ACCOUNT_INFO_MODAL_LAST_STATUS%#')}</InfoLabel>
                            <InfoValue>{t(lastStatus)}</InfoValue>
                        </InfoBlock>
                        <InfoBlock>
                            <InfoLabel>{t('#%LABEL_ACCOUNT_INFO_MODAL_NEAREST_WORK_IN%#')}</InfoLabel>
                            <InfoValue>{nearestWorkIn}</InfoValue>
                        </InfoBlock>
                    </InfoRow>

                    {isTrial && (
                        <LargeInfoBlock style={{marginTop: '1vw'}}>
                            <InfoLabel>{t('#%LABEL_ACCOUNT_INFO_MODAL_TRIAL_EXPIRES%#')}</InfoLabel>
                            <InfoValue>{formattedTrialExpires}</InfoValue>
                        </LargeInfoBlock>
                    )}
                </ModalContent>
            </StyledModal>
            <AddAccountModal
                id={id}
                profileImg={profileImg}
                customUsername={customUsername}
                blumUsername={blumUsername}
                balance={balance}
                tickets={tickets}
                referralCount={referralCount}
                referralLink={referralLink}
                earnedToday={earnedToday}
                blumAuthData={blumAuthData}
                tookDailyReward={tookDailyReward}
                nearestWorkIn={nearestWorkIn}
                countryCode={countryCode}
                lastStatus={lastStatus}
                isOpen={isEditModalOpen}
                onRequestClose={() => setIsEditModalOpen(false)}
                isEdit={true} // Pass the isEdit flag
                isTrial={isTrial}
                trialExpires={trialExpires}
             />
        </>
    );
};

export default AccountInfoModal;
