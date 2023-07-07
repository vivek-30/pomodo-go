import Image from 'next/image';
import styles from '@styles/components/tasks.module.scss';

const Task = ({ task }) => {
  const { title, description, totalRounds, completedRounds } = task;

  return (
    <li>
      <div className={styles['task-list__task-header']}>
        <span className="text-truncate">{title}</span>
        <div className={styles['task-header__control-icons']}>
          <span>{completedRounds}/{totalRounds}</span>
          <span><Image src="/assets/icons/edit.svg" alt="edit icon" height={20} width={20} /></span>
          <span><Image src="/assets/icons/delete.svg" alt="delete icon" height={20} width={20} /></span>
          <span><Image src="/assets/icons/description.svg" alt="description icon" height={20} width={20} /></span>
        </div>
      </div>
      <div className={styles['task-list__task-body']}>
        {description}
        <span>Read More</span>
      </div>
    </li>
  );
}

export default Task;
