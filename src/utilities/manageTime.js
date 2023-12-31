import calculateEstimatedTime from '@utilities/calculateEstimatedTime';

const manageTime = (
  { hours, minutes, seconds }, 
  setTime, 
  soundRef, 
  focusTime,
  taskData,
  setEstimatedTime,
  handleEndTimer
) => {
  return () => {

    if(hours === 0 && minutes === 0) {
      if(seconds === 0) {
        handleEndTimer();
        setEstimatedTime(
          calculateEstimatedTime({ hours, minutes, seconds }, focusTime, taskData)
        );
        return;
      }
      else if(seconds <= 10) {
        soundRef.current?.backgroundMusic.pause();
        if(soundRef.current?.tickingSound.paused) {
          soundRef.current?.tickingSound.play();
        }
      }
    }

    if(seconds === 0) {
      setEstimatedTime(
        calculateEstimatedTime({ hours, minutes, seconds }, focusTime, taskData)
      );
      if(minutes == 0) {
        setTime({ hours: hours-1, minutes: 59, seconds });
      }
      else {
        setTime({ hours, minutes: minutes - 1, seconds: 59 });
      }
    }
    else {
      setTime({ hours, minutes, seconds: seconds - 1 });
    }
  }
}

export default manageTime;
