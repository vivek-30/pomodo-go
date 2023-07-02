import styles from '@styles/pages/loading.module.scss';

const Loading = () => {
  return (
    <section className={`${styles['loading__container']} flex-center`}>
      <div className={styles['loading__container-clock']}>
        <span className="top-left-center"></span>
      </div>
      <p>Loading</p>
    </section>
  );
}

export default Loading;
