'use client';
import Task from '@components/Task';
import { useState, useContext, useEffect } from 'react';
import { ModeContext } from '@contexts/modeContext';
import { TasksContext } from '@contexts/tasksContext';
import styles from '@styles/components/tasks.module.scss';

const Tasks = ({ editTask }) => {
  const { state: modeState } = useContext(ModeContext);
  const { state: tasksState } = useContext(TasksContext);
  
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [displayingTasks, setDisplayingTasks] = useState([]);
  const [selectedTab, setSelectedTab] = useState('all-tasks');

  useEffect(() => {
    setPendingTasks(tasksState.pendingTasks);
    setCompletedTasks(tasksState.completedTasks);
    setDisplayingTasks(
      selectedTab === 'pending-tasks' ? tasksState.pendingTasks :
      selectedTab === 'completed-tasks' ? tasksState.completedTasks :
      [...tasksState.pendingTasks, ...tasksState.completedTasks]
    );
  }, [tasksState]);

  const manageTabSection = (e) => {
    const tab = e.target.dataset['tab'];
    if(tab) {
      setSelectedTab(tab);
      setDisplayingTasks(
        tab === 'pending-tasks' ? pendingTasks :
        tab === 'completed-tasks' ? completedTasks :
        [...pendingTasks, ...completedTasks]
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
            displayingTasks.length !== 0 ? (
              displayingTasks.map((task) => (<Task key={task._id} task={task} editTask={editTask} />))
            ) : (
              <p className={styles['task-list--empty']}>
                {
                  selectedTab.includes('all') ? `You don't have any task, create a new one instead.` :
                  selectedTab.includes('pending') ? `Great!!! No more pending work to do.` :
                  `Either you don't have any task or none of them are completed.`
                }
              </p>
            )
          }
        </ul>
        {displayingTasks.length !== 0 && (
          <div className={`${styles['tasks__show-more']} ${styles[modeState.mode]}`}>
            Show More...
          </div>
        )}
      </div>
    </div>
  );
}

export default Tasks;
