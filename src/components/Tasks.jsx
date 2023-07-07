'use client';
import { useState, useContext } from 'react';
import { ModeContext } from '@contexts/modeContext';
import { TasksContext } from '@contexts/tasksContext';
import Task from '@components/Task';
import styles from '@styles/components/tasks.module.scss';

const Tasks = () => {
  const { state: modeState } = useContext(ModeContext);
  const { state: tasksState } = useContext(TasksContext);
  const { pendingTasks, completedTasks } = tasksState;
  const allTasks = [ ...pendingTasks, ...completedTasks ];
  
  const [selectedTab, setSelectedTab] = useState('all-tasks');
  const [displayingTasks, setDisplayingTasks] = useState(allTasks);

  const manageTabSection = (e) => {
    const tab = e.target.dataset['tab'];
    if(tab) {
      setSelectedTab(tab);
      setDisplayingTasks(
        tab === 'all-tasks' ? allTasks :
        tab === 'pending-tasks' ? pendingTasks :
        completedTasks
      );
    }
  }

  return (
    <div className={styles['tasks__container']}>
      <div className={`${styles['tasks__filter']} ${styles[modeState.mode]}`} onClick={manageTabSection}>
        <span
          data-tab="all-tasks"
          className={selectedTab === 'all-tasks' ? styles['filter--active'] : ''}
        >
          All Tasks
        </span>
        <span
          data-tab="pending-tasks"
          className={selectedTab === 'pending-tasks' ? styles['filter--active'] : ''}
        >
          Pending
        </span>
        <span
          data-tab="completed-tasks"
          className={selectedTab === 'completed-tasks' ? styles['filter--active'] : ''}
        >
          Completed
        </span>
      </div>
      <div className={`${styles['divider']} ${styles[modeState.mode]}`}></div>
      <div className={`${styles['tasks__task-list']} ${styles[modeState.mode]}`}>
        <ul role="list">
          {
            displayingTasks.length > 0 ? displayingTasks.map((task) => (
              <Task task={task} key={task._id} />
            )) : <p className={styles['task-list--empty']}>
              {
                selectedTab.includes('all') ? `You don't have any task, create a new one instead.`
                : selectedTab.includes('pending') ? `Great!!! No more pending work to do.`
                : `Either you don't have any task or none of them are completed.`
              }
            </p>
          }
        </ul>
        <div className={`${styles['tasks__show-more']} ${styles[modeState.mode]} ${displayingTasks.length ? '' : 'hidden'}`}>
          Show More...
        </div>
      </div>
    </div>
  );
}

export default Tasks;
