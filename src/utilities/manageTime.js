const manageTime = ({ hours, minutes, seconds }, setTime) => {
  return () => {
    if(hours === 0 && minutes == 0 && seconds == 0) return;

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
