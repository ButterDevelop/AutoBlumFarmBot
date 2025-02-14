import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FamilyFontBase, ScrollBoxItemContainerBase, ScrollBoxItemRightCommonButton } from '../../styled/styled';
import { EmptyScrollBoxItemProps } from "../../../constants/types";


const EmptyAccountScrollBoxItemContainer = styled(ScrollBoxItemContainerBase)`
    ${FamilyFontBase};
    background-color: #46505d;
    opacity: 0.5;
`;

const AddAccountContent = styled.div`
    font-weight: bold;
    color: #fff;
    font-size: 4vw;
    margin-left: 2vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const EmptyAccountScrollBoxItem: React.FC<EmptyScrollBoxItemProps> = ({
                                                                          onAddModalOpen,
                                                                          isTrial
                                                                      }) => {
    const { t, i18n } = useTranslation();

    return (
        <EmptyAccountScrollBoxItemContainer onClick={onAddModalOpen}>
            <AddAccountContent>{isTrial ? t('#%LABEL_EMPTY_ACCOUNT_SCROLL_BOX_ITEM_TRIAL_ACCOUNT%#') : t('#%LABEL_EMPTY_ACCOUNT_SCROLL_BOX_ITEM_ADD_YOUR_ACCOUNT%#')}</AddAccountContent>
            <ScrollBoxItemRightCommonButton>
                <img src="plus-tin.svg" alt="Icon" />
            </ScrollBoxItemRightCommonButton>
        </EmptyAccountScrollBoxItemContainer>
    );
};

export default EmptyAccountScrollBoxItem;