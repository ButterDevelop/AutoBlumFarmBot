import React from 'react';
import styled from 'styled-components';
import { Referral } from "../../constants/types";
import useFetchUserAvatar from "../../hooks/useFetchUserAvatar";
import { FamilyFontBase } from "../styled/styled";

const AccountsReferralScrollBoxItemContainer = styled.div`
    ${FamilyFontBase};
    position: relative;
    height: 15vw;
    border-radius: 5px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #46505d;
    overflow: hidden;
    margin: 1vw;
`;

const ProfileImage = styled.img`
    border-radius: 50%;
    height: 8vw;
    width: 8vw;
    margin-left: 2vw;
    flex-shrink: 0;
`;

const ItemContent = styled.div`
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

const Points = styled.div`
    font-weight: bold;
    color: #fff;
    margin-right: 10px;
    font-size: 5vw;
    flex-shrink: 0;
`;

const AccountsReferralScrollBoxItem: React.FC<Referral> = ({
                                                               id,
                                                               firstName,
                                                               lastName,
                                                               hostEarnings
                                                           }) => {
    const { avatarUrl, loading, error } = useFetchUserAvatar(id);

    return (
        <AccountsReferralScrollBoxItemContainer>
            {loading || error ? (
                <ProfileImage src="user_question.png" alt={loading ? "Loading" : "Error"} />
            ) : (
                <ProfileImage src={avatarUrl!} alt="Profile" />
            )}
            <ItemContent>
                <UserName>{firstName} {lastName}</UserName>
            </ItemContent>
            <Points>{hostEarnings}$</Points>
        </AccountsReferralScrollBoxItemContainer>
    );
};

export default AccountsReferralScrollBoxItem;
