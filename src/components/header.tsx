import React, { ReactElement, useState } from 'react';
import Styled from 'styled-components';
import MenuIcon from '../assets/Icon material-more-vert.svg';
import Attribution from './attribution';

const VisibleHeader = Styled.div`
    display: grid;
    grid-template-columns: 1fr 1rem;
    position:relative;
    input {
      position: relative;
      z-index:11;
    }
`;
const Menu = Styled.div`
    // display: ${(props: { display?: string }) => props.display || 'none'};
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    transform: translateX(200%);
    transition: transform 0.3s linear;
    z-index: 10;
    background: radial-gradient(rgba(52,89,149,1) 0%, rgba(43,92,144,1) 33.92%, rgba(0,109,119,1) 100%);
    &.shown {
      transform: translateX(0);
    }
`;

interface props {
  buttons?: { text: string, clickHandler: (arg?: any) => void }[];
}

function Header({ buttons }: props) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div>
      <VisibleHeader>

        <h1>Prayer Template</h1>
        <input type="image" src={MenuIcon} alt="Open Menu" onClick={() => { setMenuOpen(!menuOpen); }} />
      </VisibleHeader>
      <Menu className={menuOpen ? 'shown' : ''}>
        {
          buttons && buttons.map(({ text, clickHandler }) => (
            <button type="button" onClick={() => { setMenuOpen((isOpen) => !isOpen); clickHandler(); }}>{text}</button>
          ))
        }
        <iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1DWVYgpMbMPJMz?theme=0" width="100%" height="380" frameBorder="0" allowTransparency={true} allow="encrypted-media"></iframe>
        <Attribution />
      </Menu>

    </div>
  );
}
Header.defaultProps = {
  buttons: [],
};
export default Header;
