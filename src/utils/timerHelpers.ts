export const addTimeToDate = ({ min, sec }: MinSec) => {
  const newDate = new Date();
  newDate.setMinutes(newDate.getMinutes() + (min || 0));
  newDate.setSeconds(newDate.getSeconds() + (sec || 0));
  return newDate;
};
const getTimeRemaining = (e: Date) => {
  const et = e;
  const now = new Date();
  if (et < now) return { min: 0, sec: 0 };
  const timeRemaining = Math.round((et.getTime() - now.getTime()) / 1000);
  const min = Math.floor(timeRemaining / 60);
  const sec = timeRemaining % 60;
  return { min, sec };
};
// call back for end of timer
// function to run every interval
// end time
// start time
export type MinSec = {
  min?: number,
  sec?: number
}
export interface ITimer {
  intervalCallback: (timeRemaining:MinSec)=>void;
  endOfTimeCallback: ()=>void;
  // ms:MinSec,
}
// function Timer ({intervalCallback, endOfTimeCallback, ms}: ITimer) {
export class Timer {
  endTime?: Date;

  interval?: any;

  isRunning: boolean = false;

  intervalCallback: Function;

  endOfTimeCallback: Function;

  length?: MinSec;

  timeRemaining?: MinSec

  constructor({ intervalCallback, endOfTimeCallback }: ITimer) {
    this.intervalCallback = intervalCallback;
    this.endOfTimeCallback = endOfTimeCallback;
  }

  startTimer(ms:MinSec) {
    this.length = ms;
    this.timeRemaining = ms;
    const endTime = addTimeToDate(ms);
    this.endTime = endTime;
    this.isRunning = true;
    this.interval = setInterval(() => {
      const { min, sec } = getTimeRemaining(endTime);
      this.timeRemaining = { min, sec };
      if (min <= 0 && sec <= 0) this.endOfTime();
      else this.intervalCallback({ min, sec });
    }, 500);
  }

  endOfTime() {
    clearInterval(this.interval);
    this.endOfTimeCallback();
  }

  resetTimer() {
    this.isRunning = false;
    clearInterval(this.interval);
    this.timeRemaining = this.length;
  }

  togglePause() {
    if (this.isRunning) {
      clearInterval(this.interval);
      this.isRunning = false;
      return this.timeRemaining;
    }
    return null;
  }
}

export default { addTimeToDate, Timer };
