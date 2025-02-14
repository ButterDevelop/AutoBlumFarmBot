import React, { useRef, ReactNode } from 'react';
import styled from 'styled-components';
import {FamilyFontBase} from "../../styled/styled";

const ScrollBoxWrapper = styled.div`
  max-height: 64vh;
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

interface ScrollBoxProps {
    children: ReactNode[];
}

const ScrollBoxItem = styled.div`
    ${FamilyFontBase};
`;

export const ScrollBox: React.FC<ScrollBoxProps> = ({ children }) => {
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