import React, { useEffect, useState, useRef } from 'react';
import Styled from 'styled-components';
import Button from './button';
import resetImg from '../assets/Icon awesome-redo-alt.svg';
import pauseImg from '../assets/Icon material-pause.svg';
import nextImg from '../assets/Icon material-skip-next.svg';
import playImg from '../assets/Icon material-play-arrow.svg';

interface Props {
  // todo: handle the header click in section instead of app
  // todo: use ref.current.parent.offsetTop to movc the window to the correct space
  title: string;
  time: any; // todo figure out what type time should have
  content: string | JSX.Element;
  isFocused?: boolean;
  isTimerRunning?: boolean;
  isComplete?: boolean;
  index: number;
  headerClickHandler: (e?: any) => void;
  togglePlaying: (e?: any) => void;
  proceedToNextSection: (e?: any) => void;
  resetTimer: (e?: any) => void;
}
const topBottom = 'height: 20vh; max-height:70px;';
const StyledSection = Styled.section`
    input[type="image"] {
      background:none;
      border:none;
    }
    header {
        background-color:#20BF55;
        color: white;
        padding: 0 20px;
        display: grid;
    align-items: center;
    grid-template-columns: fit-content(100px) 1fr;
    grid-gap: calc(min(30px, 5vw));
    position:sticky;
    top:0;
        ${topBottom}
        
    }
    article {
        background: linear-gradient(220.3deg, rgba(255,247,232,1) 0%, rgba(241,235,225,1) 15.05%, rgba(246,246,246,1) 51.89%, rgba(255,247,232,1) 100%);
        height: 0;
        overflow: auto;
    }
    footer {
         background-color: #7A93AC;
        height: 0;
        overflow:hidden;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        input[type="image"] {
          height: 35%;
          border-radius: none;
        }
    }
    &.open {
        height: 100%;
        footer {
            ${topBottom}
            position: sticky;
            bottom:0;
        }
        article {
            // height: auto;
            height: calc(100vh - min(40vh, 140px));
            padding: calc(10px + min(20vh, 70px)) 5vh;
        }
    }
    .complete{
      header {
        background-image: linear-gradient(113.42deg, #c0ff33 25.18%, rgba(163, 196, 188, 0.21) 78.54%);
      }
    }
    &.running {
      header {
        background-color: #1F1300;
        color: #fff;
      }
    }
`;

const isSpaceBar = (event: React.KeyboardEvent) => {
  if (event.key === ' ' || event.keyCode === 32) return true;
  return false;
};
function Section(props: Props) {
  const {
    title, time, content,
    isTimerRunning, isFocused, togglePlaying,
    isComplete, proceedToNextSection, resetTimer,
    headerClickHandler, index,
  } = props;

  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (isFocused) {
      console.dir(ref ? ref?.current : 'not found');
      const top = ref ? ref?.current?.offsetTop : -23;
      if (top !== -23) {
        window.scrollTo({
          top,
          behavior: 'smooth',
        });
      }
    }
  }, [isFocused]);
  const classNames = [
    ...isFocused ? ['open', ...isTimerRunning ? ['running'] : []] : [],
    ...isComplete ? ['complete'] : [],
  ];

  return (
    <StyledSection ref={ref} className={classNames.join(' ')}>
      <header
        onClick={() => headerClickHandler(index)}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (isSpaceBar(e)) {
            headerClickHandler();
          }
        }}
        role="button"
        tabIndex={0}
      >
        <div>{`${time} ${isFocused && isTimerRunning ? '⏸' : '▶'}`}</div>
        <div>{title}</div>
      </header>
      <article>{content}</article>
      <footer>
        <input type="image" onClick={togglePlaying} src={isTimerRunning ? pauseImg : playImg} alt={isTimerRunning ? 'Pause' : 'Start'} />
        <input type="image" onClick={proceedToNextSection} src={nextImg} alt="Next" />
        <input type="image" onClick={resetTimer} src={resetImg} alt="Reset" />
      </footer>
    </StyledSection>
  );
}
export default Section;
