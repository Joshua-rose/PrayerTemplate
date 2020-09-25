import React from 'react';
import Styled from 'styled-components';
import { ReactComponent as Music } from '../assets/Icon awesome-music.svg';
import { ReactComponent as MenuIcon } from '../assets/Icon material-more-vert.svg';
import { ReactComponent as Pause } from '../assets/Icon material-pause.svg';
import { ReactComponent as Reset } from '../assets/Icon awesome-redo-alt.svg';
import { ReactComponent as Play } from '../assets/Icon material-play-arrow.svg';
import { ReactComponent as Next } from '../assets/Icon material-skip-next.svg';

const ContributionContainer = Styled.div`
  background-color: white;
  border-radius: 1rem;
  margin-bottom:1rem;
  padding: 2% 4%;
  min-height: 3rem;
  display:flex;
  `;
  const IconHolder = Styled(ContributionContainer)`
width:40%;
flex-direction:column;
h3 {
    font-family:'Papyrus',san-serif;
}
`;
const Icons = Styled.div`
    display:flex;
    flex-direction:rows;
    justify-content: space-between;
`;
const LinkHolder = Styled(ContributionContainer)`
  width:100%;
  align-items: center;
`;
const AttributionCenter = Styled.div`
    display:flex;
    position:absolute;
    bottom:0;
    left:0;
    right:0;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 1rem;
    svg {
      path {
        fill: #4853ec !important;

      }
    }
`;

export default function Attribution() {
  return (
    <AttributionCenter>
      <IconHolder>
        <h3>Material Icons</h3>
        <Icons>
          <Play />
          <Pause />
          <Next />
          <MenuIcon />
        </Icons>
      </IconHolder>
      <IconHolder>
        <h3>Awesome Icons</h3>
        <Icons>
          <Music />
          <Reset />
        </Icons>
      </IconHolder>
      <LinkHolder>
        <a href="https://www.freepik.com/vectors/hand">Hand vector created by freepik - www.freepik.com</a>
      </LinkHolder>
      <LinkHolder>
        <Music></Music>&nbsp;&nbsp;
        &quot;Notification Up&quot; from FoolBoyMedia on&nbsp;
        <a href="https://freesound.org/people/FoolBoyMedia/sounds/234564/"> FreeSound</a>
      </LinkHolder>
    </AttributionCenter>
  );
}
