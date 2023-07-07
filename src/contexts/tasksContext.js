import { createContext, useReducer } from 'react';
import modeReducer from '../reducers/modeReducer';

export const TasksContext = createContext('focus');
const initialMode = {
  pendingTasks: [
    {
      _id: 1,
      title: 'Complete Pomodoro Application',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse rem repellat earum? Quisquam animi labore nobis fugiat ad ullam suscipit, odit delectus velit iusto alias excepturi sint veritatis harum dicta neque voluptatum deleniti cupiditate explicabo esse? Ratione dolorum molestias consequuntur corrupti quis perspiciatis accusamus illum, aut vero? Illo quisquam omnis nisi pariatur fuga ipsam suscipit totam temporibus provident impedit sunt, ea inventore quaerat sapiente, voluptatum ad reprehenderit! Quo, hic eius.',
      totalRounds: 4,
      completedRounds: 3
    },
    {
      _id: 2,
      title: 'Do Workout',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse rem repellat earum? Quisquam animi labore nobis fugiat ad ullam suscipit, odit delectus velit iusto alias excepturi sint veritatis harum dicta neque voluptatum.',
      totalRounds: 1,
      completedRounds: 2
    },
    {
      _id: 3,
      title: 'Practice CSS And Make Beautyful UI',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse rem repellat earum? Quisquam animi labore nobis fugiat.',
      totalRounds: 2,
      completedRounds: 3
    },
    {
      _id: 4,
      title: 'Revise your notes for aptitude',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse rem repellat earum? Quisquam animi labore nobis fugiat ad ullam suscipit, odit delectus velit iusto alias excepturi sint veritatis harum dicta neque voluptatum deleniti cupiditate explicabo esse? Ratione dolorum molestias consequuntur corrupti quis perspiciatis accusamus illum, aut vero? Illo quisquam omnis nisi pariatur fuga ipsam suscipit totam temporibus provident impedit sunt, ea inventore quaerat sapiente, voluptatum ad reprehenderit! Quo, hic eius.\
      Ratione dolorum molestias consequuntur corrupti quis perspiciatis accusamus illum, aut vero? Illo quisquam omnis nisi pariatur fuga ipsam suscipit totam temporibus provident impedit sunt, ea inventore quaerat sapiente, voluptatum ad reprehenderit! Quo, hic eius.',
      totalRounds: 4,
      completedRounds: 4
    },
  ],
  completedTasks: [],
  activeTask: null
}
const TasksContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(modeReducer, initialMode);

  return (
    <TasksContext.Provider value={{ state, dispatch }}>
      { children }
    </TasksContext.Provider>
  );
}

export default TasksContextProvider;
