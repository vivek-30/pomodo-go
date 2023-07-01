const timer = (time, setTime) => {
  return () => {
    if(time.hours === 0 && time.minutes == 0 && time.seconds == 0) return;

    if(time.seconds === 0) {
      if(time.minutes == 0) {
        setTime({ hours: time.hours-1, minutes: 60, seconds: 0 });
      } else {
        setTime({ ...time, minutes: time.minutes - 1, seconds: 60 });
      }
    } else {
      setTime({ ...time, seconds: time.seconds - 1 });
    }
  }
}

export default timer;
