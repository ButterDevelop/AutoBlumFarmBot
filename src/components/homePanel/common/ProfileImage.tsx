import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {FamilyFontBase} from "../../styled/styled";

const hashCode = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
};

const intToRGB = (i: number): string => {
    const c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "000000".substring(0, 6 - c.length) + c;
};

const isLightColor = (hex: string): boolean => {
    const hexColor = parseInt(hex, 16);
    const r = (hexColor >> 16) & 0xff;
    const g = (hexColor >> 8) & 0xff;
    const b = hexColor & 0xff;

    // Используем формулу YIQ для оценки яркости цвета
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128;
};

const invertColor = (hex: string): string => {
    const hexColor = parseInt(hex, 16);
    const r = 255 - ((hexColor >> 16) & 0xff);
    const g = 255 - ((hexColor >> 8) & 0xff);
    const b = 255 - (hexColor & 0xff);
    return ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0').toUpperCase();
};

const getColorFromName = (name: string): string => {
    const hash = hashCode(name);
    let color = intToRGB(hash);
    if (isLightColor(color)) {
        color = invertColor(color);
    }
    return `#${color}`;
};

const ProfileImageContainer = styled.div<{ bgColor: string }>`
    ${FamilyFontBase};
    border-radius: 50%;
    height: 8vw;
    width: 8vw;
    margin: auto;
    color: white;
    font-size: calc(1.5vw + 1.5vh + 1vmin);
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ bgColor }) => bgColor};
`;

const ProfileImage: React.FC<{ username: string }> = ({ username }) => {
    const [bgColor, setBgColor] = useState<string>('');

    useEffect(() => {
        const savedColor = localStorage.getItem(`profile-color-${username}`);
        if (savedColor) {
            setBgColor(savedColor);
        } else {
            const newColor = getColorFromName(username);
            setBgColor(newColor);
            localStorage.setItem(`profile-color-${username}`, newColor);
        }
    }, [username]);

    const firstLetter = username.charAt(0).toUpperCase();

    return (
        <ProfileImageContainer bgColor={bgColor}>
            {firstLetter}
        </ProfileImageContainer>
    );
};

export default ProfileImage;
