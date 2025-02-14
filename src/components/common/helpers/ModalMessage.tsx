import React from 'react';
// @ts-ignore
import Modal from 'react-modal';
import styled from 'styled-components';
import {FamilyFontBase, MyHR} from "../../styled/styled";
import {useTranslation} from "react-i18next";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '4vw 4vw 0vw 4vw',
        backgroundColor: '#1F2329',
        borderRadius: '10px',
        height: 'fit-content',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        color: '#fff',
        border: 'none'
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)'
    }
};

const Header = styled.h2`
    ${FamilyFontBase};
    margin: 0 0 1em 0;
    font-size: 1.3em;
    color: #ddd;
`;

const Message = styled.p`
    ${FamilyFontBase};
    font-size: 1.1em;
    color: #eee;
    margin-bottom: 1em;
`;

const MessageSmall = styled.p`
    ${FamilyFontBase};
    font-size: 0.8em;
    color: #989797;
    margin-bottom: 1em;
`;

const CloseButton = styled.button<{ variant: 'info' | 'error' }>`
    ${FamilyFontBase};
    background: ${(props) => (props.variant === 'error' ? '#f44336' : '#2196f3')};
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    padding: 0.5em 0.5em;
    font-size: 1.2em;
    font-weight: bold;
    width: 100%;
    margin-bottom: 1em;

    &:hover {
        background: ${(props) => (props.variant === 'error' ? '#e53935' : '#1e88e5')};
    }
`;

const SmallButton = styled.button<{ variant: 'info' | 'error' | 'warning' }>`
    ${FamilyFontBase};
    background: ${(props) =>
            props.variant === 'error' ? '#f44336' :
                    props.variant === 'warning' ? '#ff9800' :
                            '#2196f3'};
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    padding: 0.5em 0.5em;
    font-size: 1.2em;
    font-weight: bold;
    width: 48%;
    margin-bottom: 1em;

    &:hover {
        background: ${(props) =>
                props.variant === 'error' ? '#e53935' :
                        props.variant === 'warning' ? '#fb8c00' :
                                '#1e88e5'};
    }
`;

interface ModalMessageProps {
    isOpen: boolean;
    onConfirm: () => void;
    onDecline: () => void;
    onRequestClose: () => void;
    title: string;
    message: string;
    type?: 'info' | 'error' | 'warning';
}

const ModalMessage: React.FC<ModalMessageProps> = ({ isOpen, onRequestClose, onConfirm, onDecline,title, message, type = 'info' }) => {

    const { t, i18n } = useTranslation();

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel={title}
            ariaHideApp={false}
        >
            <Header>{title}</Header>
            <MyHR></MyHR>
            <Message>{message}</Message>
            {type === 'warning' ? (
            <div>
                    <MessageSmall>{t('#%MODAL_MESSAGE_MORE_INFORMATION%#')}</MessageSmall>
                    <SmallButton onClick={onDecline} variant="error">
                        {t('#%No%#')}
                    </SmallButton>
                    <SmallButton style={{marginLeft: '3vw'}} onClick={onConfirm} variant="info">
                        {t('#%Yes%#')}
                    </SmallButton>
            </div>
            ) : (
                <CloseButton onClick={onRequestClose} variant={type}>
                    {type === 'error' ? t('#%Close%#') : t('#%Okay%#')}
                </CloseButton>
            )}
        </Modal>
    );
};

export default ModalMessage;
