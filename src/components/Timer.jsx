'use client';
import Image from 'next/image';
import { useState, useEffect, useRef, useContext } from 'react';
import { ModeContext } from '@contexts/modeContext';
import { TasksContext } from '@contexts/tasksContext';
import styles from '@styles/components/timer.module.scss';

import manageTime from '@/utilities/manageTime';
import formatTime from '@utilities/formatTime';
import manageStatusInfo from '@utilities/manageStatusInfo';
import calculateEstimatedTime from '@utilities/calculateEstimatedTime';

const focusTime = {
  hours: 3,
  minutes: 19,
  seconds: 58
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

const defaultTaskData = {
  title: '',
  totalRounds: 0,
  completedRounds: 0
}
const Timer = () => {
  const [time, setTime] = useState(focusTime);
  const [isPaused, setIsPaused] = useState(true);
  const [taskData, setTaskData] = useState(defaultTaskData);
  const [estimatedTime, setEstimatedTime] = useState(
    calculateEstimatedTime(time, focusTime, taskData)
  );
  const [isBgMusicPaused, setIsBgMusicPaused] = useState(true);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  
  const clickSoundRef = useRef(null);
  const timerSoundRef = useRef(null);
  const tickingSoundRef = useRef(null);
  const backgroundMusicRef = useRef(null);

  const { state: modeState, dispatch: modeDispatch } = useContext(ModeContext);
  const { state: tasksState, dispatch: tasksDispatch } = useContext(TasksContext);

  useEffect(() => {
    if(isPaused) return;
    const activateTimer = manageTime(time, setTime, tickingSoundRef, backgroundMusicRef, handleEndTimer);
    const timerID = setInterval(activateTimer, 1000);

    return () => clearInterval(timerID);
  }, [time, isPaused]);

  useEffect(() => {
    if(isPaused) return;

    const intervalID = setTimeout(() => {
      const computedTime = calculateEstimatedTime(time, focusTime, taskData);
      setEstimatedTime(computedTime);
    }, 60000); // After every 1 minute
  
    return () => clearTimeout(intervalID);
  }, [isPaused, estimatedTime]);

  useEffect(() => {
    if(tasksState.activeTask) {
      setTaskData(tasksState.activeTask);
      const computedTime = calculateEstimatedTime(time, focusTime, taskData);
      setEstimatedTime(computedTime);
    }
    else {
      setTaskData(defaultTaskData);
      setEstimatedTime(0);
    }
  }, [tasksState]);

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
    tasksDispatch({ type: 'TOGGLE_IS_PAUSED', payload: true });
    tickingSoundRef.current?.pause();
    timerSoundRef.current?.play();
    manageStatusStates();
    setTimeout(() => {
      backgroundMusicRef.current?.play();
    }, 500);
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
    tasksDispatch({ type: 'TOGGLE_IS_PAUSED', payload: !isPaused });
    if(!tickingSoundRef.current?.paused) {
      tickingSoundRef.current?.pause();
    }
  }

  const skipTimer = () => {
    setIsPaused(true);
    tasksDispatch({ type: 'TOGGLE_IS_PAUSED', payload: true });
    timerSoundRef.current?.play();
    manageStatusStates();
  }

  const playBgMusic = () => {
    setIsBgMusicPaused(musicState => !musicState);
    if(!isBgMusicPaused && timerSoundRef.current?.paused && tickingSoundRef.current?.paused) {
      backgroundMusicRef.current?.play();
    }
    else if(isBgMusicPaused) {
      backgroundMusicRef.current?.pause();
    }
  }

  const currentFormatedTime = formatTime(time);
  const statusInfo = manageStatusInfo();

  return (
    <>
      <div className={`${styles['timer__status']} ${styles[modeState.mode]} flex-center`}>
        {statusInfo.image}
        <span>{statusInfo.text}</span>
      </div>
      <div className={`${styles['timer__box']} ${styles[modeState.mode]}`}>
        <p>{currentFormatedTime}</p>
        {taskData.title !== '' && <p className="text-truncate">{taskData.title}</p>}
      </div>
      <div className={`${styles['divider']} ${styles[modeState.mode]}`}></div>
      <div className={`${styles['timer__info']} ${styles[modeState.mode]}`}>
        {
          taskData.totalRounds !== 0 ? (
            <>
              <span>Rounds: {taskData.completedRounds}/{taskData.totalRounds}</span>
              <span>Estimated Time: {estimatedTime} mins</span>
            </>
          ) : (
            <p>No Task Selected</p>
          )
        }
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
        <div className="audios hidden">
          <audio ref={clickSoundRef} src="/assets/audios/click.mp3" />
          <audio ref={timerSoundRef} src="/assets/audios/timer.mp3" />
          <audio ref={tickingSoundRef} src="/assets/audios/ticking.mp3" />
          <audio ref={backgroundMusicRef} src="/assets/audios/BgMusic.mp3" />
        </div>
      </div>
      <div className={styles['music__container']}>
        <Image src="/assets/icons/headphone.svg" alt="headphone icon" height={80} width={80} onClick={playBgMusic} />
      </div>
    </>
  );
}

export default Timer;
