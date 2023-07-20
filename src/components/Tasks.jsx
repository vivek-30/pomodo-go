'use client';
import Task from '@components/Task';
import { useState, useContext, useEffect } from 'react';
import { ModeContext } from '@contexts/modeContext';
import { TasksContext } from '@contexts/tasksContext';

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
    <div className="mx-2">
      <div className={"w-full py-[0.6rem] mb-[0.8rem]"} onClick={manageTabSection}>
        <span
          data-tab="all-tasks"
          className={`mx-[0.4rem] ml-0 py-2 px-[0.7rem] rounded-[2rem] cursor-pointer border-2 ${modeState.mode === 'focus' ? `border-red-800 text-red-800 ${selectedTab === 'all-tasks' && 'bg-red-200'}` : modeState.mode === 'short-break' ? `border-green-800 text-green-800 ${selectedTab === 'all-tasks' && 'bg-green-200'}` : `border-sky-800 text-sky-900 ${selectedTab === 'all-tasks' && 'bg-blue-200'}`}`}
        >
          All Tasks
        </span>

        <span
          data-tab="pending-tasks"
          className={`mx-[0.4rem] py-2 px-[0.7rem] rounded-[2rem] cursor-pointer border-2 ${modeState.mode === 'focus' ? `border-red-800 text-red-800 ${selectedTab === 'pending-tasks' && 'bg-red-200'}` : modeState.mode === 'short-break' ? `border-green-800 text-green-800 ${selectedTab === 'pending-tasks' && 'bg-green-200'}` : `border-sky-800 text-sky-900 ${selectedTab === 'pending-tasks' && 'bg-blue-200'}`}`}
        >
          Pending
        </span>

        <span
          data-tab="completed-tasks"
          className={`mx-[0.4rem] py-2 px-[0.7rem] rounded-[2rem] cursor-pointer border-2 ${modeState.mode === 'focus' ? `border-red-800 text-red-800 ${selectedTab === 'completed-tasks' && 'bg-red-200'}` : modeState.mode === 'short-break' ? `border-green-800 text-green-800 ${selectedTab === 'completed-tasks' && 'bg-green-200'}` : `border-sky-800 text-sky-900 ${selectedTab === 'completed-tasks' && 'bg-blue-200'}`}`}
        >
          Completed
        </span>
      </div>
      <div className={`w-full h-[1px] opacity-60 ${modeState.mode === 'focus' ? 'bg-pink-800' : modeState.mode === 'short-break' ? 'bg-green-800' : 'bg-sky-900'}`} />
      <div className="w-full max-h-[25.5rem] my-8 shadow-lg overflow-scroll">
        <ul role="list">
          {
            displayingTasks.length !== 0 ? (
              displayingTasks.map((task) => (<Task key={task._id} task={task} editTask={editTask} />))
            ) : (
              <p className={`max-w-[375px] my-[10px] mx-3 text-center text-[1.05rem] ${modeState.mode === 'focus' ? 'text-red-800' : modeState.mode === 'short-break' ? 'text-green-800' : 'text-sky-900'}`}>
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
          <div className={`p-[0.8rem] text-center border border-t-0 border-gray-950 cursor-pointer text-black ${modeState.mode === 'focus' ? 'bg-red-300' : modeState.mode === 'short-break' ? 'bg-green-300' : 'bg-blue-300'}`}>
            Show More...
          </div>
        )}
      </div>
    </div>
  );
}

export default Tasks;
