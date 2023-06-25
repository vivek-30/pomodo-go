import Image from 'next/image';
// import AddTask from '@components/AddTask';
import styles from '@styles/page.module.css';

const Page = () => {
  return (
    <main className={styles['main-container']}>
      <section className={`${styles['timer-section']} flex-center`}>
        <div className={`${styles.status} flex-center`}>
          <Image src="/assets/icons/dart.svg" alt="darts icon" height={35} width={35} />
          <span>Stay Focused</span>
        </div>
        <div className={styles.timer}>
          <p>25:17:00</p>
          <p className="text-truncate">Complete pomodoro app</p>
        </div>
        <div className={styles['task-info']}>
          <span>Rounds: 3/4</span>
          <span>Estimated Time: 160 mins</span>
        </div>
        <div className={styles.controls}>
          <span>
            <Image className="top-left-center" src="/assets/icons/more.svg" alt="more-options icon" height={50} width={50} />
          </span>
          <span>
            <Image className="top-left-center" src="/assets/icons/play.svg" alt="play-button icon" height={50} width={50} />
          </span>
          <span>
            <Image className="top-left-center" src="/assets/icons/forward.svg" alt="foward-button icon" height={50} width={50} />
          </span>
        </div>
      </section>
      {/* <section>
        <div className="tasks-container">
          <AddTask />
          <div className="available-tasks">
            <div className="tasks-filter-container">
              <span>All</span>
              <span>Pending</span>
              <span>Completed</span>
            </div>
            <div className="tasks">
              <ul role="list">
                <li>
                  <div>
                    <span>name</span>
                    <span>Rounds 2/3</span>
                  </div>
                  <div>Task description.... <span>Read More</span></div>
                </li>
                <li>
                  <div>
                    <span>name</span>
                    <span>Rounds 2/3</span>
                  </div>
                  <div>Task description.... <span>Read More</span></div>
                </li>
                <li>
                  <div>
                    <span>name</span>
                    <span>Rounds 2/3</span>
                  </div>
                  <div>Task description.... <span>Read More</span></div>
                </li>
                <li>
                  <div>
                    <span>name</span>
                    <span>Rounds 2/3</span>
                  </div>
                  <div>Task description.... <span>Read More</span></div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section> */}
    </main>
  );
}

export default Page;
