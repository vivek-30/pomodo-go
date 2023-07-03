import Image from 'next/image';
import styles from '@styles/components/addTask.module.scss';

const AddTask = () => {
  return (
    <div className={`${styles['add-task__container']} flex-center`}>
      <div className={`${styles['add-task__control-section']}`}>
        <button className={`${styles['control-section__btn']} flex-center ${styles['btn--lg']}`}>
          <Image src="/assets/icons/add-new.svg" alt="add icon" height={25} width={25}/>
          <span>Create Task</span>
        </button>
        <div className="flex-center">
          <button className={`${styles['control-section__btn']} flex-center`}>
            <Image src="/assets/icons/back-arrow.svg" alt="back icon" height={30} width={30}/>
            <span>Back</span>
          </button>
          <button className={`${styles['control-section__btn']} flex-center`}>
            <Image src="/assets/icons/close.svg" alt="cancel icon" height={30} width={30}/>
            <span>Cancel</span>
          </button>
          <button className={`${styles['control-section__btn']} flex-center`}>
            <Image src="/assets/icons/next-arrow.svg" alt="next icon" height={30} width={30}/>
            <span>Next</span>
          </button>
        </div>
      </div>
      <div className={styles['add-task__progress-bar']}>
        <span className={`${styles['progress-bar__circle']} ${styles['circle--active']}`}></span>
        <span className={`${styles['progress-bar__circle']} ${styles['circle--active']}`}></span>
        <span className={styles['progress-bar__circle']}></span>
      </div>
      <form className={styles['add-task__form']}>
        <div className={styles['form__input-field']}>
          <label htmlFor="title">Create a new task:</label>
          <input id="title" type="text" placeholder="What it's all about?" spellCheck="false" required />
        </div>
        <div className={styles['form__input-field']}>
          <label htmlFor="description">Want to add description:</label>
          <textarea id="description" type="text" placeholder="eg - Essential for my physique...." spellCheck="false" />
        </div>
        <div className={styles['form__input-field']}>
          <label htmlFor="rounds">Number of rounds you want to go for:</label>
          <input id="rounds" type="number" placeholder="Default (3)" min={1} required />
        </div>
      </form>
    </div>
  );
}

export default AddTask;
