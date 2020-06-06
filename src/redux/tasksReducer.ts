import Task from '../models/Task';

const initialState: Task[] = [
  { name: 'Task 1', duration: 15, id:0},
  { name: 'Task 2', duration: 2.5, id:1},
  { name: 'Task 3', duration: 25, id:2},
  { name: 'Task 4', duration: 40, id:3},
  { name: 'Task 5', duration: 10, id:4},
  { name: 'Task 6', duration: 15, id:5},
  { name: 'Task 7', duration: 20, id:6},
];

interface addTask {
  type: 'ADD_TASK',
  payload: Task,
}
interface editTask {
  type: 'EDIT_TASK',
  payload: Task,
}
interface deleteTask {
  type: 'DELETE_TASK',
  id: number,
}
type taskActions = addTask | editTask | deleteTask;
const tasksReducer = (state: Task[] = initialState, action: taskActions) => {
  switch(action.type){
    case 'ADD_TASK':
      return [
        ...state,
        action.payload, 
      ]
    case 'EDIT_TASK':
      return [
        ...state.filter(task=>action.payload.id !== task.id),
        action.payload
      ]
    case 'DELETE_TASK':
      return [
        ...state.filter(task=>action.id !== task.id)
      ]
    default: 
      return state;
  }
}

export default tasksReducer;