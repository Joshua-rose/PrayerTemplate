import React from 'react';
import Styled from 'styled-components';
import Button from './button';
import resetImg from '../assets/Icon awesome-redo-alt.svg';
import pauseImg from '../assets/Icon material-pause.svg';
import nextImg from '../assets/Icon material-skip-next.svg';
import playImg from '../assets/Icon material-play-arrow.svg';

interface Props {
    title: string;
    time: any; // todo figure out what type time should have
    content: string | JSX.Element;
    isFocused?: boolean;
    isTimerRunning?: boolean;
    isComplete?: boolean;
    index: number;
    headerClickHandler: (index:number, ref:any) => void;
    togglePlaying: (e?: any) => void;
    proceedToNextSection: (e?: any) => void;
    resetTimer: (e?: any) => void;
}
const topBottom = 'height: 20vh; max-height:70px;';
const StyledSection = Styled.section`
    button.image {
      background:none;
      border:none;
    }

    header {
        background-color:#20BF55;
        color: white;
        padding: 0 20px;
        display: grid;
    align-items: center;
    grid-template-columns: 55px 1fr 10px;

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
        button {
          height: 35%;
          img {
            height:100%;
          }
        }
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

const isSpaceBar = (event: React.KeyboardEvent) => {
  if (event.key === ' ' || event.keyCode === 32) return true;
  return false;
};
// const sectionRef = React.createRef();
class Section extends React.Component<Props> {
    ref: any= null;

    constructor(props: Props) {
      super(props);
      this.ref = React.createRef();
      // this.props = props;
    }

    render() {
      const {
        title, time, content,
        isTimerRunning, isFocused, togglePlaying,
        isComplete, proceedToNextSection, resetTimer,
        headerClickHandler, index,
      } = this.props;
      return (
        <StyledSection className={`${isFocused ? 'open' : ''}${isComplete ? ' complete' : ''}`}>
          <header
            ref={this.ref}
            onClick={() => headerClickHandler(index, this.ref?.current)}
            onKeyDown={(e: React.KeyboardEvent) => {
              if (isSpaceBar(e)) {
                headerClickHandler(index, this.ref?.current);
              }
            }}
            role="button"
            tabIndex={0}
          >
            <div>{time}</div>
            <div>{title}</div>
          </header>
          <article>{content}</article>
          <footer>
            <Button buttonType="image" onClick={togglePlaying}>
              <img src={isTimerRunning ? pauseImg : playImg} alt={isTimerRunning ? 'Pause' : 'Start'} />

            </Button>
            <Button buttonType="image" onClick={proceedToNextSection}><img src={nextImg} alt="Next" /></Button>
            <Button buttonType="image" onClick={resetTimer}><img src={resetImg} alt="Reset" /></Button>

          </footer>
        </StyledSection>
      );
    }
}
export default Section;
