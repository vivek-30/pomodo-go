import Image from 'next/image';
import Tasks from '@components/Tasks';
import AddTask from '@components/AddTask';
import styles from '@styles/page.module.css';

const Page = () => {
  return (
    <main className={`${styles['main-container']} flex-center`}>
      <section className={`${styles['timer-section']} flex-center`}>
        <div className={`${styles.status} flex-center`}>
          <Image src="/assets/icons/dart.svg" alt="darts icon" height={35} width={35} />
          <span>Stay Focused</span>
        </div>
        <div className={styles.timer}>
          <p>25:17:00</p>
          <p className="text-truncate">Complete pomodoro app</p>
        </div>
        <div className={styles.divider}></div>
        <div className={styles['task-info']}>
          <span>Rounds: 3/4</span>
          <span>Estimated Time: 160 mins</span>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.controls}>
          <span>
            <Image className="top-left-center" src="/assets/icons/alarm.svg" alt="clock icon" height={44} width={44} />
          </span>
          <span>
            <Image className="top-left-center" src="/assets/icons/play.svg" alt="play icon" height={50} width={50} />
          </span>
          <span>
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
