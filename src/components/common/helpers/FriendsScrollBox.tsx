import React, { useRef, ReactNode } from 'react';
import styled from 'styled-components';
import {FamilyFontBase} from "../../styled/styled";

const ScrollBoxWrapper = styled.div`
  ${FamilyFontBase};
  max-height: 53vh;
  overflow-y: scroll;
  overflow-x: hidden;
  box-sizing: border-box;
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none;  /* Firefox */

  &::-webkit-scrollbar {
    display: none;  /* Safari and Chrome */
  }
`;

const ScrollBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ScrollBoxItem = styled.div`
    ${FamilyFontBase};
`;

interface ScrollBoxProps {
    children: ReactNode[];
}

export const FriendsScrollBox: React.FC<ScrollBoxProps> = ({ children }) => {
    const scrollWrapperRef = useRef<HTMLDivElement>(null);

    return (
        <ScrollBoxWrapper ref={scrollWrapperRef}>
            <ScrollBoxContainer>
                {children.map((child, i) => (
                    <ScrollBoxItem role="listitem" key={`scroll-box-item-${i}`}>
                        {child}
                    </ScrollBoxItem>
                ))}
            </ScrollBoxContainer>
        </ScrollBoxWrapper>
    );
};