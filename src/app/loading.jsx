'use client';
import { useContext } from 'react';
import { ModeContext } from '@contexts/modeContext';
import styles from '@styles/pages/loading.module.scss';

const Loading = () => {
  const { state } = useContext(ModeContext);
  
  return (
    <section className={`${styles['loading__container']} flex-center`}>
      <div className={`${styles['loading__container-clock']} ${styles[state.mode]}`}>
        <span className="top-left-center"></span>
      </div>
      <p>Loading</p>
    </section>
  );
}

export default Loading;
