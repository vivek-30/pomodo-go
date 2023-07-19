'use client';
import Image from 'next/image';
import Tasks from '@components/Tasks';
import { useState, useEffect, useRef, useContext } from 'react';
import { ModeContext } from '@contexts/modeContext';
import { TasksContext } from '@contexts/tasksContext';

const initialTaskData = {
  title: '',
  description: '',
  totalRounds: 3
}
const AddTask = () => {
  const [inputIndex, setInputIndex] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [taskData, setTaskData] = useState(initialTaskData);
  const [modifyingTask, setModifyingTask] = useState(null);

  const { state: modeState } = useContext(ModeContext);
  const { dispatch: tasksDispatch } = useContext(TasksContext);

  const inputRef = useRef({});

  useEffect(() => {
    if(isFormOpen) {
      if(inputIndex === 1 && inputRef.current) {
        inputRef.current.title.focus();
      }
      else if(inputIndex === 2 && inputRef.current) {
        inputRef.current.description.focus();
      }
      else if(inputIndex === 3 && inputRef.current) {
        inputRef.current.totalRounds.focus();
      }
    }
  }, [isFormOpen, inputIndex]);
  

  const openInputForm = () => {
    setIsFormOpen(true);
  }

  const handleBackNavigation = () => {
    setInputIndex(currentIndex => Math.max(1, currentIndex - 1));
  }

  const closeInputForm = () => {
    if(taskData.title === '' && taskData.description === '' && taskData.totalRounds === 3) {
      setIsFormOpen(false);
      return;
    }
    const decision = confirm('Are you sure? It will clear all the entered information');
    if(decision) {
      setIsFormOpen(false);
      setTaskData(initialTaskData);
    }
  }

  const handleForwardNavigation = () => {
    if((inputIndex === 1 && taskData.title.trim() === '')) {
      alert('This is a required field');
      return;
    }
    setInputIndex(currentIndex => Math.min(3, currentIndex + 1));
  }

  const handleInputChange = (e) => {
    let { id: field, value } = e.target;
    setTaskData(currentData => ({ ...currentData, [field]: value }));
  }

  const addNewTask = () => {
    if(modifyingTask !== null) {
      const updatingData = modifyingTask;
      updatingData.title = taskData.title;
      updatingData.description = taskData.description;
      updatingData.totalRounds = taskData.totalRounds;
      tasksDispatch({
        type: `MODIFY_${modifyingTask.status.toUpperCase()}_TASK`,
        payload: modifyingTask
      });
      setModifyingTask(null);
    }
    else {
      const savingData = taskData;
      savingData._id = Math.random()*100000;
      savingData.status = 'pending'
      savingData.completedRounds = 0;
      tasksDispatch({ type: 'ADD_TASK', payload: savingData });
    }
    setTaskData(initialTaskData);
    setInputIndex(1);
  }

  const handleFormInteractivity = (e) => {
    if(e.code === 'Enter') {
      if(inputIndex === 3) {
        const decision = confirm('click "OK" to save this task');
        if(decision) {
          addNewTask();
        }
      } else {
        handleForwardNavigation();
      }
    }
  }

  const editTask = (selectedTask) => {
    return () => {
      // Check if user is trying both modification as well as saving a task.
      if(isFormOpen && (taskData.title !== '' || taskData.description !== '' || taskData.totalRounds !== 3)) {
        const decision = confirm('You have a unsaved task, this action will erase all your changes, click "ok" to continue');
        if(!decision) {
          return;
        }
      }

      setTaskData({
        title: selectedTask.title,
        description: selectedTask.description,
        totalRounds: selectedTask.totalRounds,
      });
      setInputIndex(1);
      setIsFormOpen(true);
      setModifyingTask(selectedTask);
    }
  }

  return (
    <>
      <div className="w-[30%] min-w-[375px] my-4 mx-auto flex flex-col justify-center items-center">
        <div className="w-full my-4">
          {isFormOpen === false ? (
              <button className="w-[96%] mt-4 mx-auto text-green-900 py-[.7rem] px-4 flex justify-center items-center gap-2 cursor-pointer text-[1.3rem] rounded-[7px] bg-green-200 border-2 border-green-800" onClick={openInputForm}>
                <Image src="/assets/icons/add-new.svg" alt="add icon" height={25} width={25} />
                <span>Create Task</span>
              </button>
            ) : (
            <div className="flex justify-center items-center gap-[0.3rem]">
              <button
                className={`py-2 px-4 flex justify-center items-center gap-2 cursor-pointer text-[1.08rem] rounded-[7px] disabled:cursor-not-allowed disabled:opacity-50 border-2 ${modeState.mode === 'focus' ? 'text-red-800 bg-red-200 border-red-800' : modeState.mode === 'short-break' ? 'text-green-800 bg-green-200 border-green-800' : 'text-sky-900 bg-blue-200 border-sky-800'}`}
                onClick={handleBackNavigation}
                disabled={inputIndex === 1}
              >
                <Image src="/assets/icons/back-arrow.svg" alt="back icon" height={30} width={30} />
                <span>Back</span>
              </button>
              <button
                className={`py-2 px-4 flex justify-center items-center gap-2 cursor-pointer text-[1.08rem] rounded-[7px] border-2 ${modeState.mode === 'focus' ? 'text-red-800 bg-red-200 border-red-800' : modeState.mode === 'short-break' ? 'text-green-800 bg-green-200 border-green-800' : 'text-sky-900 bg-blue-200 border-sky-800'}`}
                onClick={closeInputForm}
              >
                <Image src="/assets/icons/close.svg" alt="close icon" height={30} width={30} />
                <span>Close</span>
              </button>
              <button
                className={`py-2 px-4 flex justify-center items-center gap-2 cursor-pointer text-[1.08rem] rounded-[7px] disabled:cursor-not-allowed disabled:opacity-50 border-2 ${modeState.mode === 'focus' ? 'text-red-800 bg-red-200 border-red-800' : modeState.mode === 'short-break' ? 'text-green-800 bg-green-200 border-green-800' : 'text-sky-900 bg-blue-200 border-sky-800'}`}
                onClick={handleForwardNavigation}
                disabled={inputIndex === 3}
              >
                <Image src="/assets/icons/next-arrow.svg" alt="next icon" height={30} width={30} />
                <span>Next</span>
              </button>
            </div>
          )}
        </div>
        
        {isFormOpen && (
          <div className="relative w-[96%] my-4 flex justify-between overflow-hidden">
            <span className={`relative w-[20px] h-[20px] rounded-full after:content-[''] after:absolute after:top-2/4 after:left-2/4 after:-translate-x-2/4 after:-translate-y-2/4 after:inline-block after:w-[11.5rem]
            after:h-[3px] after:z-10 ${modeState.mode === 'focus' ? 'bg-red-800 after:bg-red-800' : modeState.mode === 'short-break' ? 'bg-green-800 after:bg-green-800' : 'bg-sky-800 after:bg-sky-800'}`} />

            <span className={`relative w-[20px] h-[20px] rounded-full after:top-2/4 after:left-2/4 after:-translate-x-2/4 after:-translate-y-2/4 after:content-[''] after:absolute after:inline-block after:w-[11.5rem] after:h-[3px] ${inputIndex >= 2 ? (`after:z-10 ${modeState.mode === 'focus' ? 'bg-red-800 after:bg-red-800' : modeState.mode === 'short-break' ? 'bg-green-800 after:bg-green-800' : 'bg-sky-800 after:bg-sky-800'}`) : 'bg-gray-400 after:bg-gray-400'}`} />

            <span className={`relative w-[20px] h-[20px] rounded-full after:top-2/4 after:left-2/4 after:-translate-x-2/4 after:-translate-y-2/4 after:content-[''] after:absolute after:inline-block after:w-[11.5rem] after:h-[3px] ${inputIndex === 3 ?  (`after:z-10 ${modeState.mode === 'focus' ? 'bg-red-800 after:bg-red-800' : modeState.mode === 'short-break' ? 'bg-green-800 after:bg-green-800' : 'bg-sky-800 after:bg-sky-800'}`) : 'bg-gray-400 after:bg-gray-400'}`} />
          </div>
        )}
        
        {isFormOpen && (
          <form className="w-full" onKeyUp={handleFormInteractivity}>
            <div className={`w-[96%] m-auto ${inputIndex === 1 ? 'input-field--active' : 'hidden'}`}>
              <label className={`block text-[1.1rem] ${modeState.mode === 'focus' ? 'text-red-800' : modeState.mode === 'short-break' ? 'text-green-800' : 'text-sky-900'}`} htmlFor="title">Create a new task:</label>
              <input
                id="title"
                type="text"
                placeholder="What it's all about?"
                value={taskData.title}
                onChange={handleInputChange}
                ref={(ref) => inputRef.current.title = ref}
                spellCheck="false"
                className={`w-full my-2 p-[0.6rem] rounded-md bg-gray-100 text-gray-800 text-[1.3rem] border-2 outline-0 ${modeState.mode === 'focus' ? 'border-red-800' : modeState.mode === 'short-break' ? 'border-green-800' : 'border-sky-800'}`}
                required
              />
            </div>
            <div className={`${inputIndex === 2 ? 'input-field--active' : 'hidden'}`}>
              <label className={`block text-[1.1rem] ${modeState.mode === 'focus' ? 'text-red-800' : modeState.mode === 'short-break' ? 'text-green-800' : 'text-sky-900'}`}htmlFor="description">Want to add description:</label>
              <textarea
                id="description"
                type="text"
                placeholder="eg - Essential for my physique...."
                value={taskData.description}
                onChange={handleInputChange}
                ref={(ref) => inputRef.current.description = ref}
                className={`w-full h-24 my-2 p-[0.6rem] rounded-md bg-gray-100 text-gray-800 text-[1.3rem] overflow-scroll resize-none border-2 outline-0 ${modeState.mode === 'focus' ? 'border-red-800' : modeState.mode === 'short-break' ? 'border-green-800' : 'border-sky-800'}`}
                spellCheck="false"
              />
            </div>
            <div className={`${inputIndex === 3 ? 'input-field--active' : 'hidden'}`}>
              <label className={`block text-[1.1rem] ${modeState.mode === 'focus' ? 'text-red-800' : modeState.mode === 'short-break' ? 'text-green-800' : 'text-sky-900'}`} htmlFor="rounds">Number of rounds you want to go for:</label>
              <input
                id="totalRounds"
                type="number"
                inputMode="numeric"
                placeholder="Default (3)"
                onChange={handleInputChange}
                className={`w-[48%] my-2 p-[0.6rem] rounded-md bg-gray-100 text-gray-800 text-[1.3rem] border-2 outline-0 ${modeState.mode === 'focus' ? 'border-red-800' : modeState.mode === 'short-break' ? 'border-green-800' : 'border-sky-800'}`}
                ref={(ref) => inputRef.current.totalRounds = ref}
                min={1}
              />
              <button type="button" className="w-[48%] ml-[0.9rem] py-[0.6rem] px-4 rounded-lg border-2 bg-green-200 border-green-800 cursor-pointer text-[1.3rem] text-green-900 hover:text-gray-900 hover:bg-green-300" onClick={addNewTask}>Save Task</button>
            </div>
          </form>
        )}
      </div>
      <Tasks editTask={editTask} />
    </>
  );
}

export default AddTask;
