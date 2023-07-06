'use client';
import Image from 'next/image';
import { useState, useContext } from 'react';
import { ModeContext } from '@contexts/modeContext';
import styles from '@styles/components/addTask.module.scss';

const AddTask = () => {
  const [inputIndex, setInputIndex] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    rounds: 3
  });

  const { state } = useContext(ModeContext);

  const openInputForm = () => {
    setIsFormOpen(true);
  }

  const handleBackNavigation = () => {
    setInputIndex(currentIndex => Math.max(1, currentIndex - 1));
  }

  const closeInputForm = () => {
    const decision = confirm('Are you sure? It will clear all the entered information');
    if (decision) {
      setIsFormOpen(false);
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
    if(field === 'rounds') {
      value = parseInt(value);
    }
    setTaskData(currentData => ({ ...currentData, [field]: value }));
  }

  return (
    <div className={`${styles['add-task__container']} flex-center`}>
      <div className={`${styles['add-task__control-section']} ${styles[state.mode]}`}>
        <button
          className={`${styles['control-section__btn']} ${styles['btn--lg']} ${isFormOpen ? 'hidden' : ''}`}
          onClick={openInputForm}
        >
          <Image src="/assets/icons/add-new.svg" alt="add icon" height={25} width={25} />
          <span>Create Task</span>
        </button>
        <div className={`flex-center ${isFormOpen ? '' : 'hidden'}`}>
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
            <Image src="/assets/icons/close.svg" alt="cancel icon" height={30} width={30} />
            <span>Cancel</span>
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
      </div>
      <div className={`${styles['add-task__progress-bar']} ${isFormOpen ? '' : 'hidden'}`}>
        <span className={`${styles['progress-bar__circle']} ${styles['circle--active']} ${styles[state.mode]}`}></span>
        <span className={`${styles['progress-bar__circle']} ${inputIndex >= 2 ? styles['circle--active'] : ''} ${styles[state.mode]}`}></span>
        <span className={`${styles['progress-bar__circle']} ${inputIndex === 3 ? styles['circle--active'] : ''} ${styles[state.mode]}`}></span>
      </div>
      <form className={`${styles['add-task__form']} ${isFormOpen ? '' : 'hidden'} ${styles[state.mode]}`}>
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
            id="rounds"
            type="number"
            placeholder="Default (3)"
            onChange={handleInputChange}
            min={1}
          />
        </div>
      </form>
    </div>
  );
}

export default AddTask;
