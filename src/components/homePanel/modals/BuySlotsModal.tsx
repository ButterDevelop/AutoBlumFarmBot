import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// @ts-ignore
import Modal from 'react-modal';
import useFetchSlotPrice from "../../../hooks/useFetchSlotPrice";
import useBuySlots from "../../../hooks/useBuySlots";
import { useAccounts} from "../../common/providers/AccountsProvider";
import useUserMe from "../../../hooks/useUserMe";
import {FamilyFontBase, MyHR} from "../../styled/styled";
import {useTranslation} from "react-i18next";
import ModalMessage from "../../common/helpers/ModalMessage";

const StyledModal = styled(Modal)`
    ${FamilyFontBase};
    position: fixed;
    top: 50%;
    left: 50%;
    width: 80%;
    right: auto;
    bottom: auto;
    transform: translate(-50%, -50%);
    background-color: #1F2329;
    padding: 2vw 4vw 2vw 4vw;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    color: #eee;
`;

const Header = styled.h2`
    margin: 0;
    font-size: 1.5em;
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

const SlotsContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: -1rem;
`;

const SlotInput = styled.input`
    padding-top: 2vw;
    font-size: 1.5em;
    width: 15vw;
    text-align: center;
    background: transparent;
    border: none;
    color: #eee;
    outline: none;

    /* Убираем стрелки увеличения/уменьшения для Chrome, Safari, Edge и Opera */
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Убираем стрелки увеличения/уменьшения для Firefox */
    -moz-appearance: textfield;
`;

const SlotText = styled.span`
    padding-top: 1.4vw;
    font-size: 1.5em;
    white-space: pre-wrap;
`;

const PriceText = styled.p`
    font-size: 1.3em;
    margin-top: 4.15vh;
    margin-left: 4vw;
    color: #999;
    white-space: pre-wrap;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 2vw;
`;

const SlotButton = styled.button`
    background: #3b4450; /* Dark button background */
    color: #e0e0e0;
    border: none;
    margin-right: 0.5vw;
    margin-left: 0.5vw;
    border-radius: 5px;
    cursor: pointer;
    flex: 1;
    padding: 2vw;
    font-size: 1em;

    &:hover {
        background: #444; /* Slightly lighter on hover */
    }
`;

const BuyButton = styled.button`
    background: #4caf50; /* Green background */
    color: #eee;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    padding: 2vw;
    margin-bottom: 1vw;
    width: 99%;
    margin-left: 0.5vw;
    height: 10vw;
    font-size: 1.2em;
    font-weight: bold;

    &:hover {
        background: #45a049; /* Darker green on hover */
    }
`;

interface BuySlotsModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onPurchase: () => void;
}

const BuySlotsModal: React.FC<BuySlotsModalProps> = ({ isOpen, onRequestClose, onPurchase }) => {
    const [slotCount, setSlotCount] = useState<number>(1);
    const { price, loading, error } = useFetchSlotPrice(slotCount);
    const { isBuying, buySlotCount, error: buyError } = useBuySlots();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalMessage, setModalMessage] = useState<string>('');
    const [modalType, setModalType] = useState<'info' | 'error'>('info');
    const { refreshAccounts } = useAccounts();
    const { refreshUserMe } = useUserMe();

    useEffect(() => {
        if (isOpen) {
            setSlotCount(1);
        }
    }, [isOpen]);

    useEffect(() => {
        if (slotCount < 1) {
            setSlotCount(1);
        }
    }, [slotCount]);

    const handleSlotChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = parseInt(event.target.value, 10);
        if (!isNaN(value) || event.target.value === '') {
            setSlotCount(value);
        }
    };

    const handleBlur = () => {
        if (slotCount === 0 || isNaN(slotCount)) {
            setSlotCount(1);
        }
    };

    const handleBuy = async () => {
        try {
            await buySlotCount(slotCount);
            refreshAccounts();
            refreshUserMe();
            onPurchase();
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
            contentLabel="Purchase Modal"
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
            <Header>{t('#%LABEL_BUY_SLOTS_MODAL_PURCHASE_SLOTS%#')}</Header>
            <MyHR></MyHR>
            <SlotsContainer>
                <SlotInput
                    type="number"
                    value={slotCount}
                    onChange={handleSlotChange}
                    onBlur={handleBlur}
                />
                <SlotText>{slotCount > 1 ? t('#%LABEL_BUY_SLOTS_MODAL_SLOTS%#') : t('#%LABEL_BUY_SLOTS_MODAL_SLOT%#')}</SlotText>
                <PriceText>
                    {loading ? t('#%LABEL_BUY_SLOTS_MODAL_LOADING%#') : error ? (t('#%LABEL_BUY_SLOTS_MODAL_ERROR%#') + `${error}`) : `≈ ${price} $`}
                </PriceText>
            </SlotsContainer>
            <ButtonContainer>
                <SlotButton onClick={() => setSlotCount(1)}>1 {t('#%BUTTON_BUY_SLOTS_MODAL_SLOT%#')}</SlotButton>
                <SlotButton onClick={() => setSlotCount(5)}>5 {t('#%BUTTON_BUY_SLOTS_MODAL_SLOTS%#')}</SlotButton>
                <SlotButton onClick={() => setSlotCount(10)}>10 {t('#%BUTTON_BUY_SLOTS_MODAL_SLOTS%#')}</SlotButton>
            </ButtonContainer>
            <BuyButton onClick={handleBuy} disabled={isBuying}>
                {isBuying ?  t('#%LABEL_BUY_SLOTS_MODAL_BUYING%#') : t('#%LABEL_BUY_SLOTS_MODAL_BUY%#')}
            </BuyButton>
            <ModalMessage
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                onConfirm={() => {
                    setIsModalOpen(false);
                }}
                onDecline={() => {
                    setIsModalOpen(false);
                }}
                title={modalType === 'error' ? t('#%Error%#') : t('#%Information%#')}
                message={modalMessage}
                type={modalType}
            />
        </StyledModal>
    );
};

export default BuySlotsModal;