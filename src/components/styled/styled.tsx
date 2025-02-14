import styled, { css } from "styled-components";

export const FamilyFontBase = css`
    font-family: 'Roboto Mono', monospace;
`;

export const MyHR = styled.hr`
  border: none;
  border-top: 1px solid rgba(255,255,255,.3);
  border-bottom: 1px solid rgba(0,0,0,.08);
  position: relative;
`;

export const ScrollBoxItemContainerBase = styled.div`
    position: relative;
    height: 15vw;
    width: 80vw;
    max-width: 80vw;
    border-radius: 5px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    margin: 1vw;
    padding-left: 2vw;
`;

export const ScrollBoxItemRightCommonButton = styled.button`
    border: none;
    height: 8vw;
    width: 8vw;
    outline: none;
    background-color: white;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.3;
    margin-right: 10px;

    &:hover {
        cursor: pointer;
        opacity: 0.6;
    }

    &:active {
        transform: scale(0.97);
    }

    & img {
        height: 6vw; /* Настройте это значение для лучшего соответствия кнопке */
    }
`;

export const SlotButton = styled.button`
    background: #3b4450; /* Dark button background */
    color: #eee;
    border: none;
    margin-right: 0.5vw;
    margin-left: 0.5vw;
    border-radius: 5px;
    cursor: pointer;
    flex: 1;
    padding: 2vw;
    font-size: 0.9em;
    min-width: 5vw; /* Ensure buttons are not too small on smaller screens */
`;

