import { AppThunk } from './store';

export const startTimer = (): AppThunk  => {
  return (dispatch, getState) => {
    if(getState().timer.atZero || getState().timer.isPaused){
      dispatch(timerStarted())
    }
    setTimeout(()=>{
      if(getState().timer.time < 60 && getState().timer.isRunning){
        dispatch(timerAdd100ms())
        dispatch(startTimer());
      }
    },100)
  }
}
const timerAdd100ms = () => ({
  type: 'TICK',
  payload: 0.1
})
const timerStarted = () => ({
  type: 'START',
})