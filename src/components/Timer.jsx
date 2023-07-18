'use client';
import Image from 'next/image';
import { useState, useEffect, useRef, useContext } from 'react';
import { ModeContext } from '@contexts/modeContext';
import { TasksContext } from '@contexts/tasksContext';

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
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [taskData, setTaskData] = useState(defaultTaskData);
  const [isBgMusicPaused, setIsBgMusicPaused] = useState(true);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  
  const { state: modeState, dispatch: modeDispatch } = useContext(ModeContext);
  const { state: tasksState, dispatch: tasksDispatch } = useContext(TasksContext);
  
  const soundRef = useRef({});

  useEffect(() => {
    if(isPaused) return;
    const activatedTimer = manageTime(
      time, setTime, soundRef, focusTime, taskData, setEstimatedTime, handleEndTimer
    );
    const timerID = setInterval(activatedTimer, 1000);

    return () => clearInterval(timerID);
  }, [time, isPaused]);

  useEffect(() => {
    if(tasksState.activeTask) {
      setTaskData(tasksState.activeTask);
    }
    else {
      setTaskData(defaultTaskData);
      setEstimatedTime(0);
    }
  }, [tasksState]);

  useEffect(() => {
    const computedTime = calculateEstimatedTime(time, focusTime, taskData);
    setEstimatedTime(computedTime);
  }, [taskData]);

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
      <div className={`w-max mt-4 flex justify-center items-center gap-[0.6rem] md:gap-[0.8rem] border-2 rounded-[2rem] text-[0.9rem] md:text-[1.2rem] py-[0.4rem] md:py-[0.6rem] px-[0.8rem] ${modeState.mode === 'focus' ? 'bg-red-200 border-red-800 text-red-800' : modeState.mode === 'short-break' ? 'bg-green-200 border-green-800 text-green-800' : 'bg-blue-200 border-sky-800 text-sky-900'}`}>
        {statusInfo.image}
        <span>{statusInfo.text}</span>
      </div>

      <div className={`relative w-[17rem] md:w-80 h-[16rem] md:h-[19rem] max-h-80  my-[1.3rem] rounded-[50%] border-[0.4rem] shadow-[1px_1px_4px_10px] ${modeState.mode === 'focus' ? 'text-red-800 border-red-800 shadow-[#ebd4d4]' : modeState.mode === 'short-break' ? 'text-green-800 border-green-800 shadow-[#d6e5d6]' : 'border-sky-800 text-sky-900 shadow-[#cfdee5]'}`}>
        <p className="absolute left-2/4 top-2/4 text-[3rem] md:text-[4em] -translate-x-2/4 -translate-y-2/4">{currentFormatedTime}</p>

        <p className="absolute left-2/4 bottom-[24%] w-max max-w-[13.5rem] -translate-x-2/4 p-[0.1rem] overflow-hidden whitespace-nowrap text-ellipsis">
          {
            taskData.title === '' ? 
            modeState.mode === 'focus' ? 'Time to pick some task' : 'Restore your energy' : 
            taskData.title
          }
        </p>
      </div>

      <div className={`w-[21rem] md:w-[25rem] h-[1px] opacity-60 ${modeState.mode === 'focus' ? 'bg-pink-800' : modeState.mode === 'short-break' ? 'bg-green-600' : 'bg-sky-900'}`} />
      <div className="my-4">
        {
          taskData.totalRounds !== 0 ? (
            <>
              <span className={`my-2 mx-[0.2rem] p-[0.4rem] text-[0.9rem] md:text-[1.09rem] rounded-[6px] text-gray-800 shadow-md ${modeState.mode === 'focus' ? 'bg-[#fddada]' : modeState.mode === 'short-break' ? 'bg-[#d6ecd6]' : 'bg-[#cce6f6]'}`}>Rounds: {taskData.completedRounds}/{taskData.totalRounds}</span>

              <span className={`my-2 mx-[0.2rem] p-[0.4rem] text-[0.9rem] md:text-[1.09rem] rounded-[6px] text-gray-800 shadow-md ${modeState.mode === 'focus' ? 'bg-[#fddada]' : modeState.mode === 'short-break' ? 'bg-[#d6ecd6]' : 'bg-[#cce6f6]'}`}>Estimated Time: {estimatedTime} mins</span>
            </>
          ) : (
            <p className={`text-[1.3rem] ${modeState.mode === 'focus' ? 'text-red-800' : modeState.mode === 'short-break' ? 'text-green-800' : 'text-sky-800'}`}>No Task Selected</p>
          )
        }
      </div>
      <div className={`w-[21rem] md:w-[25rem] h-[1px] opacity-60 ${modeState.mode === 'focus' ? 'bg-pink-800' : modeState.mode === 'short-break' ? 'bg-green-600' : 'bg-sky-800'}`} />
      <div className={`flex items-center gap-4 my-[0.8rem]`}>
        <button onClick={resetTimer} className={`w-[4.5rem] h-14 relative cursor-pointer border-none rounded-[0.8rem] shadow-lg hover:shadow-md hover:scale-[0.98] ${modeState.mode === 'focus' ? 'bg-red-300' : modeState.mode === 'short-break' ? 'bg-[#c0e1c0]' : 'bg-[#b0dcf7]'}`}>
          <Image
            src="/assets/icons/redo.svg" 
            alt="clock-reset icon" 
            height={25} 
            width={25}
            className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
          />
        </button>
        <button onClick={handlePlayPause} className={`w-[5.8rem] h-[4.2rem] relative cursor-pointer border-none rounded-[0.8rem] shadow-lg hover:shadow-md hover:scale-[0.98] ${modeState.mode === 'focus' ? 'bg-red-400' : modeState.mode === 'short-break' ? 'bg-[#7bbc7a]' : 'bg-[#7ec3ee]'}`}>
          <Image
            width={60}
            height={60}
            src={`/assets/icons/${isPaused ? 'play' : 'pause'}.svg`}
            alt={`${isPaused ? 'play' : 'pause'} icon`}
            className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
          />
        </button>
        <button onClick={skipTimer} className={`w-[4.5rem] h-14 relative cursor-pointer border-none rounded-[0.8rem] shadow-lg hover:shadow-md hover:scale-[0.98] ${modeState.mode === 'focus' ? 'bg-red-300' : modeState.mode === 'short-break' ? 'bg-[#c0e1c0]' : 'bg-[#b0dcf7]'}`}>
          <Image
            src="/assets/icons/forward.svg"
            alt="foward icon"
            height={25}
            width={25}
            className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
          />
        </button>
        <div className="hidden">
          <audio ref={(ref) => soundRef.current.clickSound = ref} src="/assets/audios/click.mp3" />
          <audio ref={(ref) => soundRef.current.timerSound = ref} src="/assets/audios/timer.mp3" />
          <audio ref={(ref) => soundRef.current.tickingSound = ref} src="/assets/audios/ticking.mp3" />
          <audio ref={(ref) => soundRef.current.backgroundMusic = ref} src="/assets/audios/BgMusic.mp3" />
        </div>
      </div>
      <div className="fixed max-w-[9rem] h-20 rounded-[50%] left-[3%] bottom-[7%] z-10 hidden md:block">
        <Image src="/assets/icons/headphone.svg" alt="headphone icon" height={80} width={80} onClick={playBgMusic} className="cursor-pointer" />
      </div>
    </>
  );
}

export default Timer;
