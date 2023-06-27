import styles from '@styles/loading.module.css';

const Loading = () => {
  return (
    <section className={`${styles['clock-container']} flex-center`}>
      <div className={styles.clock}>
        <span className='top-left-center'></span>
      </div>
      <p>Loading</p>
    </section>
  );
}

export default Loading;
