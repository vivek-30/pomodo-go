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
  
  const { state: modeState, dispatch: modeDispatch } = useContext(ModeContext);
  const { state: tasksState, dispatch: tasksDispatch } = useContext(TasksContext);
  
  const soundRef = useRef({});

  useEffect(() => {
    if(isPaused) return;
    const activatedTimer = manageTime(time, setTime, soundRef, handleEndTimer);
    const timerID = setInterval(activatedTimer, 1000);

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
    if(modeState.mode === 'focus') {
      tasksDispatch({ type: 'SET_TASK', payload: null });
      tasksDispatch({ type: 'SET_IS_PROGRESSED', payload: false });
    }
    soundRef.current?.tickingSound.pause();
    soundRef.current?.timerSound.play();
    manageStatusStates();
    setTimeout(() => {
      soundRef.current?.backgroundMusic.play();
    }, 3000);
  }

  const resetTimer = () => {
    setIsPaused(true);
    if(modeState.mode === 'focus') {
      setTime(focusTime);
      tasksDispatch({ type: 'SET_IS_PROGRESSED', payload: false });
    }
    else if(modeState.mode === 'short-break') {
      setTime(shortBreak);
    }
    else {
      setTime(longBreak);
    }
  }

  const handlePlayPause = () => {
    soundRef.current?.clickSound.play();
    setIsPaused(timerState => !timerState);
    if(!soundRef.current?.tickingSound.paused) {
      soundRef.current?.tickingSound.pause();
    }
    if(modeState.mode === 'focus' && !tasksState.isProgressed) {
      tasksDispatch({ type: 'SET_IS_PROGRESSED', payload: true });
    }
  }

  const skipTimer = () => {
    setIsPaused(true);
    if(modeState.mode === 'focus') {
      tasksDispatch({ type: 'SET_TASK', payload: null });
      tasksDispatch({ type: 'SET_IS_PROGRESSED', payload: false });
    }
    soundRef.current?.timerSound.play();
    manageStatusStates();
  }

  const playBgMusic = () => {
    setIsBgMusicPaused(musicState => !musicState);
    if(!isBgMusicPaused && soundRef.current?.timerSound.paused && soundRef.current?.tickingSound.paused) {
      soundRef.current?.backgroundMusic.play();
    }
    else if(isBgMusicPaused) {
      soundRef.current?.backgroundMusic.pause();
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
        <p className="text-truncate">
          {
            taskData.title === '' ? 
            modeState.mode === 'focus' ? 'Time to pick some task' : 'Restore your energy' : 
            taskData.title
          }
        </p>
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
          <audio ref={(ref) => soundRef.current.clickSound = ref} src="/assets/audios/click.mp3" />
          <audio ref={(ref) => soundRef.current.timerSound = ref} src="/assets/audios/timer.mp3" />
          <audio ref={(ref) => soundRef.current.tickingSound = ref} src="/assets/audios/ticking.mp3" />
          <audio ref={(ref) => soundRef.current.backgroundMusic = ref} src="/assets/audios/BgMusic.mp3" />
        </div>
      </div>
      <div className={styles['music__container']}>
        <Image src="/assets/icons/headphone.svg" alt="headphone icon" height={80} width={80} onClick={playBgMusic} />
      </div>
    </>
  );
}

export default Timer;
