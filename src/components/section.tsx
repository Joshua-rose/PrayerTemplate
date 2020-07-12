import React from 'react';
import Styled from 'styled-components';
import Button from './button';
import background from '../assets/topography.svg';

interface Props {
    title: string;
    time: any; // todo figure out what type time should have
    content: string | JSX.Element;
    isFocused?: boolean;
    isTimerRunning?: boolean;
    isComplete?: boolean;
    togglePlaying: (e?: any) => void;
    proceedToNextSection: (e?: any) => void;
}
const topBottom = 'height: 20vh; max-height:70px;';
const StyledSection = Styled.section`
    header {
        background-image: linear-gradient(113.42deg, #A3C4BC 25.18%, rgba(163, 196, 188, 0.21) 78.54%);
        ${topBottom}
        
    }
    article {
        background-image: url(${background});
        background-size: cover;
        height: 0;
        overflow: auto;
    }
    footer {
         background-color: #8C705F;
        height: 0;
        overflow:hidden;
    }
    &.open {
        footer {
            ${topBottom}
        }
        article {
            height: auto;
            height: calc(90vh - calc(2* min(20vh, 70px)));
            padding: 5vh;

        }
    }
    .complete{
      header {
        background-image: linear-gradient(113.42deg, #c0ff33 25.18%, rgba(163, 196, 188, 0.21) 78.54%);
      }
    }
`;

const StyledTimer = Styled.div`
    position: relative;
    &.playing:after {
      content: "\u23F8";
    }
    &.paused:after {
      content: "\u25B6";
    }
`;

const isSpaceBar = (event: React.KeyboardEvent) => {
  if (event.key === ' ' || event.keyCode === 32) return true;
  return false;
};
const Section = ({
  title, time, content, isTimerRunning, isFocused, togglePlaying, isComplete, proceedToNextSection,
}: Props) => (
  <StyledSection className={`${isFocused ? 'open' : ''}${isComplete ? ' complete' : ''}`}>
    <header onClick={togglePlaying} onKeyDown={(e: React.KeyboardEvent) => { if (isSpaceBar(e)) togglePlaying(); }} role="button" tabIndex={0}>
      <StyledTimer className={`timer ${isTimerRunning ? 'playing' : 'paused'}`}>
        {time}
      </StyledTimer>
      {title}
    </header>
    <article>{content}</article>
    <footer>
      <Button buttonType="primary" onClick={togglePlaying}>
        {isTimerRunning ? 'Pause' : 'Start'}
      </Button>
      <Button buttonType="secondary" onClick={proceedToNextSection}>Next</Button>
    </footer>
  </StyledSection>
);

export default Section;
