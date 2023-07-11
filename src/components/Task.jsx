import Image from 'next/image';
import { useState, useContext } from 'react';
import { TasksContext } from '@contexts/tasksContext';
import styles from '@styles/components/tasks.module.scss';

const Task = ({ task, editTask }) => {
  const { title, description, totalRounds, completedRounds, status } = task;
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const { state, dispatch } = useContext(TasksContext);

  const handleTaskSelection = () => {
    if(!state.isPaused) {
      alert('Please finish the current task first');
      return;
    }
    dispatch({ type: 'SET_TASK', payload: task });
  }

  const deleteTask = () => {
    if(state.activeTask?._id === task._id) {
      alert('active task cannot be deleted');
      return;
    }
    dispatch({ type: `REMOVE_${status.toUpperCase()}_TASK`, payload: task });
  }

  const toggleDescriptionSection = () => {
    setIsDescriptionOpen(currentState => !currentState);
  }

  return (
    <li>
      <div className={styles['task-list__task-header']}>
        <span className="text-truncate" onClick={handleTaskSelection}>{title}</span>
        <div className={styles['task-header__control-icons']}>
          <span data-type="info">
            {completedRounds}/{totalRounds}
          </span>
          <span onClick={editTask(task)} data-type="edit">
            <Image src="/assets/icons/edit.svg" alt="edit icon" height={20} width={20} />
          </span>
          <span onClick={deleteTask} data-type="delete">
            <Image src="/assets/icons/delete.svg" alt="delete icon" height={20} width={20} />
          </span>
          <span onClick={toggleDescriptionSection} data-type="description">
            <Image src="/assets/icons/down-arrow.svg" alt="down-arrow icon" height={20} width={20} />
          </span>
        </div>
      </div>
      {
        isDescriptionOpen && (
        <div className={styles['task-list__task-body']}>
          {description}
          <span>Read More</span>
        </div>
      )}
    </li>
  );
}

export default Task;
