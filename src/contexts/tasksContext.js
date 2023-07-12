import { createContext, useReducer } from 'react';
import tasksReducer from '@reducers/tasksReducer';

const initialState = {
  pendingTasks: [
    {
      _id: 1,
      title: 'Complete Pomodoro App',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse rem repellat earum? Quisquam animi labore nobis fugiat ad ullam suscipit, odit delectus velit iusto alias excepturi sint veritatis harum dicta neque voluptatum deleniti cupiditate explicabo esse? Ratione dolorum molestias consequuntur corrupti quis perspiciatis accusamus illum, aut vero? Illo quisquam omnis nisi pariatur fuga ipsam suscipit totam temporibus provident impedit sunt, ea inventore quaerat sapiente, voluptatum ad reprehenderit! Quo, hic eius.',
      completedRounds: 3,
      totalRounds: 4,
      status: 'pending'
    },
    {
      _id: 2,
      title: 'Do Workout',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse rem repellat earum? Quisquam animi labore nobis fugiat ad ullam suscipit, odit delectus velit iusto alias excepturi sint veritatis harum dicta neque voluptatum.',
      completedRounds: 2,
      totalRounds: 6,
      status: 'pending'
    },
    {
      _id: 3,
      title: 'Practice CSS And Make Beautyful UI',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse rem repellat earum? Quisquam animi labore nobis fugiat.',
      completedRounds: 1,
      totalRounds: 2,
      status: 'pending'
    },
    {
      _id: 4,
      title: 'Revise your notes for aptitude',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse rem repellat earum? Quisquam animi labore nobis fugiat ad ullam suscipit, odit delectus velit iusto alias excepturi sint veritatis harum dicta neque voluptatum deleniti cupiditate explicabo esse? Ratione dolorum molestias consequuntur corrupti quis perspiciatis accusamus illum, aut vero? Illo quisquam omnis nisi pariatur fuga ipsam suscipit totam temporibus provident impedit sunt, ea inventore quaerat sapiente, voluptatum ad reprehenderit! Quo, hic eius.\
      Ratione dolorum molestias consequuntur corrupti quis perspiciatis accusamus illum, aut vero? Illo quisquam omnis nisi pariatur fuga ipsam suscipit totam temporibus provident impedit sunt, ea inventore quaerat sapiente, voluptatum ad reprehenderit! Quo, hic eius.',
      completedRounds: 4,
      totalRounds: 4,
      status: 'pending'
    },
  ],
  completedTasks: [],
  activeTask: null,
  isProgressed: false
}

export const TasksContext = createContext(null);
const TasksContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tasksReducer, initialState);

  return (
    <TasksContext.Provider value={{ state, dispatch }}>
      { children }
    </TasksContext.Provider>
  );
}

export default TasksContextProvider;
