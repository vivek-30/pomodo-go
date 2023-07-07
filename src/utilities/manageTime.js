// import { manageStatusStates } from '@utilities/manageTimerStatus';

const manageTime = (
  time, 
  setTime, 
  setisPaused, 
  timerSoundRef,
  tickingSoundRef,
  manageStatusStates
) => {
  return () => {
    const { hours, minutes, seconds } = time;

    if(hours === 0 && minutes === 0) {
      if(seconds === 0) {
        setisPaused(true);
        tickingSoundRef.current?.pause();
        timerSoundRef.current?.play();
        manageStatusStates();
        return;
      }
      else if(seconds === 10) {
        tickingSoundRef.current?.play();
      }
    }

    if(seconds === 0) {
      if(minutes == 0) {
        setTime({ hours: hours-1, minutes: 59, seconds });
      } else {
        setTime({ hours, minutes: minutes - 1, seconds: 59 });
      }
    } else {
      setTime({ hours, minutes, seconds: seconds - 1 });
    }
  }
}

export default manageTime;
