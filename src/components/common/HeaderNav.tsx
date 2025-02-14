import React, { useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components";
import Select, { StylesConfig } from 'react-select';
// @ts-ignore
import Flag from 'react-world-flags';
import { useUser } from "./providers/UserProvider";
import { FamilyFontBase } from "../styled/styled";
import useFetchAllAvailableLanguages from "../../hooks/useFetchAllAvailableLanguages";
import { mapLanguageToCountry } from "../../utils/translationUtils";
import useChangeLanguage from "../../hooks/useChangeLanguage";
import useUserMe from "../../hooks/useUserMe";
import { useTranslation } from 'react-i18next';
import { changeLanguage } from "../../i18n";

const NavContainer = styled.div`
    ${FamilyFontBase};
    position: relative;
    width: 100%;
    height: 7vh;
    color: #faf8f8;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: rgb(42, 48, 57);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
`;

const NavList = styled.ul`
    display: flex;
    width: 100%;
    padding: 0;
    align-items: center;
`;

const NavItem = styled.li`
    list-style: none;
    display: flex;
    justify-content: space-evenly;
    margin-right: 10px;

    a {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        text-decoration: none;
        color: rgba(204, 204, 204, 0.35);
        transition: color 0.5s;

        .icon {
            font-size: 4vh;
            margin-top: 7px;
        }
    }

    .control:focus {
        outline: none;
    }

    &.active a .icon {
        color: #DDDDDD;
        animation: pulse;
        animation-duration: 0.5s;
    }
`;

const NavBalanceContainer = styled.div`
    display: flex;
    align-items: center;
    margin-right: 8vw;
`;

const NavBalance = styled.div`
    color: #dedede;
    font-size: 2.5vh;
`;

const customStyles: StylesConfig<any, false> = {
    control: (base) => ({
        ...base,
        backgroundColor: '#2a3039',
        borderColor: '#2a3039',
        color: '#faf8f8',
        caretColor: 'transparent',
        marginLeft: '4vw',
        boxShadow: 'none',
    }),
    singleValue: (base) => ({
        ...base,
        color: '#faf8f8',
    }),
    menu: (base) => ({
        ...base,
        backgroundColor: '#2a3039',
        color: '#faf8f8',
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isFocused ? '#3a3f49' : '#2a3039',
        color: '#faf8f8',
    }),
};

interface LanguageOption {
    value: string;
    label: JSX.Element;
}

export const HeaderNav: React.FC = () => {
    const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption | null>(null);
    const { isChanging, changeLang, error: changeError } = useChangeLanguage();
    const navContainerRef = useRef<HTMLDivElement>(null);
    const [translationsLoaded, setTranslationsLoaded] = useState(false);

    const { user, loading, error } = useUser();
    const { refreshUserMe } = useUserMe();
    const { languages, loading: languagesLoading, error: languagesError } = useFetchAllAvailableLanguages();
    const { t, i18n } = useTranslation();

    useEffect(() => {
        if (user?.languageCode && languages) {
            const selectedLanguageOption = Object.keys(languages).map(key => ({
                value: key,
                label: (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Flag code={mapLanguageToCountry(key)} style={{ marginRight: 10, width: 20, height: 20 }} />
                        {languages[key]}
                    </div>
                ),
            })).find(option => option.value === user.languageCode);
            setSelectedLanguage(selectedLanguageOption || null);
            if (!translationsLoaded) {
                changeLanguage(user.languageCode);
                setTranslationsLoaded(true)
            }
        } else {
            changeLanguage('en');
        }
    }, [user, languages]);

    const handleLanguageChange = async (selectedOption: LanguageOption) => {
        const success = await changeLang(selectedOption.value);
        if (success) {
            await refreshUserMe();
            setSelectedLanguage(selectedOption);
            await changeLanguage(selectedOption.value);
        }
    };

    let balanceContent;
    if (loading) {
        balanceContent = <NavBalance>Loading...</NavBalance>;
    } else if (error) {
        balanceContent = <NavBalance>Error</NavBalance>;
    } else if (user) {
        balanceContent = <NavBalance>${user.balanceUSD.toFixed(2)}</NavBalance>;
    } else {
        balanceContent = <NavBalance>N/A</NavBalance>;
    }

    let languageSelectContent;
    if (languagesLoading) {
        languageSelectContent = <div>{t('Loading languages...')}</div>;
    } else if (languagesError) {
        languageSelectContent = <div>{t('Error loading languages')}</div>;
    } else {
        let languageOptions: LanguageOption[] = Object.keys(languages).map(key => ({
            value: key,
            label: (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Flag code={mapLanguageToCountry(key)} style={{ marginRight: 10, width: 20, height: 20 }} />
                    {languages[key]}
                </div>
            ),
        }));

        if (selectedLanguage) {
            const foundLanguage = languageOptions.find(option => option.value === selectedLanguage.value);
            if (foundLanguage) {
                languageOptions = [
                    foundLanguage,
                    ...languageOptions.filter(option => option.value !== selectedLanguage.value),
                ];
            }
        }

        languageSelectContent = (
            <Select
                options={languageOptions}
                styles={customStyles}
                onChange={handleLanguageChange}
                value={selectedLanguage}
            />
        );
    }

    return (
        <NavContainer ref={navContainerRef}>
            <NavList>
                <NavItem>
                    {languageSelectContent}
                </NavItem>
            </NavList>

            <NavBalanceContainer>
                {balanceContent}
            </NavBalanceContainer>
        </NavContainer>
    );
};
