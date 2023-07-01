'use client';

import Image from 'next/image';
import Tasks from '@components/Tasks';
import AddTask from '@components/AddTask';
import { useState, useEffect } from 'react';
import styles from '@styles/page.module.css';

import timer from '@/utilities/timer';
import formatTime from '@utilities/formatTime';

const Page = () => {
  const initialTime = {
    hours: 2,
    minutes: 3,
    seconds: 22
  }
  let savedTime = null;
  const [time, setTime] = useState(initialTime);
  const [isPaused, setIsPaused] = useState(true);

  let timerID = null;

  useEffect(() => {
    if(isPaused) return;
    timerID = setInterval(timer(time, setTime), 1000);
    return () => clearInterval(timerID);
  }, [time, isPaused]);

  const currentTime = formatTime(time);

  return (
    <main className={`${styles['main-container']} flex-center`}>
      <section className={`${styles['timer-section']} flex-center`}>
        <div className={`${styles.status} flex-center`}>
          <Image src="/assets/icons/dart.svg" alt="darts icon" height={35} width={35} />
          <span>Stay Focused</span>
        </div>
        <div className={styles.timer}>
          <p>{currentTime}</p>
          <p className="text-truncate">Complete pomodoro app</p>
        </div>
        <div className={styles.divider}></div>
        <div className={styles['task-info']}>
          <span>Rounds: 3/4</span>
          <span>Estimated Time: 160 mins</span>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.controls}>
          <span onClick={() => {
            setIsPaused(true);
            setTime(initialTime);
          }}>
            <Image className="top-left-center" src="/assets/icons/redo.svg" alt="reset icon" height={25} width={25} />
          </span>
          <span onClick={() => {
            savedTime = time;
            setIsPaused(currentState => !currentState);

            if(isPaused) {
              clearInterval(timerID);
            } else {
              setTime(savedTime);
            }
          }}>
            <Image 
              className="top-left-center" 
              src={`/assets/icons/${isPaused ? 'play' : 'pause'}.svg`}
              alt={`${isPaused ? 'play' : 'pause'} icon`} 
              height={60} 
              width={60}
            />
          </span>
          <span onClick={() => {
            setTime({ hourse: 0, minutes: 0, seconds: 0 });
          }}>
            <Image className="top-left-center" src="/assets/icons/forward.svg" alt="foward icon" height={50} width={50} />
          </span>
        </div>
      </section>
      <section className='tasks-section'>
        <AddTask />
        <Tasks />
      </section>
      <div className={styles['music-box']}>
        <Image src="/assets/icons/music.svg" alt="headphone icon" height={80} width={80} />
      </div>
    </main>
  );
}

export default Page;
