export interface Notification {
  message: string,
  id: number
}
const initialState: Notification[] = [];

interface add {
  type: 'ADD_NOTIFICATION',
  payload: Notification,
}
interface dismiss {
  type: 'DISMISS_NOTIFICATION',
  id: number,
}
type notificationsActions = add | dismiss;
const notificationsReducer = (state: Notification[] = initialState, action: notificationsActions) => {
  switch(action.type){
    case 'ADD_NOTIFICATION':
      return [
        ...state,
        action.payload, 
      ]
    case 'DISMISS_NOTIFICATION':
      return [
        ...state.filter(task=>action.id !== task.id),
      ]
    default: 
      return state;
  }
}

export default notificationsReducer;