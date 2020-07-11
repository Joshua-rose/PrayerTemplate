import React from 'react';
import Styled from 'styled-components';

interface Props {
    onClick: (e?: any) => void;
    buttonType?: string;
}
const StyledButton = Styled.button`
    &.primary {
        background-color: #1C6E8C;
        color: white;
    }
    &.secondary, &.timer {
        background-color: #A3C4BC;
        color:#1F1300;
    }
`;

const Button : React.FunctionComponent<Props> = ({ onClick, buttonType, children }) => (
  <StyledButton type={buttonType && /submit/i.test(buttonType) ? 'submit' : 'button'} className={buttonType} onClick={onClick}>
    {children}
  </StyledButton>
);

export default Button;
