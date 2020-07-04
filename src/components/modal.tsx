import React from 'react';
import Styled from 'styled-components';

const StyledModalBackground = Styled.div`
    position: absolute;
    z-index: 9999;
    top: 0;
    left: 0;
    right:0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center

`;
const StyledModal = Styled.div`
display: flex;
    min-height: 100px;
    min-width: 200px;
    max-width: 50vw;
    text-align: center;
    background-color: white;
    padding: 10px;
    border-radius: 10px;
    flex-direction: column;
    .buttons {
        display:flex;
        flex-direction:row;
        justify-contents: space-evenly;
    }
`;

interface Props {

}
const Modal: React.FunctionComponent<Props> = ({ children }) => (
  <StyledModalBackground>
    <StyledModal>
      {children}
    </StyledModal>
  </StyledModalBackground>
);
export default Modal;
