/* eslint-disable no-plusplus */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import Section from './components/section';
import Modal from './components/modal';
import PrayerGuild, { plan } from './guides/prayerguide1';
import './App.css';
import Button from './components/button';

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
function App() {
  let interval: number;
  const [time, setTime] = useState('');
  const guideStarter: sections[] = [];
  const [currentGuide, setCurrentGuide] = useState(guideStarter);
  const [section, setSection] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const endOfTimer = () => {
    setShowModal(true);
    // create modal content with buttons for going to next or clearing modal
  };
  const goToNext = () => {
    setSection((s) => {
      const i = s + 1;
      const guide = currentGuide;
      guide[s].isFocused = false;
      if (guide.length > i) {
        guide[i].isFocused = true;
      }
      setShowModal(false);
      setCurrentGuide(guide);
      return s;
    });
  };
  const createInterval = (sectionTime: string) => {
    interval = setInterval(() => {
      setTime((t) => {
        const tt = t !== '' ? t : sectionTime;
        let [min, sec] = tt.split(':').map((n) => parseInt(n, 10));

        if (--sec <= 0) {
          if (min > 0) {
            sec = 59; --min;
          } else {
            clearInterval(interval);
            setShowModal(true);
          }
        }
        return min >= 0 || sec >= 0 ? `${ensureTwoDigit(min)}:${ensureTwoDigit(sec)}` : '';
      });
    }, 100);
  };
  useEffect(() => {
    const getContents = async () => {
      const contents = await Promise.all(PrayerGuild.map((pg) => pg.content()));
      const newPrayerGuild: sections[] = PrayerGuild.map((pg, i) => ({ ...pg, display: contents[i] }));
      newPrayerGuild[section].isFocused = true;
      setCurrentGuide(newPrayerGuild);
    };
    getContents();
    return () => {
      clearInterval(interval);
    };
  }, []);
  useEffect(() => {
    if (currentGuide.length > 0) {
      clearInterval(interval);
      const currentIndex = currentGuide.map((cg) => (cg.isFocused ? 'f' : '')).indexOf('f');
      createInterval(currentGuide[currentIndex].time);
    }
  }, [currentGuide]);

  return (
    <div>
      {currentGuide.map(({
        title, display, time: length, isFocused, isComplete,
      }) => (
        <>
          <Section
            title={title}
            content={display}
            isFocused={isFocused}
            togglePlaying={() => { clearInterval(interval); }}
            proceedToNextSection={goToNext}
            time={isFocused ? time : length}
          />
          
        </>

      ))}
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
