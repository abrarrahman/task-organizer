import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import './Timer.css';
import { MdPlayArrow, MdPause, MdReplay } from 'react-icons/md';

import TimerChart from './TimerChart/TimerChart';
import TimerNotification from './TimerNotification/TimerNotification';
import Task from '../../models/Task';
import { RootState } from '../../redux/store';
import { startTimer } from '../../redux/actionCreators';
import { TimerState } from '../../redux/timerReducer';
import { Notification } from '../../redux/notificationsReducer';

export interface TimerProps {

}
interface TimerNotification {
  time: number,
  taskName: string,
}
const Timer = (props: TimerProps) => {
  const tasks = useSelector<RootState, Task[]>(state => state.tasks);
  const timer = useSelector<RootState, TimerState>(state => state.timer);
  const activeNotifications = useSelector<RootState, Notification[]>(state => state.notifications);

  const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);
  const [timerNotifications, setTimerNotifications] = useState<TimerNotification[]>([]);
  const dispatch = useDispatch();

  // sorting and selecting tasks
  useEffect(() => {
    let sortedTasks = [...tasks];
    sortedTasks.sort((a, b) => a.duration - b.duration);
    let totalTime = 0;
    let i = 0;
    let tasksToSelect: Task[] = [];
    while (i < sortedTasks.length) {
      totalTime += sortedTasks[i].duration;
      if (totalTime <= 60) {
        tasksToSelect.push({ ...sortedTasks[i] })
        i += 1;
      } else break;
    }
    setSelectedTasks(tasksToSelect)
  }, [tasks])

  // setting times for notifications
  useEffect(() => {
    setTimerNotifications([]);
    let totalTime = 0;
    const updateNotifications: TimerNotification[] = [];
    selectedTasks.forEach((task) => {
      updateNotifications.push({
        time: totalTime,
        taskName: task.name
      })
      totalTime += task.duration;
    })
    setTimerNotifications(updateNotifications);
  }, [selectedTasks])

  //dispatch notifications
  const dismissNotification = useCallback((id: number) => {
    dispatch({
      type: 'DISMISS_NOTIFICATION',
      id: id
    })
  }, [dispatch])
  useEffect(() => {
    timerNotifications.forEach(notification => {
      if (timer.time === notification.time && timer.isRunning) {
        let id = Math.random();
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            message: notification.taskName + ' has started!',
            id: id,
          }
        })
        setTimeout(() => {
          dismissNotification(id)
        }, 10000);
      }
    })
  }, [timer, timerNotifications, dispatch, dismissNotification])

  const startTimerHandler = () => {
    if (timer.isPaused || timer.atZero) {
      dispatch(startTimer());
    }
  }
  const pauseTimerHandler = () => {
    if (timer.isRunning) {
      dispatch({
        type: 'PAUSE',
      });
    }
  }
  const resetTimerHandler = () => {
    if (!timer.atZero) {
      dispatch({
        type: 'RESET',
      });
    }
  }
  let timerStatus = "ready";
  if (timer.time === 60) {
    timerStatus = "finished";
  } else if (timer.isRunning) {
    timerStatus = "running";
  } else if (timer.isPaused) {
    timerStatus = "paused";
  }
  return (
    <div id="timerContainer">
      <div id="timerHeader">
        <h1>Live Timer</h1>
        <div id="timerDisplayContainer">
          <p id="timerText">Your timer is {timerStatus}</p>
          <p id="timerTime">{timer.time.toFixed(1)} s</p>
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: 10 }}>
            {
              !timer.atZero ?
                <button className='timerButtons' onClick={resetTimerHandler}><MdReplay color='blue' size='1.5em' /></button>
                : null
            }
          </div>
          {
            timer.time < 60 ? (
              timer.isRunning ?
                <button className='timerButtons' onClick={pauseTimerHandler}><MdPause color='red' size='1.5em' /></button>
                : <button className='timerButtons' onClick={startTimerHandler}><MdPlayArrow color='green' size='1.5em' /></button>
            ) : null
          }
        </div>
      </div>
      <TimerChart tasks={selectedTasks} />
      <div id='timerNotificationsContainer'>
        <TransitionGroup>
          {
            activeNotifications.map(notification => (
              <CSSTransition
                key={notification.id}
                classNames="example"
                timeout={{ enter: 300, exit: 300 }}
              >
                <TimerNotification
                  message={notification.message}
                  onDismiss={() => dismissNotification(notification.id)}
                />
              </CSSTransition>
            ))
          }
        </TransitionGroup>
      </div>
    </div>
  )
}

export default Timer;