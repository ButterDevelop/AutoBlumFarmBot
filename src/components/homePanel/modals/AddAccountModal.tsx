import React, { useEffect, useState } from 'react';
// @ts-ignore
import Modal from 'react-modal';
import styled from 'styled-components';
import { AccountModalPropsCommon } from '../../../constants/types';
import useUpdateAccount from '../../../hooks/useUpdateAccount';
import { useAccounts } from '../../common/providers/AccountsProvider';
import { useGeo } from '../../common/providers/GeoProvider';
import {FamilyFontBase, MyHR} from '../../styled/styled';
import { useTranslation } from 'react-i18next';
import ModalMessage from "../../common/helpers/ModalMessage";

const StyledModal = styled(Modal)`
    ${FamilyFontBase};
    position: fixed;
    top: 50%;
    left: 50%;
    right: auto;
    bottom: auto;
    width: 80%;
    padding: 2vw 4vw 2vw 4vw;
    transform: translate(-50%, -50%);
    background-color: #1F2329;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
    margin-top: 2.5vw;
    padding: 0vw;
`;

const Label = styled.label`
    display: block;
    font-size: 0.9em;
    color: #cccccc;
    padding-left: 0.5vw;
    padding-bottom: 0.5vw;
    font-weight: bold;
`;

const Input = styled.input<{ hasError: boolean }>`
    width: 97%;
    border: 1px solid ${(props) => (props.hasError ? 'red' : '#ccc')};
    border-radius: 5px;
    background: #3b4450;
    padding-top: 2vw;
    padding-left: 2vw;
    font-size: 1em;
    padding-bottom: 2vw;
    color: #d0d0d0;
`;

const Select = styled.select<{ hasError: boolean }>`
    width: 100%;
    border-radius: 5px;
    border: 1px solid ${(props) => (props.hasError ? 'red' : '#ccc')};
    background: #3b4450;
    padding-top: 2vw;
    padding-left: 1vw;
    font-size: 1em;
    padding-bottom: 2vw;
    color: #d0d0d0;
`;

const ErrorText = styled.div`
    color: red;
    margin-top: 0.5vw;
    font-size: 0.9em;
`;

const Button = styled.button`
    margin-top: 3.0vw;
    background: #0d6efd;
    color: #eee;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    padding: 2vw;
    margin-bottom: 1vw;
    width: 100%;
    height: 10vw;
    font-size: 1.2em;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background: #0c6efd;
    }

    &:disabled {
        cursor: not-allowed;
    }
`;

const Header = styled.h2`
    margin: 0;
    font-size: 1.5em;
    color: #eee;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 1vw;
    right: 1vw;
    background: none;
    border: none;
    color: #d0d0d0;
    font-size: 2em;
    cursor: pointer;

    &:hover {
        color: #ccc;
    }
`;

const Spinner = styled.div`
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top: 2px solid #fff;
    width: 0.8em;
    height: 0.8em;
    animation: spin 1s linear infinite;
    display: inline-block;
    margin-left: 0.5em;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

const AddAccountModal: React.FC<AccountModalPropsCommon & { isEdit?: boolean }> = ({
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
                                                                                       countryCode,
                                                                                       lastStatus,
                                                                                       nearestWorkIn,
                                                                                       isOpen,
                                                                                       isEdit = false,
                                                                                       onRequestClose,

                                                                                   }) => {
    const [authToken, setAuthToken] = useState<string>(blumAuthData || '');
    const [countryCodeSelected, setCountryCodeSelected] = useState<string>(countryCode || '');
    const [cstUsername, setCstUsername] = useState<string>(customUsername || '');
    const [errors, setErrors] = useState<{ username?: string; authToken?: string; countryCode?: string }>({});
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalMessage, setModalMessage] = useState<string>('');
    const [modalType, setModalType] = useState<'info' | 'error'>('info');
    const { geos, loading, error } = useGeo();
    const { isUpdating, updateAccountDetails, updateError } = useUpdateAccount();
    const { refreshAccounts } = useAccounts();

    useEffect(() => {
        if (isEdit) {
            setAuthToken(blumAuthData || '');
            setCountryCodeSelected(countryCode || '');
            setCstUsername(customUsername || '');
        }
    }, [isEdit, blumAuthData, countryCode, customUsername]);

    useEffect(() => {
        if (updateError) {
            setModalMessage(updateError);
            setModalType('error');
            setIsModalOpen(true);
        }
    }, [updateError]);

    const validateFields = () => {
        const newErrors: { username?: string; authToken?: string; countryCode?: string } = {};
        if (!cstUsername) {
            newErrors.username = t('#%LABEL_ADD_ACCOUNT_MODAL_USERNAME_IS_REQUIRED%#')
        }
        if (!authToken) {
            newErrors.authToken = t('#%LABEL_ADD_ACCOUNT_MODAL_AUTH_TOKEN_IS_REQUIRED%#')
        }
        if (!countryCodeSelected) {
            newErrors.countryCode = t('#%LABEL_ADD_ACCOUNT_MODAL_COUNTRY_IS_REQUIRED%#')
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateFields()) {
            return;
        }
        try {
            await updateAccountDetails(id, {
                customUsername: cstUsername,
                countryCode: countryCodeSelected,
                blumTelegramAuth: authToken
            });
            refreshAccounts();
            onRequestClose();
        } catch (error) {
            // @ts-ignore
            setModalMessage(error.message);
            setModalType('error');
            setIsModalOpen(true);
        }
    };

    const { t, i18n } = useTranslation();

    return (
        <StyledModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel={isEdit ? t('#%LABEL_ADD_ACCOUNT_MODAL_EDIT_ACCOUNT%#') : t('#%LABEL_ADD_ACCOUNT_MODAL_ADD_ACCOUNT%#')}
            ariaHideApp={false}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                },
                content: {
                    borderRadius: '10px',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
                }
            }}
        >
            <CloseButton onClick={onRequestClose}>&times;</CloseButton>
            <Header>{isEdit ? t('#%LABEL_ADD_ACCOUNT_MODAL_EDIT_ACCOUNT%#') : t('#%LABEL_ADD_ACCOUNT_MODAL_ADD_ACCOUNT%#')}</Header>
            <MyHR></MyHR>
            <form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>{t('#%LABEL_ADD_ACCOUNT_MODAL_CUSTOM_USERNAME%#')}</Label>
                    <Input
                        type="text"
                        value={cstUsername}
                        onChange={(e) => setCstUsername(e.target.value)}
                        hasError={!!errors.username}
                    />
                    {errors.username && <ErrorText>{errors.username}</ErrorText>}
                </FormGroup>
                <FormGroup>
                    <Label>{t('#%LABEL_ADD_ACCOUNT_MODAL_AUTH_TOKEN%#')}</Label>
                    <Input
                        type="text"
                        value={authToken}
                        onChange={(e) => setAuthToken(e.target.value)}
                        hasError={!!errors.authToken}
                    />
                    {errors.authToken && <ErrorText>{errors.authToken}</ErrorText>}
                </FormGroup>
                <FormGroup>
                    <Label>{t('#%LABEL_ADD_ACCOUNT_MODAL_REGION%#')}</Label>
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>Error loading regions</p>
                    ) : (
                        <Select
                            value={countryCodeSelected}
                            onChange={(e) => setCountryCodeSelected(e.target.value)}
                            hasError={!!errors.countryCode}
                        >
                            <option value="" disabled>
                                Select a country
                            </option>
                            {geos.map((geo) => (
                                <option key={geo.countryCode} value={geo.countryCode}>
                                    {geo.countryName}
                                </option>
                            ))}
                        </Select>
                    )}
                    {errors.countryCode && <ErrorText>{errors.countryCode}</ErrorText>}
                </FormGroup>
                <Button type="submit" disabled={isUpdating}>
                    {isUpdating ? (
                        <>
                            {isEdit ? t('#%LABEL_ADD_ACCOUNT_MODAL_SAVING%#') : t('#%LABEL_ADD_ACCOUNT_MODAL_ADDING%#')}
                            <Spinner />
                        </>
                    ) : (
                        isEdit ? t('#%LABEL_ADD_ACCOUNT_MODAL_SAVE%#') : t('#%LABEL_ADD_ACCOUNT_MODAL_ADD%#')
                    )}
                </Button>
            </form>
            <ModalMessage
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                onConfirm={() => {
                    setIsModalOpen(false);
                }}
                onDecline={() => {
                    setIsModalOpen(false);
                }}
                title={modalType === 'error' ? t('Error') : t('Information')}
                message={modalMessage}
                type={modalType}
            />
        </StyledModal>
    );
};

export default AddAccountModal;
