export interface TimerState {
  isRunning: boolean,
  isPaused: boolean,
  atZero: boolean,
  time: number,
}

const initialState: TimerState = {
  isRunning: false,
  isPaused: false,
  atZero: true,
  time: 0
};

interface addTick {
  type: 'TICK',
  payload: number,
}
interface pause {
  type: 'PAUSE',
}
interface reset {
  type: 'RESET',
}
interface start {
  type: 'START',
}
interface end {
  type: 'END',
}

type timerActions = addTick|pause|reset|start|end ;

const timerReducer = (state: TimerState = initialState, action: timerActions) => {
  switch(action.type){
    case 'TICK':
      return {
        ...state,
        time: parseFloat((state.time + action.payload).toFixed(1)),
        isRunning: true,
        isPaused: false,
      }
    case 'PAUSE':
      return {
        ...state,
        isRunning: false,
        isPaused: true,
      }
    case 'RESET':
      return {
        time: 0,
        atZero: true,
        isRunning: false,
        isPaused: false,
      }
    case 'START':
      return {
        ...state,
        isRunning: true,
        atZero: false,
        isPaused: false,
      }
    case 'END':
      return {
        ...state,
        isRunning: false,
      }
    default: 
      return state;
  }
}

export default timerReducer;