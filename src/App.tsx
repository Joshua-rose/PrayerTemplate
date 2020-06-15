/* eslint-disable no-plusplus */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import Section from './components/section';
import logo from './logo.svg';
import './App.css';

function createInterval() {
  return setInterval(() => {
    // count down
    // check if time past

  }, 1000);
}
function ensureTwoDigit(val: number|string) {
  const valAsString = `${val}`;
  if (valAsString.length < 2) return `0${val}`;
  return valAsString;
}
const content = (
  <div>
    <p>Monocle ipsum dolor sit amet eclectic Baggu Singapore sleepy Scandinavian.Lovely bespoke business class Zürich Muji Tsutaya carefully curated international K - pop.Izakaya signature international alluring Sunspel boulevard Winkreative Beams lovely.Signature uniforms impeccable first - class hub, Lufthansa sophisticated.</p>

    <p>Boulevard cosy Sunspel alluring Baggu Shinkansen.Carefully curated intricate sophisticated, Nordic Ettinger conversation joy hub Washlet punctual boutique.Boeing 787 Tsutaya Comme des Garçons Winkreative emerging impeccable Beams bulletin.Punctual smart bulletin, Ettinger global exclusive Fast Lane elegant handsome quality of life cosy first - class emerging airport Toto.</p>

    <p>Airport lovely hub Beams extraordinary.Zürich Ginza Nordic iconic Scandinavian finest, bespoke exquisite Shinkansen Muji Helsinki Fast Lane.Conversation espresso smart Helsinki craftsmanship.Gaggenau signature charming Winkreative.</p>

    <p>Liveable conversation concierge, destination first - class premium Fast Lane business class alluring Singapore Nordic.Comme des Garçons Gaggenau global tote bag, bureaux Swiss concierge.Airport Zürich elegant signature business class.Tote bag business class iconic Shinkansen Boeing 787 Winkreative, Muji Beams alluring boutique Toto.Charming Beams Washlet, Melbourne impeccable punctual Nordic artisanal iconic perfect Comme des Garçons Airbus A380 Fast Lane hand - crafted.Helsinki joy essential hand - crafted, hub soft power destination ANA uniforms artisanal vibrant impeccable business class Porter Ettinger.</p>
  </div>
);
function App() {
  let interval: number;
  const [time, setTime] = useState('00:00');
  useEffect(() => {
    interval = setInterval(() => {
      setTime((t) => {
        let [min, sec] = t.split(':').map((n) => parseInt(n, 10));
        if (sec + 1 > 59) { min++; sec = 0; } else sec++;
        return `${ensureTwoDigit(min)}:${ensureTwoDigit(sec)}`;
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>

      <Section
        title="Title"
        content={content}
        isFocused
        isTimerRunning
        togglePlaying={() => {}}
        proceedToNextSection={() => {}}
        time={time}
      />
    </div>
  );
}

export default App;
