import Image from 'next/image';
import { useState, useContext } from 'react';
import { ModeContext } from '@contexts/modeContext';
import { TasksContext } from '@contexts/tasksContext';

const Task = ({ task, editTask }) => {
  const { title, description, totalRounds, completedRounds, status } = task;
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const { state: tasksState, dispatch: tasksDispatch } = useContext(TasksContext);
  const { state: modeState } = useContext(ModeContext);

  const handleTaskSelection = () => {
    if(modeState.mode !== 'focus') {
      alert('This is the time to relax');
      return;
    }

    if(tasksState.isProgressed) {
      alert('Please finish the current task first');
      return;
    }
    tasksDispatch({ type: 'SET_TASK', payload: task });
  }

  const deleteTask = () => {
    if(tasksState.activeTask?._id === task._id) {
      alert('active task cannot be deleted');
      return;
    }
    dispatch({ type: `REMOVE_${status.toUpperCase()}_TASK`, payload: task });
  }

  const toggleDescriptionSection = () => {
    setIsDescriptionOpen(currentState => !currentState);
  }

  return (
    <li className="w-full py-4 px-[0.6rem] bg-gray-100 border-b border-b-gray-900">
      <div className="flex justify-between items-center">
        <span className="max-w-[11rem] overflow-hidden whitespace-nowrap text-ellipsis text-[1.1rem] cursor-pointer" onClick={handleTaskSelection}>{title}</span>
        <div className="flex items-center gap-[0.4rem]">
          <span className="p-[5px] rounded-full cursor-pointer" data-type="info">
            {completedRounds}/{totalRounds}
          </span>

          <span className="p-[5px] rounded-full cursor-pointer hover:bg-gray-300" onClick={editTask(task)} data-type="edit">
            <Image src="/assets/icons/edit.svg" alt="edit icon" height={20} width={20} />
          </span>

          <span className="p-[5px] rounded-full cursor-pointer hover:bg-gray-300" onClick={deleteTask} data-type="delete">
            <Image src="/assets/icons/delete.svg" alt="delete icon" height={20} width={20} />
          </span>

          <span className="p-[5px] rounded-full cursor-pointer hover:bg-gray-300" onClick={toggleDescriptionSection} data-type="description">
            <Image src="/assets/icons/down-arrow.svg" alt="down-arrow icon" height={20} width={20} />
          </span>
        </div>
      </div>
      {
        isDescriptionOpen && (
        <div className={`w-[21rem] h-24 mt-[0.4rem] p-[10px] border-t border-t-gray-900 text-[0.9rem] overflow-scroll ${modeState.mode === 'focus' ? 'bg-[#f9f4f4]' : modeState.mode === 'short-break' ? 'bg-[#f0fdf0]' : 'bg-[#e2f5ff]'}`}>
          {description}
          <span className="mx-[2px] underline text-blue-800 cursor-pointer">Read More</span>
        </div>
      )}
    </li>
  );
}

export default Task;
