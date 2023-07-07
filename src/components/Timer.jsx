'use client';
import Image from 'next/image';
import { useState, useEffect, useRef, useContext } from 'react';
import { ModeContext } from '@contexts/modeContext';
import { TasksContext } from '@contexts/tasksContext';
import styles from '@styles/components/timer.module.scss';

import manageTime from '@/utilities/manageTime';
import formatTime from '@utilities/formatTime';
import manageStatusInfo from '@utilities/manageStatusInfo';

const focusTime = {
  hours: 0,
  minutes: 1,
  seconds: 9
}

const shortBreak = {
  hours: 0,
  minutes: 5,
  seconds: 0
}

const longBreak = {
  hours: 0,
  minutes: 15,
  seconds: 0
}

const Timer = () => {
  const [time, setTime] = useState(focusTime);
  const [isPaused, setIsPaused] = useState(true);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  
  const clickSoundRef = useRef(null);
  const timerSoundRef = useRef(null);
  const tickingSoundRef = useRef(null);

  const { state: modeState, dispatch: modeDispatch } = useContext(ModeContext);
  const { state: tasksState, dispatch: tasksDispatch } = useContext(TasksContext);

  useEffect(() => {
    if(isPaused) return;
    const activateTimer = manageTime(time, setTime, tickingSoundRef, handleEndTimer);
    const timerID = setInterval(activateTimer, 1000);

    return () => clearInterval(timerID);
  }, [time, isPaused]);

  const currentTime = formatTime(time);
  const statusInfo = manageStatusInfo();

  const manageStatusStates = () => {
    if(modeState.mode === 'focus') {
      setCompletedTaskCount((currentCount) => {
        if(currentCount === 2) {
          modeDispatch({ type: 'SET_MODE', payload: 'long-break' });
          setTime(longBreak);
        } else {
          modeDispatch({ type: 'SET_MODE', payload: 'short-break' });
          setTime(shortBreak);
        }
        return (currentCount + 1) % 3;
      });
    }
    else {
      modeDispatch({ type: 'SET_DEFAULT' });
      setTime(focusTime);
    }
  }

  const handleEndTimer = () => {
    setIsPaused(true);
    tickingSoundRef.current?.pause();
    timerSoundRef.current?.play();
    manageStatusStates();
  }

  const resetTimer = () => {
    setIsPaused(true);
    if(modeState.mode === 'focus') {
      setTime(focusTime);
    }
    else if(modeState.mode === 'short-break') {
      setTime(shortBreak);
    }
    else {
      setTime(longBreak);
    }
  }

  const handlePlayPause = () => {
    clickSoundRef.current?.play();
    setIsPaused(timerState => !timerState);
    if(!tickingSoundRef.current?.paused) {
      tickingSoundRef.current?.pause();
    }
  }

  const skipTimer = () => {
    setIsPaused(true);
    timerSoundRef.current?.play();
    manageStatusStates();
  }

  return (
    <>
      <div className={`${styles['timer__status']} ${styles[modeState.mode]} flex-center`}>
        { statusInfo.image }
        <span>{ statusInfo.text }</span>
      </div>
      <div className={`${styles['timer__box']} ${styles[modeState.mode]}`}>
        <p>{currentTime}</p>
        <p className="text-truncate">Complete pomodoro app</p>
      </div>
      <div className={`${styles['divider']} ${styles[modeState.mode]}`}></div>
      <div className={`${styles['timer__info']} ${styles[modeState.mode]}`}>
        <span>Rounds: 3/4</span>
        <span>Estimated Time: 160 mins</span>
      </div>
      <div className={`${styles['divider']} ${styles[modeState.mode]}`}></div>
      <div className={`${styles['timer__controls']} ${styles[modeState.mode]}`}>
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
        <audio ref={clickSoundRef} src="/assets/audios/click.wav" />
        <audio ref={timerSoundRef} src="/assets/audios/timer.mp3" />
        <audio ref={tickingSoundRef} src="/assets/audios/ticking.mp3" />
      </div>
    </>
  );
}

export default Timer;
