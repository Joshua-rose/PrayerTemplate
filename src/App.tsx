/* eslint-disable react/no-unused-prop-types, react/require-default-props */

import React, { useState, useEffect } from 'react';
import PrayerGuild, { plan } from './guides/prayerguide1';

import Section from './components/section';
import Modal from './components/modal';
import Button from './components/button';

import { getBrowserVisibilityProp, getIsDocumentHidden } from './utils/pageVisibleHook';

import './App.css';

const chimeSource = require('./assets/352661__foolboymedia__complete-chime.mp3');

const chime = new Audio(chimeSource);

type sections = plan & {
    isFocused?: boolean,
    isComplete?: boolean,
    isTimerRunning?: boolean,

}
type MinSec = {
    min?: number,
    sec?: number
}
export default function App() {
  const guideStarter: sections[] = [];
  const [endTime, setEndTime] = useState(new Date());
  const [isActive, setIsActive] = useState(false);
  const [section, setSection] = useState(-1);
  const [currentGuide, setCurrentGuide] = useState(guideStarter);
  const [showModal, setShowModal] = useState(false);
  const [intervalID, setIntervalID] = useState(0);
  const [pauseTimeRemaining, setPauseTimeRemaining] = useState({ min: 0, sec: 0 });
  const [displayTime, setDisplayTime] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  const clearLocalInterval = () => {
    clearInterval(intervalID);
    setIsActive(false);
    setIntervalID(0);
    window.localStorage.removeItem('estimatedEndTime');
  };
  const addTimeToDate = ({ min, sec }:MinSec) => {
    const newDate = new Date();
    newDate.setMinutes(newDate.getMinutes() + (min || 0));
    newDate.setSeconds(newDate.getSeconds() + (sec || 0));
    return newDate;
  };
  const getTimeRemaining = (e?:Date) => {
    const et = e || endTime;
    const now = new Date();
    if (et < now) return { min: 0, sec: 0 };
    const timeRemaining = Math.round((et.getTime() - now.getTime()) / 1000);
    const min = Math.floor(timeRemaining / 60);
    const sec = timeRemaining % 60;
    return { min, sec };
  };
  const endOfTimer = () => {
    chime.play();
    setShowModal(true);
    clearLocalInterval();
    setIsActive(false);
    // create modal content with buttons for going to next or clearing modal
  };
  const startTimer = (ms: MinSec) => {
    const estimatedEndTime = addTimeToDate(ms);
    setEndTime(estimatedEndTime);
    setIsActive(true);
    const interval = setInterval(() => {
      const { min, sec } = getTimeRemaining(estimatedEndTime);
      if (min <= 0 && sec <= 0) endOfTimer();
      else {
        const dTime = [min, sec].map((t) => (t < 10 ? `0${t}` : t)).join(':');
        setDisplayTime(dTime);
      }
    }, 500);
    setIntervalID(interval);
  };
  const togglePause = () => {
    if (isActive) {
      setIsActive(false);
      setPauseTimeRemaining(getTimeRemaining());
    } else {
      setIsActive(true);
      startTimer(pauseTimeRemaining);
    }
  };
  const resetTimer = () => {
    setIsActive(false);
  };

  const getContents = async () => {
    const contents = await Promise.all(PrayerGuild.map((pg) => pg.content()));
    const newPrayerGuild: sections[] = PrayerGuild.map((pg, i) => ({ ...pg, display: contents[i] }));
    setCurrentGuide(newPrayerGuild);
  };
  const headerClickHandler = (index: number) => {
    if (index === section) togglePause();
    else {
      setSection(index);
    }
  };
  const goToNext = () => {
    const next = section + 1;
    if (currentGuide.length > section + 1) {
      setSection(next);
    } else {
      clearLocalInterval();
    }
    setShowModal(false);
  };
  const visibililityHasChanged = () => {
    if (getIsDocumentHidden()) {
      setIsVisible(false);
      if (isActive) {
        clearLocalInterval();
      }
    } else if (isActive) {
      setIsVisible(true);
      startTimer(getTimeRemaining(endTime));
    }
  };
  useEffect(() => {
    getContents();
    const visibilityChange = getBrowserVisibilityProp();
    if (visibilityChange) {
      window.addEventListener(visibilityChange, visibililityHasChanged, false);
    }

    // return () => {
    //   // cleanup
    //   if (visibilityChange) window.removeEventListener(visibilityChange, visibililityHasChanged, false);
    //   clearLocalInterval();
    // };
  }, []);
  useEffect(() => {
    if (!isActive) {
      clearLocalInterval();
    }
  }, [isActive]);
  useEffect(() => {
    if (section > -1) {
      clearLocalInterval();
      setDisplayTime('');
      const [min, sec] = currentGuide[section].time.split(':').map((t: string) => parseInt(t, 10));
      setPauseTimeRemaining({ min, sec });
    }
  }, [section]);
  return (
    <>
      <div id="App">
        {/* <StyledMenu type="button" onClick={() => { }}><img src={menuImg} alt="Menu" /></StyledMenu> */}
        {currentGuide.map(({
          title, display, time: length, isComplete,
        }:sections, index: number) => {
          const isFocused = index === section;
          return (
            <>
              <Section
                key={title}
                index={index}
                title={title}
                content={display}
                isFocused={isFocused}
                togglePlaying={togglePause}
                headerClickHandler={headerClickHandler}
                proceedToNextSection={goToNext}
                time={isFocused ? displayTime || length : length}
                resetTimer={resetTimer}
                isTimerRunning={intervalID !== 0}
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
      <footer>
        <p>Icons from Material and Awesome</p>
        <p>
          &quot;Notification Up&quot; from FoolBoyMedia on
          <a href="https://freesound.org/people/FoolBoyMedia/sounds/234564/"> FreeSound</a>
        </p>
      </footer>
    </>
  );
}
