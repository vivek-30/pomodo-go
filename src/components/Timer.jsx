'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import styles from '@styles/components/timer.module.scss';

import manageTime from '@/utilities/manageTime';
import formatTime from '@utilities/formatTime';

let initialTime = {
  hours: 2,
  minutes: 3,
  seconds: 22
}
const Timer = () => {
  const [time, setTime] = useState(initialTime);
  const [isPaused, setIsPaused] = useState(true);

  useEffect(() => {
    if(isPaused) return;
    const timerID = setInterval(manageTime(time, setTime), 1000);

    return () => clearInterval(timerID);
  }, [time, isPaused]);

  const currentTime = formatTime(time);

  const resetTimer = () => {
    setIsPaused(true);
    setTime(initialTime);
  }

  const handlePlayPause = () => {
    setIsPaused(timerState => !timerState);
  }

  const skipTimer = () => {
    setIsPaused(true);
    initialTime = {
      hours: 0,
      minutes: 5,
      seconds: 0
    }
    setTime(initialTime);
  }

  return (
    <>
      <div className={`${styles['timer__status']} flex-center`}>
        <Image src="/assets/icons/dart.svg" alt="darts icon" height={35} width={35} />
        <span>Stay Focused</span>
      </div>
      <div className={styles['timer__box']}>
        <p>{currentTime}</p>
        <p className="text-truncate">Complete pomodoro app</p>
      </div>
      <div className={styles['divider']}></div>
      <div className={styles['timer__info']}>
        <span>Rounds: 3/4</span>
        <span>Estimated Time: 160 mins</span>
      </div>
      <div className={styles['divider']}></div>
      <div className={styles['timer__controls']}>
        <button onClick={resetTimer}>
          <Image src="/assets/icons/redo.svg" alt="clock-reset icon" height={25} width={25} />
        </button>
        <button onClick={handlePlayPause}>
          <Image
            width={60}
            height={60}
            src={`/assets/icons/${isPaused ? 'play' : 'pause'}.svg`}
            alt={`${isPaused ? 'play' : 'pause'} icon`}
          />
        </button>
        <button onClick={skipTimer}>
          <Image src="/assets/icons/forward.svg" alt="foward icon" height={25} width={25} />
        </button>
      </div>
    </>
  );
}

export default Timer;
