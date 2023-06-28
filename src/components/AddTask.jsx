import Image from 'next/image';
import styles from '@styles/addTask.module.css';

const AddTask = () => {
  return (
    <div className={`${styles['tasks-container']} flex-center`}>
      <div className={`${styles.controls}`}>
        <button className={`${styles['icon-btn']} flex-center ${styles['btn-lg']}`}>
          <Image src="/assets/icons/more.svg" alt="add icon" height={30} width={30}/>
          <span>Create Task</span>
        </button>
        <div>
          <button className={`${styles['icon-btn']} flex-center`}>
            <Image src="/assets/icons/more.svg" alt="add icon" height={30} width={30}/>
            <span>Back</span>
          </button>
          <button className={`${styles['icon-btn']} flex-center`}>
            <Image src="/assets/icons/more.svg" alt="add icon" height={30} width={30}/>
            <span>Cancel</span>
          </button>
          <button className={`${styles['icon-btn']} flex-center`}>
            <Image src="/assets/icons/more.svg" alt="add icon" height={30} width={30}/>
            <span>Next</span>
          </button>
        </div>
      </div>
      <div className={styles.indicator}>
        <span className={`${styles.circle} ${styles.active}`}></span>
        <span className={`${styles.circle} ${styles.active}`}></span>
        <span className={styles.circle}></span>
      </div>
      <form className={styles['add-task-form']}>
        <div className={styles['input-field']}>
          <label htmlFor="title">Create a new task:</label>
          <input id="title" type="text" placeholder="What it's all about?" spellcheck="false" required />
        </div>
        <div className={styles['input-field']}>
          <label htmlFor="description">Want to add description:</label>
          <textarea id="description" type="text" placeholder="eg - Essential for my physique...." spellcheck="false" />
        </div>
        <div className={styles['input-field']}>
          <label htmlFor="rounds">Number of rounds you want to go for:</label>
          <input id="rounds" type="number" placeholder="Default (3)" min={1} required />
        </div>
      </form>
    </div>
  );
}

export default AddTask;
