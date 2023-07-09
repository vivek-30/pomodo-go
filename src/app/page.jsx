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
      </section>
    </main>
  );
}

export default Page;
