'use client';
import Image from 'next/image';
import Tasks from '@components/Tasks';
import { useState, useContext } from 'react';
import { ModeContext } from '@contexts/modeContext';
import { TasksContext } from '@contexts/tasksContext';
import styles from '@styles/components/addTask.module.scss';

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
      <div className={`${styles['add-task__container']} flex-center`}>
        <div className={`${styles['add-task__control-section']} ${styles[modeState.mode]}`}>
          {isFormOpen === false ? (
              <button className={`${styles['control-section__btn']} ${styles['btn--lg']}`} onClick={openInputForm}>
                <Image src="/assets/icons/add-new.svg" alt="add icon" height={25} width={25} />
                <span>Create Task</span>
              </button>
            ) : (
            <div className="flex-center">
              <button
                className={styles['control-section__btn']}
                onClick={handleBackNavigation}
                disabled={inputIndex === 1}
              >
                <Image src="/assets/icons/back-arrow.svg" alt="back icon" height={30} width={30} />
                <span>Back</span>
              </button>
              <button
                className={styles['control-section__btn']}
                onClick={closeInputForm}
              >
                <Image src="/assets/icons/close.svg" alt="close icon" height={30} width={30} />
                <span>Close</span>
              </button>
              <button
                className={styles['control-section__btn']}
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
          <div className={styles['add-task__progress-bar']}>
            <span className={`${styles['progress-bar__circle']} ${styles['circle--active']} ${styles[modeState.mode]}`}></span>
            <span className={`${styles['progress-bar__circle']} ${inputIndex >= 2 ? styles['circle--active'] : ''} ${styles[modeState.mode]}`}></span>
            <span className={`${styles['progress-bar__circle']} ${inputIndex === 3 ? styles['circle--active'] : ''} ${styles[modeState.mode]}`}></span>
          </div>
        )}
        
        {isFormOpen && (
          <form className={`${styles['add-task__form']} ${styles[modeState.mode]}`} onKeyUp={handleFormInteractivity}>
            <div className={`${styles['form__input-field']} ${inputIndex === 1 ? 'input-field--active' : 'hidden'}`}>
              <label htmlFor="title">Create a new task:</label>
              <input
                id="title"
                type="text"
                placeholder="What it's all about?"
                value={taskData.title}
                onChange={handleInputChange}
                spellCheck="false"
                required
              />
            </div>
            <div className={`${styles['form__input-field']} ${inputIndex === 2 ? 'input-field--active' : 'hidden'}`}>
              <label htmlFor="description">Want to add description:</label>
              <textarea
                id="description"
                type="text"
                placeholder="eg - Essential for my physique...."
                value={taskData.description}
                onChange={handleInputChange}
                spellCheck="false"
              />
            </div>
            <div className={`${styles['form__input-field']} ${inputIndex === 3 ? 'input-field--active' : 'hidden'}`}>
              <label htmlFor="rounds">Number of rounds you want to go for:</label>
              <input
                id="totalRounds"
                type="number"
                inputMode="numeric"
                placeholder="Default (3)"
                onChange={handleInputChange}
                min={1}
              />
              <button type="button" className={styles['save-task__btn']} onClick={addNewTask}>Save Task</button>
            </div>
          </form>
        )}
      </div>
      <Tasks editTask={editTask} />
    </>
  );
}

export default AddTask;
