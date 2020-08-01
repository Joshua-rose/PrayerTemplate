/* eslint-disable no-plusplus */
/* eslint-disable max-len */
import React, { useState, useEffect, RefObject } from 'react';
import Styled from 'styled-components';
import Section from './components/section';
import Modal from './components/modal';
import PrayerGuild, { plan } from './guides/prayerguide1';
import './App.css';
import Button from './components/button';
import menuImg from './assets/Icon material-more-vert.svg';

type sections = plan & {
  isFocused?: boolean,
  isComplete?: boolean,
  isTimerRunning?: boolean,

}
function ensureTwoDigit(val: number|string) {
  const valAsString = `${val}`;
  if (valAsString.length < 2) return `0${val}`;
  return valAsString;
}

const StyledMenu = Styled.button`
border:none;
background: none;
position: fixed;
top: 18px;
right:10px;

`;
function App() {
  const [time, setTime] = useState('');
  const guideStarter: sections[] = [];
  const [currentGuide, setCurrentGuide] = useState(guideStarter);
  const [section, setSection] = useState(-1);
  const [showModal, setShowModal] = useState(false);
  const [intervalID, setIntervalID] = useState(0);
  const sectionRefStarter: RefObject<HTMLElement>[] = [];
  const [sectionRef, setSectionRef] = useState(sectionRefStarter);
  const endOfTimer = () => {
    setShowModal(true);
    // create modal content with buttons for going to next or clearing modal
  };
  const clearLocalInterval = () => {
    clearInterval(intervalID);
    setIntervalID(0);
  };
  const createInterval = (sectionTime: string) => {
    clearLocalInterval();
    const localInterval = setInterval(() => {
      setTime((t) => {
        const tt = t !== '' ? t : sectionTime;
        let [min, sec] = tt.split(':').map((n) => parseInt(n, 10));

        if (--sec <= 0) {
          if (min > 0) {
            sec = 59; --min;
          } else {
            clearInterval(localInterval);
            setIntervalID(0);
            // setTime('');
            setShowModal(true);
          }
        }
        return min >= 0 || sec >= 0 ? `${ensureTwoDigit(min)}:${ensureTwoDigit(sec)}` : '';
      });
    }, 1000);
    setIntervalID(localInterval);
  };
  const toggleTimer = () => {
    // if timer is stopped start timer
    if (intervalID !== 0) {
      clearLocalInterval();
    } else createInterval(time || currentGuide[section].time);
    // if timer is going stop timer
  };
  const resetTimer = () => {
    clearLocalInterval();
    setTime('');
  };
  const headerClickHandler = (index: number, ref:any) => {
    if (index === section) toggleTimer();
    else {
      setSection(index);
      // setSectionRef(ref);
    }
  };
  const goToNext = (ref:any) => {
    const next = section + 1;
    if (currentGuide.length > section + 1) {
      setTime('');
      setSection(next);
    }
    setShowModal(false);
  };
  // const getCurrentIndex = () => currentGuide.map((cg) => (cg.isFocused ? 'f' : '')).indexOf('f');
  useEffect(() => {
    const getContents = async () => {
      const contents = await Promise.all(PrayerGuild.map((pg) => pg.content()));
      const newPrayerGuild: sections[] = PrayerGuild.map((pg, i) => ({ ...pg, display: contents[i] }));
      setCurrentGuide(newPrayerGuild);
    };
    getContents();
    return () => {
      clearInterval(intervalID);
    };
  }, []);
  useEffect(() => {
    console.log(': -----------------------------');
    console.log('App -> sectionRef', sectionRef);
    console.log(': -----------------------------');
    console.log(': -----------------------');
    console.log('App -> section', section);
    console.log(': -----------------------');
    // let secRef: React.ElementRef<'div'>
    if (sectionRef.length && sectionRef.length > section) {
      const secRef = sectionRef[section];
      console.log(': ---------------------');
      console.log('App -> secRef', secRef);
      console.log(': ---------------------');
      console.log(': -------------------------------------------------------------------');
      console.log('App -> secRef.current?.parentElement', secRef.current?.parentElement);
      console.log(': -------------------------------------------------------------------');
      if (secRef) {
        window.scrollTo({
          top: secRef.current?.parentElement?.offsetHeight,
          behavior: 'smooth',
        });
      }
    }
  }, [section]);
  // useEffect(() => {
  //   if (currentGuide.length > 0) {
  //     clearInterval(interval);
  //     const currentIndex = currentGuide.map((cg) => (cg.isFocused ? 'f' : '')).indexOf('f');
  //     createInterval(currentGuide[currentIndex].time);
  //   }
  // }, [currentGuide]);
  return (
    <div id="App">
      <StyledMenu type="button" onClick={() => {}}><img src={menuImg} alt="Menu" /></StyledMenu>
      {currentGuide.map(({
        title, display, time: length, isComplete,
      }, index) => {
        const isFocused = index === section;
        return (
          <>
            <Section
              key={title}
              index={index}
              title={title}
              content={display}
              isFocused={isFocused}
              togglePlaying={toggleTimer}
              headerClickHandler={headerClickHandler}
              proceedToNextSection={goToNext}
              time={isFocused ? time || length : length}
              resetTimer={resetTimer}
              isTimerRunning={intervalID !== 0}
              returnRef={(ref) => setSectionRef((refs) => [...refs, ref])}
            />

          </>

        );
      })}
      {showModal && (
        <Modal>
          <p>{`${currentGuide[section]?.title} complete.`}</p>
          <p>Select Next to continue to next section or clear to remove this notice.</p>
          <div className="buttons">
            <Button onClick={() => setShowModal(false)}>Clear</Button>
            <Button onClick={goToNext} buttonType="primary">Next</Button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default App;
