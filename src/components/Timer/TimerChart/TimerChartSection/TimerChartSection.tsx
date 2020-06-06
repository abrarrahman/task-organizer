import React from "react";

import './TimerChartSection.css';

interface TimerChartSectionProps {
  name: string;
  duration: number;
  color: string;
}

const TimerChartSection = (props: TimerChartSectionProps) => {
  const sectionStyles = {
    height: 6 * props.duration, 
    backgroundColor: props.color
  }
  return(
    <div style={{ display: 'flex' }}>
      <div className='chartTaskName'>{props.name}</div>
      <div style={sectionStyles} className='chartSection'></div>
    </div>
  )
}
// const styles = {
//   section: {
//     backgroundColor: 'red',
//     width: '100%',
//     borderWidth: 3,
//     borderColor: 'black',
//   }
// }
export default TimerChartSection;