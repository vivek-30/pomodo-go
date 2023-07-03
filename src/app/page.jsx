import Image from 'next/image';
import Tasks from '@components/Tasks';
import Timer from '@components/Timer';
import AddTask from '@components/AddTask';
import styles from '@styles/pages/page.module.scss';

const Page = () => {
  return (
    <main className={`${styles['main__container']} flex-center`}>
      <section className={`${styles['timer__section']} flex-center`}>
        <Timer />
      </section>
      <section className='tasks__section'>
        <AddTask />
        <Tasks />
      </section>
      <div className={styles['music__container']}>
        <Image src="/assets/icons/music.svg" alt="headphone icon" height={80} width={80} />
      </div>
    </main>
  );
}

export default Page;
