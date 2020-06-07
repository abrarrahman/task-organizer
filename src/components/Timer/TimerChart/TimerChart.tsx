import React from "react";
import { useSelector } from 'react-redux';
import './TimerChart.css';

import TimerChartSection from './TimerChartSection/TimerChartSection';
import Task from '../../../models/Task';
import { RootState } from '../../../redux/store';


export interface TimerChartProps {
  tasks: Task[],
}
const colors = ['#F7AEF8', '#4E4C67', '#96C9DC', '#779FA1', '#5E4AE3', '#947BD3', '#F0A7A0', '#F26CA7', '#F4F1BB'];
const rand = Math.floor(Math.random() * colors.length);

const TimerChart = (props: TimerChartProps) => {

  const time = useSelector<RootState, number>(state => state.timer.time);

  return (
    <div className="timerChartContainer">
      <div id='chartLineContainer'>
        <div style={{top: time * 6 }} id='chartLine'></div>
        <p style={{top: time * 6 }} id='chartLineText'>Current Time</p>
      </div>
      <div className='timerChartSectionsContainer'>
        {
          props.tasks.map((task, index) => {
            const color = (rand + index) % colors.length;
            return (
              <TimerChartSection key={task.id} name={task.name} duration={task.duration} color={colors[color]} />
            )
          })
        }
      </div>
      <div className='timerChartSecondsContainer'>
        <div>0 Seconds</div>
        <div>10 Seconds</div>
        <div>20 Seconds</div>
        <div>30 Seconds</div>
        <div>40 Seconds</div>
        <div>50 Seconds</div>
        <div>60 Seconds</div>
      </div>
    </div>
  )
}

export default TimerChart;