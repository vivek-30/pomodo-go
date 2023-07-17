'use client';
import { useContext } from 'react';
import { ModeContext } from '@contexts/modeContext';
import styles from '@styles/pages/loading.module.scss';

const Loading = () => {
  const { state } = useContext(ModeContext);
  
  return (
    <section className={`${styles['loading__container']} flex justify-center items-center`}>
      <div className={`${styles['loading__container-clock']} ${styles[state.mode]} before:top-2/4 before:left-2/4 before:-translate-x-2/4 before:-translate-y-2/4 after:top-2/4 after:left-2/4 after:-translate-x-2/4 after:-translate-y-2/4`}>
        <span className="top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"></span>
      </div>
      <p>Loading</p>
    </section>
  );
}

export default Loading;
